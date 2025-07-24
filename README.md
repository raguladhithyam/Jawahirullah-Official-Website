# Dr. MH Jawahirullah Digital Platform - User Manual

## Table of Contents
1. [Overview](#overview)
2. [Public User Guide](#public-user-guide)
3. [Admin Dashboard Guide](#admin-dashboard-guide)
4. [Technical Setup](#technical-setup)
5. [Troubleshooting](#troubleshooting)
6. [Support](#support)

---

## Overview

The Dr. MH Jawahirullah Digital Platform is a comprehensive website showcasing the political leader's work, publications, speeches, and engagement with constituents. The platform supports both English and Tamil languages and includes both public-facing content and an administrative dashboard for content management.

### Key Features
- **Bilingual Support**: Full English and Tamil language support
- **Content Management**: Books, speeches, blogs, testimonials, and updates
- **Contact System**: Direct communication with constituents
- **Newsletter Subscription**: Stay updated with latest news
- **Admin Dashboard**: Complete content management system
- **Responsive Design**: Works on all devices

---

## Public User Guide

### 1. Navigation

#### Language Selection
- Click the language toggle in the header to switch between English and Tamil
- Your language preference is automatically saved for future visits

#### Main Navigation Menu
- **Home**: Landing page with latest updates and featured content
- **About**: Detailed biography and achievements
- **Books**: Complete collection of published works
- **Speeches**: Video library of public addresses
- **Blog**: Latest articles and political commentary
- **Contact**: Get in touch directly

### 2. Home Page Features

#### Hero Section
- Features latest speech video or key announcement
- Quick access to books and speeches
- Key statistics (years of service, publications, etc.)

#### Latest Updates Ticker
- Real-time news and announcements
- Automatically cycles through recent updates
- Click dots to navigate manually
- Pause button to stop auto-rotation

#### Featured Content
- Latest book publications
- Recent speeches with video previews
- Quick access to full collections

#### Testimonials
- Public endorsements and feedback
- Rotating display of community support

### 3. Books Section

#### Browsing Books
- View all published books in grid layout
- Click on any book cover to access purchase link
- Books display in both English and Tamil titles
- Direct links to purchase/download

### 4. Speeches Section

#### Watching Speeches
- Embedded YouTube videos for direct viewing
- Full-screen viewing available
- Speeches organized by topic and date
- Bilingual titles and descriptions

### 5. Blog Section

#### Reading Articles
- Click "Read More" to view full article in modal
- Articles available in both languages
- Tags and categories for easy browsing
- Reading time estimates provided
- View counts and engagement metrics

### 6. Contact System

#### Sending Messages
1. Fill out the contact form with:
   - Full name (required)
   - Email address (required)
   - Phone number (optional)
   - Subject (required)
   - Message (required)
2. Click "Send Message"
3. Receive confirmation of successful submission
4. Expect response within 48 hours

#### Contact Information
- Office address and hours
- Phone and email contacts
- Social media links

### 7. Newsletter Subscription

#### Subscribing
1. Scroll to footer section
2. Enter email address in newsletter signup
3. Click "Subscribe"
4. Receive confirmation message
5. Check email for welcome message

---

## Admin Dashboard Guide

### 1. Admin Access

#### Logging In
1. Navigate to `/admin` URL
2. Enter admin credentials:
   - Email address
   - Password (minimum 6 characters)
3. Click "Sign In"
4. Access granted to dashboard

#### Security Features
- Session-based authentication
- Automatic logout after inactivity
- Secure password requirements
- Role-based access control

### 2. Dashboard Overview

#### Main Navigation
- **Dashboard**: Overview statistics and recent activity
- **Books**: Manage book publications
- **Speeches**: Manage video content
- **Blogs**: Create and edit articles
- **Messages**: Handle contact form submissions
- **Emails**: Manage newsletter subscriptions
- **Testimonials**: Manage public endorsements
- **Updates**: Manage news ticker content

#### Statistics Panel
- Total counts for all content types
- Recent activity overview
- Quick access to recent items
- Performance metrics

### 3. Content Management

#### Managing Books

**Adding New Books:**
1. Click "Add New Book" button
2. Fill required fields:
   - Title (English) - required
   - Title (Tamil) - required
   - Buy Link - required
3. Upload cover image:
   - Click upload area or drag & drop
   - Supported formats: JPEG, PNG, GIF, WebP
   - Maximum size: 10MB
4. Click "Add Book" to save

**Editing Books:**
1. Click edit icon next to book
2. Modify any field as needed
3. Upload new cover image if desired
4. Click "Update Book" to save changes

**Deleting Books:**
1. Click delete icon next to book
2. Confirm deletion in popup
3. Book permanently removed

#### Managing Speeches

**Adding New Speeches:**
1. Click "Add New Speech" button
2. Fill required fields:
   - Title (English) - required
   - Title (Tamil) - required
   - YouTube Video URL - required
3. Optional: Upload custom thumbnail
   - If not provided, YouTube thumbnail used automatically
4. Click "Add Speech" to save

**Video URL Format:**
- Accepts various YouTube URL formats:
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://youtu.be/VIDEO_ID`
  - `https://www.youtube.com/embed/VIDEO_ID`

#### Managing Blogs

**Creating New Blog Posts:**
1. Click "Add New Blog" button
2. Fill all required fields:
   - Title (English & Tamil)
   - Slug (URL-friendly version)
   - Publish date
   - Excerpt (English & Tamil)
   - Full content (English & Tamil)
   - Reading time (minutes)
   - Tags (comma-separated)
3. Upload featured image
4. Click "Add Blog" to publish

**Content Formatting:**
- HTML formatting supported in content fields
- Use standard HTML tags for formatting
- Images can be embedded using HTML img tags
- Links supported with anchor tags

**Blog Management:**
- All blogs display in table format
- Edit or delete using action buttons
- Published blogs appear on public site immediately

#### Managing Contact Messages

**Viewing Messages:**
- All messages display in chronological order
- Status indicators: Unread (blue), Read (gray), Replied (green)
- Filter by status using dropdown

**Responding to Messages:**
1. Click "View" button next to message
2. Read full message details
3. Type response in reply field
4. Click "Send Reply"
5. Status automatically updates to "Replied"

**Message Management:**
- Mark as read/unread using status dropdown
- Delete messages using delete button
- Export functionality for record keeping

#### Managing Newsletter Subscriptions

**Viewing Subscriptions:**
- All email subscriptions listed with status
- Active vs. Unsubscribed status tracking
- Subscription dates and management

**Managing Subscriptions:**
- Change status (Active/Unsubscribed)
- Delete subscriptions
- Export email lists for campaigns

#### Managing Testimonials

**Adding Testimonials:**
1. Click "Add New Testimonial"
2. Fill required fields:
   - Name
   - Designation
   - Content/Quote
3. Upload person's photo
4. Click "Add Testimonial"

**Photo Requirements:**
- Square aspect ratio preferred
- Professional headshot recommended
- Maximum 10MB file size

#### Managing Updates (News Ticker)

**Adding Updates:**
1. Click "Add New Update"
2. Select update type:
   - Announcement
   - Achievement
   - Event
   - Media
   - Policy
3. Write content in both English and Tamil
4. Click "Add Update"

**Update Types:**
- **Announcement**: General announcements
- **Achievement**: Awards and recognitions
- **Event**: Upcoming or past events
- **Media**: Media appearances and coverage
- **Policy**: Policy-related updates

### 4. Media Management

#### Image Upload Guidelines
- **Supported Formats**: JPEG, PNG, GIF, WebP
- **Maximum Size**: 10MB per file
- **Recommended Dimensions**:
  - Book covers: 400x600px (2:3 ratio)
  - Blog featured images: 1200x630px (16:9 ratio)
  - Testimonial photos: 400x400px (square)
  - Speech thumbnails: 1280x720px (16:9 ratio)

#### Image Optimization
- Images automatically optimized for web
- Multiple sizes generated for responsive display
- CDN delivery for fast loading

### 5. User Management

#### Admin Account Security
- Change password regularly
- Use strong passwords (minimum 8 characters)
- Log out when finished
- Don't share credentials

#### Session Management
- Sessions expire after 24 hours of inactivity
- Manual logout recommended
- Multiple device access supported

---

## Technical Setup

### 1. Environment Requirements

#### Prerequisites
- Node.js 18+ installed
- Modern web browser
- Internet connection for external services

#### Environment Variables
Create `.env` file with:
```
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Cloudinary Configuration (for image uploads)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_API_SECRET=your_api_secret
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 2. Installation

#### Local Development
```bash
# Clone repository
git clone [repository-url]

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

#### Deployment
- Built for Vercel deployment
- Automatic deployments from main branch
- Environment variables configured in Vercel dashboard

### 3. Database Setup

#### Firebase Firestore Collections
- `books`: Book publications
- `speeches`: Video content
- `blogs`: Blog articles
- `contacts`: Contact form submissions
- `newsletter_subscriptions`: Email subscriptions
- `testimonials`: Public endorsements
- `updates`: News ticker content

#### Security Rules
- Public read access for published content
- Admin-only write access
- Row-level security implemented

---

## Troubleshooting

### Common Issues

#### Login Problems
**Issue**: Cannot access admin dashboard
**Solutions**:
1. Verify email and password are correct
2. Check if account exists in Firebase Auth
3. Ensure Firebase configuration is correct
4. Clear browser cache and cookies

#### Image Upload Failures
**Issue**: Images not uploading
**Solutions**:
1. Check file size (max 10MB)
2. Verify file format (JPEG, PNG, GIF, WebP only)
3. Check internet connection
4. Verify Cloudinary configuration

#### Content Not Displaying
**Issue**: New content not appearing on site
**Solutions**:
1. Verify content status is "published"
2. Check Firebase database permissions
3. Clear browser cache
4. Wait a few minutes for propagation

#### Language Switching Issues
**Issue**: Language not changing properly
**Solutions**:
1. Clear browser local storage
2. Refresh the page
3. Check if content exists in both languages

### Performance Issues

#### Slow Loading
**Solutions**:
1. Check internet connection
2. Clear browser cache
3. Disable browser extensions
4. Try different browser

#### Video Playback Issues
**Solutions**:
1. Verify YouTube video is public
2. Check video URL format
3. Test video directly on YouTube
4. Clear browser cache

---

### API Endpoints

#### Public APIs
- `/api/books`: Get published books
- `/api/speeches`: Get published speeches
- `/api/blogs`: Get published blogs
- `/api/contact`: Submit contact form

#### Admin APIs
- Secured with authentication
- Full CRUD operations
- Rate limiting applied

---

*Last Updated: December 2024*
*Version: 1.0*

For the most current information and updates, please visit the platform or contact support.