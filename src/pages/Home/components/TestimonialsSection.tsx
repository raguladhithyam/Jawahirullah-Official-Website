import React, { useState, useEffect } from 'react';
import { useTestimonials } from '@/hooks/useFirebase';
import Icon from '@/components/AppIcon';
import Image from '@/components/AppImage';

const TestimonialsSection: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ta'>('en');
  const { data: testimonials, loading, error } = useTestimonials();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as 'en' | 'ta' || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const content = {
    en: {
      sectionTitle: "Trusted Leadership",
      sectionSubtitle: "Recognition from constituents, media, and academic institutions validates our commitment to progressive governance."
    },
    ta: {
      sectionTitle: "நம்பகமான தலைமைத்துவம்",
      sectionSubtitle: "தொகுதி மக்கள், ஊடகங்கள் மற்றும் கல்வி நிறுவனங்களின் அங்கீகாரம் முற்போக்கு ஆட்சிக்கான எங்கள் அர்ப்பணிப்பை உறுதிப்படுத்துகிறது."
    }
  };

  const currentContent = content[currentLanguage];

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="font-body text-text-secondary">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Icon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
            <p className="font-body text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary mb-4">
            {currentContent.sectionTitle}
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            {currentContent.sectionSubtitle}
          </p>
        </div>

        {/* Testimonials */}
        {testimonials.length > 0 ? (
          <div className="mb-16">
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-card rounded-xl shadow-elevated p-6 hover-lift transition-smooth">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-body font-semibold text-primary">{testimonial.name}</h4>
                      <p className="font-body text-sm text-text-secondary">{testimonial.designation}</p>
                    </div>
                  </div>
                  
                  <p className="font-body text-text-secondary leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="Quote" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="font-body text-text-secondary">
              {currentLanguage === 'en' 
                ? 'No testimonials available at the moment.'
                : 'தற்போது சான்றுகள் எதுவும் கிடைக்கவில்லை.'
              }
            </p>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-headline text-3xl font-bold text-primary mb-2">25+</div>
              <div className="font-body text-sm text-text-secondary">
                {currentLanguage === 'en' ? 'Years Experience' : 'ஆண்டுகள் அனுபவம்'}
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-bold text-primary mb-2">15+</div>
              <div className="font-body text-sm text-text-secondary">
                {currentLanguage === 'en' ? 'Books Published' : 'வெளியிடப்பட்ட புத்தகங்கள்'}
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-bold text-primary mb-2">500+</div>
              <div className="font-body text-sm text-text-secondary">
                {currentLanguage === 'en' ? 'Speeches Delivered' : 'உரைகள் வழங்கப்பட்டன'}
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="font-body text-sm text-text-secondary">
                {currentLanguage === 'en' ? 'Lives Impacted' : 'பாதிக்கப்பட்ட வாழ்க்கைகள்'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;