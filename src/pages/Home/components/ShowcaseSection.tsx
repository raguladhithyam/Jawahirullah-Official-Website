import React, { useState, useEffect } from 'react';

const ShowcaseSection: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ta'>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as 'en' | 'ta' || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const content = {
    sectionTitle: currentLanguage === 'en' ? "Leadership Excellence" : "தலைமைத்துவ சிறப்பு",
    sectionSubtitle: currentLanguage === 'en' 
      ? "Discover the pillars of progressive governance through intellectual depth, oratorical mastery, and contemporary political discourse."
      : "அறிவுசார் ஆழம், பேச்சுத்திறன் மற்றும் சமகால அரசியல் சொற்பொழிவு மூலம் முற்போக்கு ஆட்சியின் தூண்களைக் கண்டறியுங்கள்."
  };

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

        {/* Showcase Grid */}
        <div className="text-center py-12">
          <p className="font-body text-text-secondary">
            {currentLanguage === 'en' 
              ? 'Content will be dynamically loaded from the admin dashboard.'
              : 'நிர்வாக டாஷ்போர்டிலிருந்து உள்ளடக்கம் மாறும் வகையில் ஏற்றப்படும்.'
            }
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;