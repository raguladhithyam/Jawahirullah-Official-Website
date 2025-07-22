import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/ui/Header';
import Icon from '@/components/AppIcon';
import Image from '@/components/AppImage';
import { useBooks } from '@/hooks/useFirebase';
import Footer from '@/pages/Home/components/Footer';

const Books: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ta'>('en');
  const { data: books, loading, error } = useBooks();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as 'en' | 'ta' || 'en';
    setCurrentLanguage(savedLanguage);
    window.scrollTo(0, 0);
  }, []);

  const content = {
    en: {
      title: "Literary Legacy",
      subtitle: "Explore Dr. Jawahirullah's comprehensive collection of books on politics, governance, and Tamil Nadu's development",
      categories: "Categories",
      allBooks: "All Books",
      political: "Political Analysis",
      governance: "Governance",
      development: "Development",
      culture: "Culture & Society",
      readMore: "Read More",
      downloadPdf: "Download PDF",
      publishedOn: "Published on",
      pages: "pages",
      noBooks: "No books found in this category.",
      loading: "Loading books..."
    },
    ta: {
      title: "இலக்கிய மரபு",
      subtitle: "அரசியல், ஆட்சி மற்றும் தமிழ்நாட்டின் வளர்ச்சி குறித்த டாக்டர் ஜவாஹிருல்லாஹ்வின் விரிவான புத்தக தொகுப்பை ஆராயுங்கள்",
      categories: "வகைகள்",
      allBooks: "அனைத்து புத்தகங்கள்",
      political: "அரசியல் பகுப்பாய்வு",
      governance: "ஆட்சி",
      development: "வளர்ச்சி",
      culture: "கலாச்சாரம் & சமூகம்",
      readMore: "மேலும் படிக்க",
      downloadPdf: "PDF பதிவிறக்கம்",
      publishedOn: "வெளியிடப்பட்ட தேதி",
      pages: "பக்கங்கள்",
      noBooks: "இந்த வகையில் புத்தகங்கள் எதுவும் கிடைக்கவில்லை.",
      loading: "புத்தகங்கள் ஏற்றப்படுகின்றன..."
    }
  };

  const currentContent = content[currentLanguage];

  const filteredBooks = books.filter(book => book.status === 'published');

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="font-body text-text-secondary">{currentContent.loading}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>
          {currentLanguage === 'en' 
            ? 'Books by Dr. MH Jawahirullah | Literary Legacy' 
            : 'டாக்டர் எம்.எச். ஜவாஹிருல்லாஹ்வின் புத்தகங்கள் | இலக்கிய மரபு'
          }
        </title>
        <meta 
          name="description" 
          content={currentLanguage === 'en' 
            ? 'Explore Dr. MH Jawahirullah\'s comprehensive collection of books on politics, governance, and Tamil Nadu\'s development. Download and read his literary contributions.'
            : 'அரசியல், ஆட்சி மற்றும் தமிழ்நாட்டின் வளர்ச்சி குறித்த டாக்டர் எம்.எச். ஜவாஹிருல்லாஹ்வின் விரிவான புத்தக தொகுப்பை ஆராயுங்கள்.'
          }
        />
      </Helmet>

      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="font-headline font-bold text-4xl lg:text-5xl text-primary mb-6">
                {currentContent.title}
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                {currentContent.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Categories Filter */}

        {/* Books Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {error && (
              <div className="text-center py-12">
                <Icon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
                <p className="font-body text-red-600">{error}</p>
              </div>
            )}

            {filteredBooks.length === 0 && !loading && !error && (
              <div className="text-center py-12">
                <Icon name="BookOpen" size={48} className="text-text-secondary mx-auto mb-4" />
                <p className="font-body text-text-secondary">{currentContent.noBooks}</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.filter(book => book.status === 'published').map((book) => (
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
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-headline text-xl font-semibold text-primary mb-3 line-clamp-2">
                      {currentLanguage === 'en' ? book.title : book.titleTamil}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Books;