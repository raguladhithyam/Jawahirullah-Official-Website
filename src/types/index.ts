// Common types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Book types
export interface Book extends BaseEntity {
  title: string;
  titleTamil: string;
  coverImageUrl: string;
  status: 'draft' | 'published';
  buyLink: string;
}

// Speech types
export interface Speech extends BaseEntity {
  title: string;
  titleTamil: string;
  videoUrl: string;
  thumbnailUrl: string;
  status: 'draft' | 'published';
}

// Blog types
export interface Blog extends BaseEntity {
  title: string;
  titleTamil: string;
  content: string;
  contentTamil: string;
  excerpt: string;
  excerptTamil: string;
  featuredImageUrl: string;
  publishDate: string;
  status: 'draft' | 'published';
  views: number;
  comments: number;
  category: string;
  categoryTamil: string;
  tags: string[];
  readingTime: number;
  slug: string;
}

// Contact types
export interface ContactMessage extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  replied: boolean;
  replyMessage?: string;
  replyDate?: Date;
}

// Update types
export interface Update extends BaseEntity {
  type: 'announcement' | 'achievement' | 'event' | 'media' | 'policy';
  icon: string;
  text: string;
  textTamil: string;
}

// Testimonial types
export interface Testimonial extends BaseEntity {
  name: string;
  designation: string;
  photo: string;
  content: string;
}

// User types (for admin)
export interface User extends BaseEntity {
  email: string;
  displayName: string;
  role: 'admin' | 'editor' | 'viewer';
  lastLoginAt?: Date;
  isActive: boolean;
}

// Analytics types
export interface AnalyticsData {
  totalBooks: number;
  totalSpeeches: number;
  totalBlogs: number;
  totalMessages: number;
  totalViews: number;
  monthlyViews: number[];
  topBooks: Book[];
  topSpeeches: Speech[];
  topBlogs: Blog[];
  recentActivity: ActivityLog[];
}

export interface ActivityLog {
  id: string;
  action: string;
  entity: 'book' | 'speech' | 'blog' | 'contact';
  entityId: string;
  userId: string;
  timestamp: Date;
  details: string;
}

// Firebase types
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Cloudinary types
export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  uploadPreset: string;
}

export interface CloudinaryUploadResult {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  url: string;
  secure_url: string;
  bytes: number;
}

// Component prop types
export interface LanguageProps {
  currentLanguage: 'en' | 'ta';
}

export interface TabItem {
  id: string;
  label: string;
  icon: string;
}

export interface DashboardStatsProps extends LanguageProps {
  stats?: AnalyticsData;
}

export interface ContentManagementTabsProps extends LanguageProps {
  onContentUpdate?: () => void;
}