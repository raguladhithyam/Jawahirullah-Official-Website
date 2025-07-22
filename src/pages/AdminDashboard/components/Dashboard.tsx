import React from 'react';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';
import { TabType } from '../index';

interface DashboardProps {
  children: React.ReactNode;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onSignOut: () => void;
  userEmail: string;
}

const Dashboard: React.FC<DashboardProps> = ({
  children,
  activeTab,
  setActiveTab,
  onSignOut,
  userEmail
}) => {
  const navigationItems = [
    { id: 'stats', label: 'Dashboard', icon: 'BarChart3' },
    { id: 'books', label: 'Books', icon: 'BookOpen' },
    { id: 'speeches', label: 'Speeches', icon: 'Mic' },
    { id: 'blogs', label: 'Blogs', icon: 'PenTool' },
    { id: 'contacts', label: 'Messages', icon: 'MessageCircle' },
    { id: 'emails', label: 'Emails', icon: 'Mail' },
    { id: 'testimonials', label: 'Testimonials', icon: 'Quote' },
    { id: 'updates', label: 'Updates', icon: 'Bell' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-headline font-bold text-lg text-primary">
                  Admin Dashboard
                </h1>
                <p className="font-body text-sm text-text-secondary">
                  Dr. MH Jawahirullah Platform
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-body text-sm font-medium text-primary">
                  {userEmail}
                </p>
                <p className="font-body text-xs text-text-secondary">
                  Administrator
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="LogOut"
                iconPosition="left"
                onClick={onSignOut}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border min-h-[calc(100vh-4rem)]">
          <nav className="p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id as TabType)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-body font-medium transition-smooth ${
                      activeTab === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-text-secondary hover:bg-muted hover:text-primary'
                    }`}
                  >
                    <Icon name={item.icon} size={20} />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;