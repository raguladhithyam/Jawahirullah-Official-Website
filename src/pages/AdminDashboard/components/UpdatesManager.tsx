import React, { useState } from 'react';
import { useUpdates } from '@/hooks/useFirebase';
import { Update } from '@/types';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';
// import Input from '@/components/ui/Input';
import { useForm } from 'react-hook-form';

interface UpdateFormData {
  type: 'announcement' | 'achievement' | 'event' | 'media' | 'policy';
  text: string;
  textTamil: string;
}

const UpdatesManager: React.FC = () => {
  const { data: updates, loading, error, create, update: updateItem, delete: deleteUpdate } = useUpdates();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState<Update | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<UpdateFormData>();

  const typeOptions = [
    { value: 'announcement', label: 'Announcement', icon: 'Megaphone' },
    { value: 'achievement', label: 'Achievement', icon: 'Award' },
    { value: 'event', label: 'Event', icon: 'Calendar' },
    { value: 'media', label: 'Media', icon: 'Tv' },
    { value: 'policy', label: 'Policy', icon: 'FileText' }
  ];

  const handleEdit = (update: Update) => {
    setEditingUpdate(update);
    setValue('type', update.type);
    setValue('text', update.text);
    setValue('textTamil', update.textTamil);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingUpdate(null);
    reset();
    setIsModalOpen(true);
  };

  const onSubmit = async (data: UpdateFormData) => {
    setIsSubmitting(true);
    try {
      const typeOption = typeOptions.find(opt => opt.value === data.type);
      const updateData = {
        ...data,
        icon: typeOption?.icon || 'Bell'
      };

      if (editingUpdate) {
        await updateItem(editingUpdate.id, updateData);
      } else {
        await create(updateData);
      }

      setIsModalOpen(false);
      reset();
    } catch (error) {
      console.error('Error saving update:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this update?')) {
      await deleteUpdate(id);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement':
        return 'bg-blue-100 text-blue-800';
      case 'achievement':
        return 'bg-green-100 text-green-800';
      case 'event':
        return 'bg-purple-100 text-purple-800';
      case 'media':
        return 'bg-orange-100 text-orange-800';
      case 'policy':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
          <h1 className="font-headline text-3xl font-bold text-primary">Manage Updates</h1>
          <p className="font-body text-text-secondary">Add, edit, and manage latest updates</p>
        </div>
        <Button onClick={handleAdd} iconName="Plus" iconPosition="left">
          Add New Update
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

      {/* Updates Table */}
      <div className="bg-card rounded-xl shadow-elevated overflow-hidden overflow-x-auto">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Type</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary min-w-[200px]">Text (English)</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary min-w-[200px]">Text (Tamil)</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Date</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {updates.map((update) => (
                <tr key={update.id} className="hover:bg-muted/20">
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(update.type)}`}>
                      {update.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-body text-primary line-clamp-2 max-w-xs">{update.text}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-body text-text-secondary line-clamp-2 max-w-xs">{update.textTamil}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-body text-text-secondary text-sm">
                      {(() => {
                        let dateObj: any = update.createdAt;
                        // Firestore Timestamp object (duck typing)
                        if (dateObj && typeof dateObj === 'object' && typeof dateObj.toDate === 'function') {
                          dateObj = dateObj.toDate();
                        } else if (typeof dateObj === 'string' || typeof dateObj === 'number') {
                          dateObj = new Date(dateObj);
                        }
                        return dateObj instanceof Date && !isNaN(dateObj.getTime())
                          ? dateObj.toLocaleDateString()
                          : 'Invalid Date';
                      })()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Edit"
                        onClick={() => handleEdit(update)}
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        iconName="Trash2"
                        onClick={() => handleDelete(update.id)}
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
                  {editingUpdate ? 'Edit Update' : 'Add New Update'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <label className="block font-body font-medium text-primary">
                    Type *
                  </label>
                  <select
                    {...register('type', { required: 'Type is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select type</option>
                    {typeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <p className="text-red-600 text-sm">{errors.type.message}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="block font-body font-medium text-primary">
                    Text (English) *
                  </label>
                  <textarea
                    {...register('text', { required: 'English text is required' })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Update text in English..."
                  />
                  {errors.text && (
                    <p className="text-red-600 text-sm">{errors.text.message}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="block font-body font-medium text-primary">
                    Text (Tamil) *
                  </label>
                  <textarea
                    {...register('textTamil', { required: 'Tamil text is required' })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="தமிழில் புதுப்பிப்பு உரை..."
                  />
                  {errors.textTamil && (
                    <p className="text-red-600 text-sm">{errors.textTamil.message}</p>
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
                    {isSubmitting ? 'Saving...' : editingUpdate ? 'Update' : 'Add Update'}
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

export default UpdatesManager;