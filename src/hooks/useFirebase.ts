import { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import { FirebaseService, AuthService, COLLECTIONS, handleFirebaseError } from '@/services/firebase';
import { Book, Speech, Blog, ContactMessage, Update, Testimonial } from '@/types';

interface UseFirebaseReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  create: (item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string | null>;
  update: (id: string, item: Partial<T>) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
  getById: (id: string) => Promise<T | null>;
  refresh: () => Promise<void>;
  clearError: () => void;
}

export const useFirebase = <T>(collectionName: string): UseFirebaseReturn<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await FirebaseService.getAll<T>(collectionName);
      setData(result);
    } catch (err) {
      const errorMessage = handleFirebaseError(err as Error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  const create = useCallback(async (item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> => {
    setError(null);
    
    try {
      const id = await FirebaseService.create<T>(collectionName, item);
      await fetchData(); // Refresh data
      return id;
    } catch (err) {
      const errorMessage = handleFirebaseError(err as Error);
      setError(errorMessage);
      return null;
    }
  }, [collectionName, fetchData]);

  const update = useCallback(async (id: string, item: Partial<T>): Promise<boolean> => {
    setError(null);
    
    try {
      await FirebaseService.update<T>(collectionName, id, item);
      await fetchData(); // Refresh data
      return true;
    } catch (err) {
      const errorMessage = handleFirebaseError(err as Error);
      setError(errorMessage);
      return false;
    }
  }, [collectionName, fetchData]);

  const deleteItem = useCallback(async (id: string): Promise<boolean> => {
    setError(null);
    
    try {
      await FirebaseService.delete(collectionName, id);
      await fetchData(); // Refresh data
      return true;
    } catch (err) {
      const errorMessage = handleFirebaseError(err as Error);
      setError(errorMessage);
      return false;
    }
  }, [collectionName, fetchData]);

  const getById = useCallback(async (id: string): Promise<T | null> => {
    setError(null);
    
    try {
      const result = await FirebaseService.getById<T>(collectionName, id);
      return result;
    } catch (err) {
      const errorMessage = handleFirebaseError(err as Error);
      setError(errorMessage);
      return null;
    }
  }, [collectionName]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    create,
    update,
    delete: deleteItem,
    getById,
    refresh: fetchData,
    clearError,
  };
};

// Specific hooks for different collections
export const useBooks = () => useFirebase<Book>(COLLECTIONS.BOOKS);
export const useSpeeches = () => useFirebase<Speech>(COLLECTIONS.SPEECHES);
export const useBlogs = () => useFirebase<Blog>(COLLECTIONS.BLOGS);
export const useContactMessages = () => useFirebase<ContactMessage>(COLLECTIONS.CONTACTS);
export const useUpdates = () => useFirebase<Update>(COLLECTIONS.UPDATES);
export const useTestimonials = () => useFirebase<Testimonial>(COLLECTIONS.TESTIMONIALS);

// Authentication hook
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<boolean> => {
    setError(null);
    setLoading(true);

    try {
      await AuthService.signIn(email, password);
      return true;
    } catch (err) {
      const errorMessage = handleFirebaseError(err as Error);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    setError(null);
    
    try {
      await AuthService.signOut();
    } catch (err) {
      const errorMessage = handleFirebaseError(err as Error);
      setError(errorMessage);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    loading,
    error,
    signIn,
    signOut,
    clearError,
    isAuthenticated: !!user,
  };
};