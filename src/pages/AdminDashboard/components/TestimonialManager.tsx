import React, { useState, useEffect } from 'react';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ImageUpload from '@/components/ui/ImageUpload';
import { useForm } from 'react-hook-form';

interface Testimonial {
  id: string;
  name: string;
  designation: string;
  photo: string;
  content: string;
  createdAt: Date;
}

interface TestimonialFormData {
  name: string;
  designation: string;
  content: string;
}

const TestimonialManager: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<TestimonialFormData>();

  // Mock data for now - replace with actual Firebase integration
  useEffect(() => {
    const mockTestimonials: Testimonial[] = [
      {
        id: '1',
        name: 'Priya Krishnamurthy',
        designation: 'Small Business Owner, Chennai',
        photo: 'https://randomuser.me/api/portraits/women/32.jpg',
        content: 'Dr. Jawahirullah\'s policies on digital governance have transformed how we interact with government services.',
        createdAt: new Date('2024-01-15')
      },
      {
        id: '2',
        name: 'Prof. Rajesh Kumar',
        designation: 'Political Science, University of Madras',
        photo: 'https://randomuser.me/api/portraits/men/45.jpg',
        content: 'His scholarly approach to politics brings much-needed intellectual rigor to contemporary political discourse.',
        createdAt: new Date('2024-01-20')
      }
    ];
    setTestimonials(mockTestimonials);
  }, []);

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setPhotoUrl(testimonial.photo);
    setValue('name', testimonial.name);
    setValue('designation', testimonial.designation);
    setValue('content', testimonial.content);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTestimonial(null);
    setPhotoUrl('');
    reset();
    setIsModalOpen(true);
  };

  const onSubmit = async (data: TestimonialFormData) => {
    if (!photoUrl) {
      alert('Please upload a photo');
      return;
    }

    setIsSubmitting(true);
    try {
      const testimonialData: Testimonial = {
        id: editingTestimonial?.id || Date.now().toString(),
        ...data,
        photo: photoUrl,
        createdAt: editingTestimonial?.createdAt || new Date()
      };

      if (editingTestimonial) {
        setTestimonials(testimonials.map(t => t.id === editingTestimonial.id ? testimonialData : t));
      } else {
        setTestimonials([...testimonials, testimonialData]);
      }

      setIsModalOpen(false);
      reset();
      setPhotoUrl('');
    } catch (error) {
      console.error('Error saving testimonial:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonials(testimonials.filter(t => t.id !== id));
    }
  };

  const handleImageUpload = (result: any) => {
    setPhotoUrl(result.secure_url);
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
          <h1 className="font-headline text-3xl font-bold text-primary">Manage Testimonials</h1>
          <p className="font-body text-text-secondary">Add, edit, and manage testimonials</p>
        </div>
        <Button onClick={handleAdd} iconName="Plus" iconPosition="left">
          Add New Testimonial
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

      {/* Testimonials Table */}
      <div className="bg-card rounded-xl shadow-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Photo</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Name</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Designation</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Content</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id} className="hover:bg-muted/20">
                  <td className="px-6 py-4">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-body font-medium text-primary">{testimonial.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-body text-text-secondary">{testimonial.designation}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-body text-text-secondary truncate max-w-xs">{testimonial.content}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Edit"
                        onClick={() => handleEdit(testimonial)}
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        iconName="Trash2"
                        onClick={() => handleDelete(testimonial.id)}
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
          <div className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline text-2xl font-bold text-primary">
                  {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  label="Name"
                  {...register('name', { required: 'Name is required' })}
                  error={errors.name?.message}
                  className="border border-gray-300"
                  required
                />

                <Input
                  label="Designation"
                  {...register('designation', { required: 'Designation is required' })}
                  error={errors.designation?.message}
                  className="border border-gray-300"
                  required
                />

                <div className="space-y-4">
                  <label className="block font-body font-medium text-primary">
                    Photo *
                  </label>
                  <ImageUpload
                    onUploadSuccess={handleImageUpload}
                    folder="testimonials"
                    className="border-2 border-dashed border-border rounded-lg p-4"
                  />
                  {photoUrl && (
                    <div className="mt-4">
                      <img
                        src={photoUrl}
                        alt="Photo preview"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="block font-body font-medium text-primary">
                    Content *
                  </label>
                  <textarea
                    {...register('content', { required: 'Content is required' })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Testimonial content..."
                  />
                  {errors.content && (
                    <p className="text-red-600 text-sm">{errors.content.message}</p>
                  )}
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
                    {isSubmitting ? 'Saving...' : editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
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

export default TestimonialManager;