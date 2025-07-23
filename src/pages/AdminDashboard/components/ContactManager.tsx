import React, { useState } from 'react';
import { useContactMessages } from '@/hooks/useFirebase';
import { ContactMessage } from '@/types';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { showToast } from '@/components/ui/Toast';

const ContactManager: React.FC = () => {
  const { data: contacts, loading, error, update, delete: deleteContact } = useContactMessages();
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [replyMessage, setReplyMessage] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Messages' },
    { value: 'unread', label: 'Unread' },
    { value: 'read', label: 'Read' },
    { value: 'replied', label: 'Replied' }
  ];

  const filteredContacts = filterStatus === 'all' 
    ? contacts 
    : contacts.filter(contact => contact.status === filterStatus);

  const handleStatusChange = async (contactId: string, newStatus: string) => {
    try {
      await update(contactId, { status: newStatus });
      showToast.success('Message status updated successfully!');
    } catch (error) {
      console.error('Error updating message status:', error);
      showToast.error('Failed to update message status. Please try again.');
    }
  };

  const handleReply = async (contactId: string) => {
    if (!replyMessage.trim()) return;

    setIsReplying(true);
    try {
      await update(contactId, {
        status: 'replied',
        replied: true,
        replyMessage,
        replyDate: new Date()
      });
      setReplyMessage('');
      setSelectedContact(null);
      showToast.success('Reply sent successfully!');
    } catch (error) {
      console.error('Error sending reply:', error);
      showToast.error('Failed to send reply. Please try again.');
    } finally {
      setIsReplying(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteContact(id);
        showToast.success('Message deleted successfully!');
      } catch (error) {
        console.error('Error deleting message:', error);
        showToast.error('Failed to delete message. Please try again.');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-gray-100 text-gray-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
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
          <h1 className="font-headline text-3xl font-bold text-primary">Contact Messages</h1>
          <p className="font-body text-text-secondary">Manage and respond to contact form submissions</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select
            options={statusOptions}
            value={filterStatus}
            onChange={(value) => setFilterStatus(value)}
            placeholder="Filter by status"
          />
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Messages</p>
              <p className="text-2xl font-bold text-primary">{contacts.length}</p>
            </div>
            <Icon name="MessageCircle" size={24} className="text-primary" />
          </div>
        </div>
        <div className="bg-card rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Unread</p>
              <p className="text-2xl font-bold text-blue-600">
                {contacts.filter(c => c.status === 'unread').length}
              </p>
            </div>
            <Icon name="Mail" size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-card rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Replied</p>
              <p className="text-2xl font-bold text-green-600">
                {contacts.filter(c => c.replied).length}
              </p>
            </div>
            <Icon name="CheckCircle" size={24} className="text-green-600" />
          </div>
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-card rounded-xl shadow-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Name</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Email</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Subject</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Status</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Date</th>
                <th className="px-6 py-4 text-left font-body font-semibold text-primary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-muted/20">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        contact.status === 'unread' ? 'bg-blue-500' : 'bg-gray-300'
                      }`}></div>
                      <p className="font-body font-medium text-primary">{contact.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-body text-text-secondary">{contact.email}</p>
                    {contact.phone && (
                      <p className="font-body text-sm text-text-secondary">{contact.phone}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-body text-primary truncate max-w-xs">{contact.subject}</p>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={contact.status}
                      onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs font-medium border-none ${getStatusColor(contact.status)}`}
                    >
                      <option value="unread">Unread</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-body text-text-secondary text-sm">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Eye"
                        onClick={() => setSelectedContact(contact)}
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        iconName="Trash2"
                        onClick={() => handleDelete(contact.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-headline text-2xl font-bold text-primary mb-2">
                    Message from {selectedContact.name}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <span>{selectedContact.email}</span>
                    {selectedContact.phone && <span>{selectedContact.phone}</span>}
                    <span>{new Date(selectedContact.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-body font-semibold text-primary mb-2">Subject</h3>
                  <p className="font-body text-text-secondary">{selectedContact.subject}</p>
                </div>

                <div>
                  <h3 className="font-body font-semibold text-primary mb-2">Message</h3>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="font-body text-text-secondary whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>

                {selectedContact.replied && selectedContact.replyMessage && (
                  <div>
                    <h3 className="font-body font-semibold text-primary mb-2">Previous Reply</h3>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="font-body text-green-800 whitespace-pre-wrap">
                        {selectedContact.replyMessage}
                      </p>
                      <p className="font-body text-sm text-green-600 mt-2">
                        Sent on {selectedContact.replyDate ? new Date(selectedContact.replyDate).toLocaleString() : 'Unknown'}
                      </p>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-body font-semibold text-primary mb-2">Send Reply</h3>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Type your reply here..."
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedContact(null)}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => handleReply(selectedContact.id)}
                    disabled={!replyMessage.trim() || isReplying}
                    iconName={isReplying ? "Loader2" : "Send"}
                    iconPosition="left"
                  >
                    {isReplying ? 'Sending...' : 'Send Reply'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManager;