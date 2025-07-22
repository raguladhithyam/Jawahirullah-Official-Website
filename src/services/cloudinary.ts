import { CloudinaryConfig, CloudinaryUploadResult } from '@/types';

// Cloudinary configuration
const cloudinaryConfig: CloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
  apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
};

export class CloudinaryService {
  private static readonly BASE_URL = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}`;

  // Upload image using the upload widget
  static async uploadImage(file: File, folder?: string): Promise<CloudinaryUploadResult> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryConfig.uploadPreset);
      
      if (folder) {
        formData.append('folder', folder);
      }

      const response = await fetch(`${this.BASE_URL}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const result: CloudinaryUploadResult = await response.json();
      return result;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
  }

  // Upload video
  static async uploadVideo(file: File, folder?: string): Promise<CloudinaryUploadResult> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryConfig.uploadPreset);
      formData.append('resource_type', 'video');
      
      if (folder) {
        formData.append('folder', folder);
      }

      const response = await fetch(`${this.BASE_URL}/video/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Video upload failed with status: ${response.status}`);
      }

      const result: CloudinaryUploadResult = await response.json();
      return result;
    } catch (error) {
      console.error('Error uploading video to Cloudinary:', error);
      throw error;
    }
  }

  // Delete resource
  static async deleteResource(publicId: string, resourceType: 'image' | 'video' = 'image'): Promise<void> {
    try {
      const timestamp = Math.round(Date.now() / 1000);
      const signature = await this.generateSignature(publicId, timestamp);

      const formData = new FormData();
      formData.append('public_id', publicId);
      formData.append('signature', signature);
      formData.append('api_key', cloudinaryConfig.apiKey);
      formData.append('timestamp', timestamp.toString());

      const response = await fetch(`${this.BASE_URL}/${resourceType}/destroy`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Delete failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting resource from Cloudinary:', error);
      throw error;
    }
  }

  // Generate transformation URL for images
  static getTransformedImageUrl(
    publicId: string, 
    transformations: {
      width?: number;
      height?: number;
      crop?: 'fill' | 'fit' | 'scale' | 'crop';
      quality?: 'auto' | number;
      format?: 'auto' | 'webp' | 'jpg' | 'png';
      gravity?: 'auto' | 'face' | 'center';
    } = {}
  ): string {
    const {
      width,
      height,
      crop = 'fill',
      quality = 'auto',
      format = 'auto',
      gravity = 'auto'
    } = transformations;

    let transformationString = '';
    const params: string[] = [];

    if (width) params.push(`w_${width}`);
    if (height) params.push(`h_${height}`);
    if (crop) params.push(`c_${crop}`);
    if (quality) params.push(`q_${quality}`);
    if (format) params.push(`f_${format}`);
    if (gravity) params.push(`g_${gravity}`);

    if (params.length > 0) {
      transformationString = params.join(',') + '/';
    }

    return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${transformationString}${publicId}`;
  }

  // Generate video transformation URL
  static getTransformedVideoUrl(
    publicId: string,
    transformations: {
      width?: number;
      height?: number;
      quality?: 'auto' | number;
      format?: 'auto' | 'mp4' | 'webm';
    } = {}
  ): string {
    const {
      width,
      height,
      quality = 'auto',
      format = 'auto'
    } = transformations;

    let transformationString = '';
    const params: string[] = [];

    if (width) params.push(`w_${width}`);
    if (height) params.push(`h_${height}`);
    if (quality) params.push(`q_${quality}`);
    if (format) params.push(`f_${format}`);

    if (params.length > 0) {
      transformationString = params.join(',') + '/';
    }

    return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/video/upload/${transformationString}${publicId}`;
  }

  // Generate signature for authenticated requests (simplified - in production, do this server-side)
  private static async generateSignature(publicId: string, timestamp: number): Promise<string> {
    const params = `public_id=${publicId}&timestamp=${timestamp}`;
    const signature = await this.sha1(`${params}${cloudinaryConfig.apiSecret}`);
    return signature;
  }

  // Simple SHA-1 implementation (in production, use a proper crypto library)
  private static async sha1(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}

// Utility functions for common image operations
export const ImageUtils = {
  // Get optimized image URL for thumbnails
  getThumbnail: (publicId: string, size: number = 300): string => {
    return CloudinaryService.getTransformedImageUrl(publicId, {
      width: size,
      height: size,
      crop: 'fill',
      quality: 'auto',
      format: 'auto'
    });
  },

  // Get optimized image URL for hero/banner images
  getHeroImage: (publicId: string, width: number = 1920, height: number = 1080): string => {
    return CloudinaryService.getTransformedImageUrl(publicId, {
      width,
      height,
      crop: 'fill',
      quality: 'auto',
      format: 'auto'
    });
  },

  // Get responsive image URLs
  getResponsiveImageUrls: (publicId: string): Record<string, string> => {
    return {
      xs: CloudinaryService.getTransformedImageUrl(publicId, { width: 320 }),
      sm: CloudinaryService.getTransformedImageUrl(publicId, { width: 640 }),
      md: CloudinaryService.getTransformedImageUrl(publicId, { width: 768 }),
      lg: CloudinaryService.getTransformedImageUrl(publicId, { width: 1024 }),
      xl: CloudinaryService.getTransformedImageUrl(publicId, { width: 1280 }),
      '2xl': CloudinaryService.getTransformedImageUrl(publicId, { width: 1536 }),
    };
  }
};