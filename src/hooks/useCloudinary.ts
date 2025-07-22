import { useState, useCallback } from 'react';
import { CloudinaryService } from '@/services/cloudinary';
import { CloudinaryUploadResult } from '@/types';

interface UseCloudinaryReturn {
  uploading: boolean;
  uploadError: string | null;
  uploadImage: (file: File, folder?: string) => Promise<CloudinaryUploadResult | null>;
  uploadVideo: (file: File, folder?: string) => Promise<CloudinaryUploadResult | null>;
  deleteResource: (publicId: string, resourceType?: 'image' | 'video') => Promise<boolean>;
  clearError: () => void;
}

export const useCloudinary = (): UseCloudinaryReturn => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadImage = useCallback(async (file: File, folder?: string): Promise<CloudinaryUploadResult | null> => {
    setUploading(true);
    setUploadError(null);

    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file');
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        throw new Error('Image file size must be less than 10MB');
      }

      const result = await CloudinaryService.uploadImage(file, folder);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
      setUploadError(errorMessage);
      return null;
    } finally {
      setUploading(false);
    }
  }, []);

  const uploadVideo = useCallback(async (file: File, folder?: string): Promise<CloudinaryUploadResult | null> => {
    setUploading(true);
    setUploadError(null);

    try {
      // Validate file type
      if (!file.type.startsWith('video/')) {
        throw new Error('Please select a valid video file');
      }

      // Validate file size (max 100MB)
      const maxSize = 100 * 1024 * 1024; // 100MB
      if (file.size > maxSize) {
        throw new Error('Video file size must be less than 100MB');
      }

      const result = await CloudinaryService.uploadVideo(file, folder);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload video';
      setUploadError(errorMessage);
      return null;
    } finally {
      setUploading(false);
    }
  }, []);

  const deleteResource = useCallback(async (publicId: string, resourceType: 'image' | 'video' = 'image'): Promise<boolean> => {
    setUploadError(null);

    try {
      await CloudinaryService.deleteResource(publicId, resourceType);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete resource';
      setUploadError(errorMessage);
      return false;
    }
  }, []);

  const clearError = useCallback(() => {
    setUploadError(null);
  }, []);

  return {
    uploading,
    uploadError,
    uploadImage,
    uploadVideo,
    deleteResource,
    clearError,
  };
};