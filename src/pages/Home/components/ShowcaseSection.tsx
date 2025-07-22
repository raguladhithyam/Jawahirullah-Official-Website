import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBooks, useSpeeches } from '@/hooks/useFirebase';
import Icon from '@/components/AppIcon';
import Image from '@/components/AppImage';
import Button from '@/components/ui/Button';

const ShowcaseSection: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ta'>('en');
  const { data: books, loading: booksLoading } = useBooks();
  const { data: speeches, loading: speechesLoading } = useSpeeches();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as 'en' | 'ta' || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const content = {
    sectionTitle: currentLanguage === 'en' ? "Leadership Excellence" : "தலைமைத்துவ சிறப்பு",
    sectionSubtitle: currentLanguage === 'en' 
      ? "Discover the pillars of progressive governance through intellectual depth, oratorical mastery, and contemporary political discourse."
      : "அறிவுசார் ஆழம், பேச்சுத்திறன் மற்றும் சமகால அரசியல் சொற்பொழிவு மூலம் முற்போக்கு ஆட்சியின் தூண்களைக் கண்டறியுங்கள்.",
    booksTitle: currentLanguage === 'en' ? "Latest Publications" : "சமீபத்திய வெளியீடுகள்",
    speechesTitle: currentLanguage === 'en' ? "Recent Speeches" : "சமீபத்திய உரைகள்",
    viewAllBooks: currentLanguage === 'en' ? "View All Books" : "அனைத்து புத்தகங்களையும் பார்க்கவும்",
    viewAllSpeeches: currentLanguage === 'en' ? "View All Speeches" : "அனைத்து உரைகளையும் பார்க்கவும்",
    watchNow: currentLanguage === 'en' ? "Watch Now" : "இப்போது பார்க்கவும்",
    readMore: currentLanguage === 'en' ? "Read More" : "மேலும் படிக்க",
    noBooks: currentLanguage === 'en' ? "No books available" : "புத்தகங்கள் எதுவும் கிடைக்கவில்லை",
    noSpeeches: currentLanguage === 'en' ? "No speeches available" : "உரைகள் எதுவும் கிடைக்கவில்லை"
  };

  // Get published books and speeches, limited to 3 each for showcase
  const publishedBooks = books.filter(book => book.status === 'published').slice(0, 3);
  const publishedSpeeches = speeches.filter(speech => speech.status === 'published').slice(0, 3);

  const getYouTubeVideoId = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname === "youtu.be") {
        return parsedUrl.pathname.slice(1, 12);
      }
      if (parsedUrl.hostname.includes("youtube.com")) {
        if (parsedUrl.searchParams.has("v")) {
          return parsedUrl.searchParams.get("v");
        }
        const embedMatch = parsedUrl.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
        if (embedMatch) return embedMatch[1];
      }
    } catch (e) {
      const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([a-zA-Z0-9_-]{11})/);
      return match ? match[1] : null;
    }
    return null;
  };

  const getYouTubeThumbnail = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  const isLoading = booksLoading || speechesLoading;

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="font-body text-text-secondary">
              {currentLanguage === 'en' ? 'Loading content...' : 'உள்ளடக்கம் ஏற்றப்படுகிறது...'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary mb-4">
            {content.sectionTitle}
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            {content.sectionSubtitle}
          </p>
        </div>

        {/* Books Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline text-2xl font-semibold text-primary">
              {content.booksTitle}
            </h3>
            {publishedBooks.length > 0 && (
              <Link to="/books">
                <Button variant="outline" iconName="ArrowRight" iconPosition="right">
                  {content.viewAllBooks}
                </Button>
              </Link>
            )}
          </div>

          {publishedBooks.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedBooks.map((book) => (
                <div 
                  key={book.id} 
                  className="bg-card rounded-xl shadow-elevated overflow-hidden hover-lift transition-smooth cursor-pointer"
                  onClick={() => window.open(book.buyLink, '_blank')}
                >
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={book.coverImageUrl || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop'}
                      alt={currentLanguage === 'en' ? book.title : book.titleTamil}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="font-headline text-lg font-semibold text-white mb-2 line-clamp-2">
                        {currentLanguage === 'en' ? book.title : book.titleTamil}
                      </h4>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        iconName="ExternalLink" 
                        iconPosition="right"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(book.buyLink, '_blank');
                        }}
                      >
                        {content.readMore}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-xl">
              <Icon name="BookOpen" size={48} className="text-text-secondary mx-auto mb-4" />
              <p className="font-body text-text-secondary">{content.noBooks}</p>
            </div>
          )}
        </div>

        {/* Speeches Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline text-2xl font-semibold text-primary">
              {content.speechesTitle}
            </h3>
            {publishedSpeeches.length > 0 && (
              <Link to="/speeches">
                <Button variant="outline" iconName="ArrowRight" iconPosition="right">
                  {content.viewAllSpeeches}
                </Button>
              </Link>
            )}
          </div>

          {publishedSpeeches.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedSpeeches.map((speech) => (
                <div key={speech.id} className="bg-card rounded-xl shadow-elevated overflow-hidden hover-lift transition-smooth">
                  <div className="aspect-video relative">
                    <Image
                      src={speech.thumbnailUrl || getYouTubeThumbnail(speech.videoUrl) || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop'}
                      alt={currentLanguage === 'en' ? speech.title : speech.titleTamil}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-smooth">
                      <button
                        onClick={() => window.open(speech.videoUrl, '_blank')}
                        className="w-16 h-16 bg-primary/90 hover:bg-primary rounded-full flex items-center justify-center transition-smooth hover:scale-105"
                      >
                        <Icon name="Play" size={24} className="text-primary-foreground ml-1" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="font-headline text-lg font-semibold text-primary mb-3 line-clamp-2">
                      {currentLanguage === 'en' ? speech.title : speech.titleTamil}
                    </h4>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Play"
                      iconPosition="left"
                      onClick={() => window.open(speech.videoUrl, '_blank')}
                      fullWidth
                    >
                      {content.watchNow}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-xl">
              <Icon name="Mic" size={48} className="text-text-secondary mx-auto mb-4" />
              <p className="font-body text-text-secondary">{content.noSpeeches}</p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        {(publishedBooks.length > 0 || publishedSpeeches.length > 0) && (
          <div className="mt-16 text-center">
            <div className="bg-primary text-primary-foreground rounded-xl p-8">
              <h3 className="font-headline text-2xl font-semibold mb-4">
                {currentLanguage === 'en' 
                  ? 'Explore More Content' 
                  : 'மேலும் உள்ளடக்கத்தை ஆராயுங்கள்'
                }
              </h3>
              <p className="font-body text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                {currentLanguage === 'en'
                  ? 'Dive deeper into Dr. Jawahirullah\'s intellectual contributions and oratorical excellence.'
                  : 'டாக்டர் ஜவாஹிருல்லாஹ்வின் அறிவுசார் பங்களிப்புகள் மற்றும் பேச்சுத்திறன் சிறப்பை ஆழமாக ஆராயுங்கள்.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/books">
                  <Button 
                    variant="secondary" 
                    iconName="BookOpen" 
                    iconPosition="left"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    {currentLanguage === 'en' ? 'Browse Books' : 'புத்தகங்களைப் பார்க்கவும்'}
                  </Button>
                </Link>
                <Link to="/speeches">
                  <Button 
                    variant="secondary" 
                    iconName="Mic" 
                    iconPosition="left"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    {currentLanguage === 'en' ? 'Watch Speeches' : 'உரைகளைப் பார்க்கவும்'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShowcaseSection;