import React, { useEffect, useState } from 'react';
import Icon from '@/components/AppIcon';
import { useBooks, useSpeeches, useBlogs, useContactMessages } from '@/hooks/useFirebase';

const Stats: React.FC = () => {
  const { data: books } = useBooks();
  const { data: speeches } = useSpeeches();
  const { data: blogs } = useBlogs();
  const { data: contacts } = useContactMessages();

  const stats = [
    {
      title: 'Total Books',
      value: books.length,
      icon: 'BookOpen',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Speeches',
      value: speeches.length,
      icon: 'Mic',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Blogs',
      value: blogs.length,
      icon: 'PenTool',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'New Messages',
      value: contacts.filter(c => c.status === 'unread').length,
      icon: 'MessageCircle',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentBooks = books.slice(0, 5);
  const recentSpeeches = speeches.slice(0, 5);
  const recentBlogs = blogs.slice(0, 5);
  const recentContacts = contacts.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-headline text-3xl font-bold text-primary mb-2">
          Dashboard Overview
        </h1>
        <p className="font-body text-text-secondary">
          Welcome to the admin dashboard. Here's a summary of your platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card rounded-xl shadow-elevated p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm text-text-secondary mb-1">
                  {stat.title}
                </p>
                <p className="font-headline text-3xl font-bold text-primary">
                  {stat.value}
                </p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={stat.icon} size={24} className={stat.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Books */}
        <div className="bg-card rounded-xl shadow-elevated p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline text-xl font-semibold text-primary">
              Recent Books
            </h2>
            <Icon name="BookOpen" size={20} className="text-text-secondary" />
          </div>
          <div className="space-y-4">
            {recentBooks.length === 0 ? (
              <p className="font-body text-text-secondary text-center py-4">
                No books added yet
              </p>
            ) : (
              recentBooks.map((book) => (
                <div key={book.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="BookOpen" size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-medium text-primary truncate">
                      {book.title}
                    </p>
                    <p className="font-body text-sm text-text-secondary">
                      {book.status} • {new Date(book.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-card rounded-xl shadow-elevated p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline text-xl font-semibold text-primary">
              Recent Messages
            </h2>
            <Icon name="MessageCircle" size={20} className="text-text-secondary" />
          </div>
          <div className="space-y-4">
            {recentContacts.length === 0 ? (
              <p className="font-body text-text-secondary text-center py-4">
                No messages received yet
              </p>
            ) : (
              recentContacts.map((contact) => (
                <div key={contact.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="MessageCircle" size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-medium text-primary truncate">
                      {contact.name}
                    </p>
                    <p className="font-body text-sm text-text-secondary truncate">
                      {contact.subject}
                    </p>
                    <p className="font-body text-xs text-text-secondary">
                      {contact.status} • {new Date(contact.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;