import React, { useState } from 'react';
import { useBlogs } from '@/hooks/useFirebase';
import { Blog } from '@/types';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import ImageUpload from '@/components/ui/ImageUpload';
import { useForm } from 'react-hook-form';
import { showToast } from '@/components/ui/Toast';

interface BlogFormData {
  title: string;
  titleTamil: string;
  content: string;
  contentTamil: string;
  excerpt: string;
  excerptTamil: string;
  publishDate: string;
  tags: string;
  readingTime: number;
  slug: string;
}

const BlogManager: React.FC = () => {
  const { data: blogs, loading, error, create, update, delete: deleteBlog } = useBlogs();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<BlogFormData>();

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFeaturedImageUrl(blog.featuredImageUrl);
    setValue('title', blog.title);
    setValue('titleTamil', blog.titleTamil);
    setValue('content', blog.content);
    setValue('contentTamil', blog.contentTamil);
    setValue('excerpt', blog.excerpt);
    setValue('excerptTamil', blog.excerptTamil);
    setValue('publishDate', blog.publishDate);
    setValue('tags', blog.tags.join(', '));
    setValue('readingTime', blog.readingTime);
    setValue('slug', blog.slug);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingBlog(null);
    setFeaturedImageUrl('');
    reset();
    setIsModalOpen(true);
  };

  const onSubmit = async (data: BlogFormData) => {
    if (!featuredImageUrl) {
      alert('Please upload a featured image');
      return;
    }

    setIsSubmitting(true);
    try {
      const blogData = {
        ...data,
        featuredImageUrl,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        status: 'published' as const,
        category: 'general',
        categoryTamil: 'பொது'
      };

      if (editingBlog) {
        await update(editingBlog.id, blogData);
        showToast.success('Blog post updated successfully!');
      } else {
        await create(blogData);
        showToast.success('Blog post added successfully!');
      }

      setIsModalOpen(false);
      reset();
      setFeaturedImageUrl('');
    } catch (error) {
      console.error('Error saving blog:', error);
      showToast.error('Failed to save blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(id);
        showToast.success('Blog post deleted successfully!');
      } catch (error) {
        console.error('Error deleting blog post:', error);
        showToast.error('Failed to delete blog post. Please try again.');
      }
    }
  };

  const handleImageUpload = (result: any) => {
    setFeaturedImageUrl(result.secure_url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-headline text-3xl font-bold text-primary">Manage Blogs</h1>
          <p className="font-body text-text-secondary">Add, edit, and manage blog posts</p>
        </div>
        <Button onClick={handleAdd} iconName="Plus" iconPosition="left">
          Add New Blog
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <Icon name="AlertCircle" size={20} className="text-red-600 mr-2" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Blogs Table */}
      <div className="bg-card rounded-xl shadow-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Image</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Title</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Date</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-muted/20">
                  <td className="px-6 py-4">
                    <img
                      src={blog.featuredImageUrl}
                      alt={blog.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-body font-medium text-primary">{blog.title}</p>
                      <p className="font-body text-sm text-text-secondary">{blog.titleTamil}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-body text-text-secondary">
                      {new Date(blog.publishDate).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Edit"
                        onClick={() => handleEdit(blog)}
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        iconName="Trash2"
                        onClick={() => handleDelete(blog.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline text-2xl font-bold text-primary">
                  {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Title (English)"
                    {...register('title', { required: 'Title is required' })}
                    error={errors.title?.message}
                    className="border border-gray-300"
                    required
                  />
                  <Input
                    label="Title (Tamil)"
                    {...register('titleTamil', { required: 'Tamil title is required' })}
                    error={errors.titleTamil?.message}
                    className="border border-gray-300"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Slug"
                    {...register('slug', { required: 'Slug is required' })}
                    error={errors.slug?.message}
                    className="border border-gray-300"
                    required
                    placeholder="blog-post-url-slug"
                  />
                  <Input
                    type="date"
                    label="Publish Date"
                    {...register('publishDate', { required: 'Publish date is required' })}
                    error={errors.publishDate?.message}
                    className="border border-gray-300"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label className="block font-body font-medium text-primary">
                    Featured Image *
                  </label>
                  <ImageUpload
                    onUploadSuccess={handleImageUpload}
                    folder="blogs"
                    className="border-2 border-dashed border-border rounded-lg p-4"
                  />
                  {featuredImageUrl && (
                    <div className="mt-4">
                      <img
                        src={featuredImageUrl}
                        alt="Featured image preview"
                        className="w-48 h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="block font-body font-medium text-primary">
                      Excerpt (English) *
                    </label>
                    <textarea
                      {...register('excerpt', { required: 'Excerpt is required' })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Brief summary of the blog post..."
                    />
                    {errors.excerpt && (
                      <p className="text-red-600 text-sm">{errors.excerpt.message}</p>
                    )}
                  </div>
                  <div className="space-y-4">
                    <label className="block font-body font-medium text-primary">
                      Excerpt (Tamil) *
                    </label>
                    <textarea
                      {...register('excerptTamil', { required: 'Tamil excerpt is required' })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="வலைப்பதிவு இடுகையின் சுருக்கம்..."
                    />
                    {errors.excerptTamil && (
                      <p className="text-red-600 text-sm">{errors.excerptTamil.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block font-body font-medium text-primary">
                    Content (English) *
                  </label>
                  <textarea
                    {...register('content', { required: 'Content is required' })}
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Full blog post content in HTML format..."
                  />
                  {errors.content && (
                    <p className="text-red-600 text-sm">{errors.content.message}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="block font-body font-medium text-primary">
                    Content (Tamil) *
                  </label>
                  <textarea
                    {...register('contentTamil', { required: 'Tamil content is required' })}
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="முழு வலைப்பதிவு உள்ளடக்கம் HTML வடிவத்தில்..."
                  />
                  {errors.contentTamil && (
                    <p className="text-red-600 text-sm">{errors.contentTamil.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Tags (comma separated)"
                    {...register('tags')}
                    className="border border-gray-300"
                    placeholder="politics, governance, development"
                  />
                  <Input
                    type="number"
                    label="Reading Time (minutes)"
                    {...register('readingTime', { required: 'Reading time is required', valueAsNumber: true })}
                    error={errors.readingTime?.message}
                    className="border border-gray-300"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    iconName={isSubmitting ? "Loader2" : "Save"}
                    iconPosition="left"
                  >
                    {isSubmitting ? 'Saving...' : editingBlog ? 'Update Blog' : 'Add Blog'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManager;