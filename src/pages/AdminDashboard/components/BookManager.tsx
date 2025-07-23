import React, { useState } from 'react';
import { useBooks } from '@/hooks/useFirebase';
import { Book } from '@/types';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import ImageUpload from '@/components/ui/ImageUpload';
import { useForm } from 'react-hook-form';
import { showToast } from '@/components/ui/Toast';

interface BookFormData {
  title: string;
  titleTamil: string;
  buyLink: string;
}

const BookManager: React.FC = () => {
  const { data: books, loading, error, create, update, delete: deleteBook } = useBooks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<BookFormData>();

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' }
  ];

  const genreOptions = [
    { value: 'political', label: 'Political Analysis' },
    { value: 'governance', label: 'Governance' },
    { value: 'development', label: 'Development' },
    { value: 'culture', label: 'Culture & Society' }
  ];

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setCoverImageUrl(book.coverImageUrl);
    setValue('title', book.title);
    setValue('titleTamil', book.titleTamil);
    setValue('buyLink', book.buyLink || '');
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingBook(null);
    setCoverImageUrl('');
    reset();
    setIsModalOpen(true);
  };

  const onSubmit = async (data: BookFormData) => {
    if (!coverImageUrl) {
      alert('Please upload a cover image');
      return;
    }

    setIsSubmitting(true);
    try {
      const bookData = {
        ...data,
        coverImageUrl,
        status: 'published' as const
      };

      if (editingBook) {
        await update(editingBook.id, bookData);
        showToast.success('Book updated successfully!');
      } else {
        await create(bookData);
        showToast.success('Book added successfully!');
      }

      setIsModalOpen(false);
      reset();
      setCoverImageUrl('');
    } catch (error) {
      console.error('Error saving book:', error);
      showToast.error('Failed to save book. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        showToast.success('Book deleted successfully!');
      } catch (error) {
        console.error('Error deleting book:', error);
        showToast.error('Failed to delete book. Please try again.');
      }
    }
  };

  const handleImageUpload = (result: any) => {
    setCoverImageUrl(result.secure_url);
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
          <h1 className="font-headline text-3xl font-bold text-primary">Manage Books</h1>
          <p className="font-body text-text-secondary">Add, edit, and manage book publications</p>
        </div>
        <Button onClick={handleAdd} iconName="Plus" iconPosition="left">
          Add New Book
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

      {/* Books Table */}
      <div className="bg-card rounded-xl shadow-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Cover</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Title</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Buy Link</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-muted/20">
                  <td className="px-6 py-4">
                    <img
                      src={book.coverImageUrl}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-body font-medium text-primary">{book.title}</p>
                      <p className="font-body text-sm text-text-secondary">{book.titleTamil}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a href={book.buyLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      View Link
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Edit"
                        onClick={() => handleEdit(book)}
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        iconName="Trash2"
                        onClick={() => handleDelete(book.id)}
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
                  {editingBook ? 'Edit Book' : 'Add New Book'}
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
                  label="Buy Link"
                  {...register('buyLink', { required: 'Buy link is required' })}
                  error={errors.buyLink?.message}
                  className="border border-gray-300"
                  required
                />

                <div className="space-y-4">
                  <label className="block font-body font-medium text-primary">
                    Cover Image *
                  </label>
                  <ImageUpload
                    onUploadSuccess={handleImageUpload}
                    folder="books"
                    className="border-2 border-dashed border-border rounded-lg p-4"
                  />
                  {coverImageUrl && (
                    <div className="mt-4">
                      <img
                        src={coverImageUrl}
                        alt="Cover preview"
                        className="w-32 h-40 object-cover rounded-lg"
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
                    {isSubmitting ? 'Saving...' : editingBook ? 'Update Book' : 'Add Book'}
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

export default BookManager;