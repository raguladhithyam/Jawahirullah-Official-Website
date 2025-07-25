import React, { useState, useEffect } from 'react';
import { FirebaseService, COLLECTIONS } from '@/services/firebase';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';
import { showToast } from '@/components/ui/Toast';

interface SubscriptionEmail {
  id: string;
  email: string;
  subscribedAt: Date;
  status: 'active' | 'unsubscribed';
  createdAt: Date;
  updatedAt: Date;
}

const EmailManager: React.FC = () => {
  const [emails, setEmails] = useState<SubscriptionEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch emails from Firebase
  const fetchEmails = async () => {
    setLoading(true);
    setError(null);
    try {
      const emailsData = await FirebaseService.getAll<SubscriptionEmail>('newsletter_subscriptions');
      setEmails(emailsData);
    } catch (err) {
      setError('Failed to fetch email subscriptions');
      console.error('Error fetching emails:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this email subscription?')) {
      try {
        await FirebaseService.delete('newsletter_subscriptions', id);
        setEmails(emails.filter(email => email.id !== id));
        showToast.success('Email subscription deleted successfully!');
      } catch (err) {
        setError('Failed to delete email subscription');
        console.error('Error deleting email:', err);
        showToast.error('Failed to delete email subscription. Please try again.');
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'active' | 'unsubscribed') => {
    try {
      await FirebaseService.update('newsletter_subscriptions', id, { status: newStatus });
      setEmails(emails.map(email => 
        email.id === id ? { ...email, status: newStatus } : email
      ));
      showToast.success('Email status updated successfully!');
    } catch (err) {
      setError('Failed to update email status');
      console.error('Error updating email status:', err);
      showToast.error('Failed to update email status. Please try again.');
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
          <h1 className="font-headline text-3xl font-bold text-primary">Email Subscriptions</h1>
          <p className="font-body text-text-secondary">Manage newsletter email subscriptions</p>
        </div>
        <Button onClick={fetchEmails} iconName="RefreshCw" iconPosition="left">
          Refresh
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Subscriptions</p>
              <p className="text-2xl font-bold text-primary">{emails.length}</p>
            </div>
            <Icon name="Mail" size={24} className="text-primary" />
          </div>
        </div>
        <div className="bg-card rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {emails.filter(e => e.status === 'active').length}
              </p>
            </div>
            <Icon name="CheckCircle" size={24} className="text-green-600" />
          </div>
        </div>
        <div className="bg-card rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Unsubscribed</p>
              <p className="text-2xl font-bold text-red-600">
                {emails.filter(e => e.status === 'unsubscribed').length}
              </p>
            </div>
            <Icon name="UserX" size={24} className="text-red-600" />
          </div>
        </div>
      </div>

      {/* Emails Table */}
      <div className="bg-card rounded-xl shadow-elevated overflow-hidden">
        {emails.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Mail" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="font-body text-text-secondary">No email subscriptions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30">
                <tr>
                  <th className="px-6 py-4 text-left font-body font-semibold text-primary">Email</th>
                  <th className="px-6 py-4 text-left font-body font-semibold text-primary">Status</th>
                  <th className="px-6 py-4 text-left font-body font-semibold text-primary">Subscribed Date</th>
                  <th className="px-6 py-4 text-left font-body font-semibold text-primary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {emails.map((email) => (
                  <tr key={email.id} className="hover:bg-muted/20">
                    <td className="px-6 py-4">
                      <p className="font-body font-medium text-primary">{email.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={email.status}
                        onChange={(e) => handleStatusChange(email.id, e.target.value as 'active' | 'unsubscribed')}
                        className={`px-2 py-1 rounded-full text-xs font-medium border-none ${
                          email.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        <option value="active">Active</option>
                        <option value="unsubscribed">Unsubscribed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-body text-text-secondary text-sm">
                        {(() => {
                          let dateObj = email.subscribedAt;
                          // Handle Firestore Timestamp
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
                          variant="destructive"
                          size="sm"
                          iconName="Trash2"
                          onClick={() => handleDelete(email.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailManager;