import React, { useState, useEffect } from 'react';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';

interface SubscriptionEmail {
  id: string;
  email: string;
  subscribedAt: Date;
  status: 'active' | 'unsubscribed';
}

const EmailManager: React.FC = () => {
  const [emails, setEmails] = useState<SubscriptionEmail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data for now - replace with actual Firebase integration
  useEffect(() => {
    const mockEmails: SubscriptionEmail[] = [
      {
        id: '1',
        email: 'user1@example.com',
        subscribedAt: new Date('2024-01-15'),
        status: 'active'
      },
      {
        id: '2',
        email: 'user2@example.com',
        subscribedAt: new Date('2024-01-20'),
        status: 'active'
      },
      {
        id: '3',
        email: 'user3@example.com',
        subscribedAt: new Date('2024-01-25'),
        status: 'unsubscribed'
      }
    ];
    setEmails(mockEmails);
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this email subscription?')) {
      setEmails(emails.filter(email => email.id !== id));
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'active' | 'unsubscribed') => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, status: newStatus } : email
    ));
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
                      {email.subscribedAt.toLocaleDateString()}
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
      </div>
    </div>
  );
};

export default EmailManager;