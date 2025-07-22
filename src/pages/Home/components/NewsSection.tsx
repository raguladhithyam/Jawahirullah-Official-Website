import React, { useState, useEffect } from 'react';
import { useUpdates } from '@/hooks/useFirebase';
import Icon from '@/components/AppIcon';

// Helper to format date as 'Today', 'Yesterday', 'X days ago', 'X months ago', or date
function formatRelativeDate(dateInput: any) {
  let dateObj = dateInput;
  if (dateObj && typeof dateObj === 'object' && typeof dateObj.toDate === 'function') {
    dateObj = dateObj.toDate();
  } else if (typeof dateObj === 'string' || typeof dateObj === 'number') {
    dateObj = new Date(dateObj);
  }
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) return 'Invalid Date';

  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths =
    now.getFullYear() * 12 + now.getMonth() - (dateObj.getFullYear() * 12 + dateObj.getMonth());

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffMonths === 1) return '1 month ago';
  if (diffMonths > 1) return `${diffMonths} months ago`;
  return dateObj.toLocaleDateString();
}

const NewsSection: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ta'>('en');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: updates, loading } = useUpdates();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as 'en' | 'ta' || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Use actual updates from database
  const news = updates.map(update => ({
    id: update.id,
    type: update.type,
    icon: update.icon,
    text: currentLanguage === 'en' ? update.text : update.textTamil,
    time: formatRelativeDate(update.createdAt)
  }));

  useEffect(() => {
    if (news.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [news.length]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement':
        return 'text-blue-600 bg-blue-50';
      case 'achievement':
        return 'text-green-600 bg-green-50';
      case 'event':
        return 'text-purple-600 bg-purple-50';
      case 'media':
        return 'text-orange-600 bg-orange-50';
      case 'policy':
        return 'text-indigo-600 bg-indigo-50';
      default:
        return 'text-primary bg-muted';
    }
  };

  return (
    <div className="bg-primary text-primary-foreground py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          {/* Breaking News Label */}
          <div className="flex items-center space-x-2 mr-6 flex-shrink-0">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="font-body font-semibold text-sm uppercase tracking-wide">
              {currentLanguage === 'en' ? 'Latest Updates' : 'சமீபத்திய புதுப்பிப்புகள்'}
            </span>
          </div>

          {/* News Content */}
          <div className="flex-1 relative overflow-hidden">
            {(loading || news.length === 0) ? (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-blue-50 text-blue-600">
                  <Icon name="Megaphone" size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm truncate pr-4">
                    {currentLanguage === 'en'
                      ? "Latest updates will be managed through admin dashboard"
                      : "சமீபத்திய புதுப்பிப்புகள் நிர்வாக டாஷ்போர்டு மூலம் நிர்வகிக்கப்படும்"}
                  </p>
                </div>
                <span className="font-body text-xs opacity-75 ml-4 flex-shrink-0">
                  {currentLanguage === 'en' ? "Now" : "இப்போது"}
                </span>
              </div>
            ) : (
              <div className="flex transition-transform duration-500 ease-in-out"
                   style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {news.map((item) => (
                  <div key={item.id} className="w-full flex-shrink-0 flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getTypeColor(item.type)}`}>
                      <Icon name={item.icon} size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm truncate pr-4">
                        {item.text}
                      </p>
                    </div>
                    <span className="font-body text-xs opacity-75 ml-4 flex-shrink-0">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center space-x-2 ml-6 flex-shrink-0">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-primary-foreground' 
                    : 'bg-primary-foreground/40 hover:bg-primary-foreground/60'
                }`}
              />
            ))}
          </div>

          {/* Pause/Play Button */}
          <button
            className="ml-4 p-1 hover:bg-primary-foreground/10 rounded transition-colors duration-200"
            onClick={() => {
              // Toggle auto-advance (implementation would require additional state)
            }}
          >
            <Icon name="Pause" size={16} className="opacity-75" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;