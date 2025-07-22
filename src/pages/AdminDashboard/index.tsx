import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/hooks/useFirebase';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Stats from './components/Stats';
import BookManager from './components/BookManager';
import SpeechManager from './components/SpeechManager';
import BlogManager from './components/BlogManager';
import ContactManager from './components/ContactManager';
import EmailManager from './components/EmailManager';
import TestimonialManager from './components/TestimonialManager';
import UpdatesManager from './components/UpdatesManager';

export type TabType = 'stats' | 'books' | 'speeches' | 'blogs' | 'contacts' | 'emails' | 'testimonials' | 'updates';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('stats');
  const { user, loading, signIn, signOut, error, clearError } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-body text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Admin Login | Dr. MH Jawahirullah</title>
          <meta name="description" content="Admin login for Dr. MH Jawahirullah's digital platform" />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Login onSignIn={signIn} error={error} clearError={clearError} />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'stats':
        return <Stats />;
      case 'books':
        return <BookManager />;
      case 'speeches':
        return <SpeechManager />;
      case 'blogs':
        return <BlogManager />;
      case 'contacts':
        return <ContactManager />;
      case 'emails':
        return <EmailManager />;
      case 'testimonials':
        return <TestimonialManager />;
      case 'updates':
        return <UpdatesManager />;
      default:
        return <Stats />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin Dashboard | Dr. MH Jawahirullah</title>
        <meta name="description" content="Admin dashboard for managing Dr. MH Jawahirullah's digital platform" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Dashboard
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSignOut={signOut}
        userEmail={user.email || ''}
      >
        {renderContent()}
      </Dashboard>
    </div>
  );
};

export default AdminDashboard;