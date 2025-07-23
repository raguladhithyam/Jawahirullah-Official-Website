import React, { useState } from 'react';
import { useSpeeches } from '@/hooks/useFirebase';
import { Speech } from '@/types';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import ImageUpload from '@/components/ui/ImageUpload';
import { useForm } from 'react-hook-form';
import { showToast } from '@/components/ui/Toast';

interface SpeechFormData {
  title: string;
  titleTamil: string;
  videoUrl: string;
}

const SpeechManager: React.FC = () => {
  const { data: speeches, loading, error, create, update, delete: deleteSpeech } = useSpeeches();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpeech, setEditingSpeech] = useState<Speech | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<SpeechFormData>();

  const categoryOptions = [
    { value: 'governance', label: 'Governance' },
    { value: 'development', label: 'Development' },
    { value: 'social', label: 'Social Justice' },
    { value: 'education', label: 'Education' },
    { value: 'economy', label: 'Economy' }
  ];

  const handleEdit = (speech: Speech) => {
    setEditingSpeech(speech);
    setThumbnailUrl(speech.thumbnailUrl);
    setValue('title', speech.title);
    setValue('titleTamil', speech.titleTamil);
    setValue('videoUrl', speech.videoUrl);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingSpeech(null);
    setThumbnailUrl('');
    reset();
    setIsModalOpen(true);
  };

  const onSubmit = async (data: SpeechFormData) => {
    setIsSubmitting(true);
    try {
      const speechData = {
        ...data,
        thumbnailUrl: thumbnailUrl || getYouTubeThumbnail(data.videoUrl) || '',
        status: 'published' as const
      };

      if (editingSpeech) {
        await update(editingSpeech.id, speechData);
        showToast.success('Speech updated successfully!');
      } else {
        await create(speechData);
        showToast.success('Speech added successfully!');
      }

      setIsModalOpen(false);
      reset();
      setThumbnailUrl('');
    } catch (error) {
      console.error('Error saving speech:', error);
      showToast.error('Failed to save speech. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this speech?')) {
      try {
        await deleteSpeech(id);
        showToast.success('Speech deleted successfully!');
      } catch (error) {
        console.error('Error deleting speech:', error);
        showToast.error('Failed to delete speech. Please try again.');
      }
    }
  };

  const handleImageUpload = (result: any) => {
    setThumbnailUrl(result.secure_url);
  };

  const getYouTubeThumbnail = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg` : null;
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
          <h1 className="font-headline text-3xl font-bold text-primary">Manage Speeches</h1>
          <p className="font-body text-text-secondary">Add, edit, and manage speech videos</p>
        </div>
        <Button onClick={handleAdd} iconName="Plus" iconPosition="left">
          Add New Speech
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

      {/* Speeches Table */}
      <div className="bg-card rounded-xl shadow-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Thumbnail</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Title</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Video URL</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {speeches.map((speech) => (
                <tr key={speech.id} className="hover:bg-muted/20">
                  <td className="px-6 py-4">
                    <img
                      src={speech.thumbnailUrl}
                      alt={speech.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-body font-medium text-primary">{speech.title}</p>
                      <p className="font-body text-sm text-text-secondary">{speech.titleTamil}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a href={speech.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      View Video
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Edit"
                        onClick={() => handleEdit(speech)}
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        iconName="Trash2"
                        onClick={() => handleDelete(speech.id)}
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
          <div className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline text-2xl font-bold text-primary">
                  {editingSpeech ? 'Edit Speech' : 'Add New Speech'}
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

                <Input
                  label="YouTube Video URL"
                  {...register('videoUrl', { required: 'Video URL is required' })}
                  error={errors.videoUrl?.message}
                  className="border border-gray-300"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                />

                <div className="space-y-4">
                  <label className="block font-body font-medium text-primary">
                    Custom Thumbnail (Optional)
                  </label>
                  <p className="text-sm text-text-secondary">
                    If not uploaded, YouTube thumbnail will be used automatically
                  </p>
                  <ImageUpload
                    onUploadSuccess={handleImageUpload}
                    folder="speeches"
                    className="border-2 border-dashed border-border rounded-lg p-4"
                  />
                  {thumbnailUrl && (
                    <div className="mt-4">
                      <img
                        src={thumbnailUrl}
                        alt="Thumbnail preview"
                        className="w-48 h-32 object-cover rounded-lg"
                      />
                    </div>
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
                    {isSubmitting ? 'Saving...' : editingSpeech ? 'Update Speech' : 'Add Speech'}
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

export default SpeechManager;