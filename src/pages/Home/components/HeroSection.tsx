import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/AppIcon';
import Image from '@/components/AppImage';
import Button from '@/components/ui/Button';

const HeroSection: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ta'>('en');
  // const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as 'en' | 'ta' || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const heroContent = {
    en: {
      title: "Progressive Leadership Rooted in Service",
      subtitle: "Dr. MH Jawahirullah",
      description: "Bridging traditional Tamil political values with contemporary governance, serving the people of Tamil Nadu through intellectual leadership and unwavering commitment to progress.",
      watchLatest: "Watch Latest Speech",
      exploreBooks: "Explore Books",
      readBlog: "Read Latest Blog"
    },
    ta: {
      title: "சேவையில் வேரூன்றிய முற்போக்கு தலைமை",
      subtitle: "டாக்டர் எம்.எச். ஜவாஹிருல்லாஹ்",
      description: "பாரம்பரிய தமிழ் அரசியல் மதிப்புகளை சமகால ஆட்சியுடன் இணைத்து, அறிவுசார் தலைமை மற்றும் முன்னேற்றத்திற்கான அசைக்க முடியாத அர்ப்பணிப்பின் மூலம் தமிழ்நாட்டு மக்களுக்கு சேவை செய்கிறார்.",
      watchLatest: "சமீபத்திய உரையைப் பார்க்கவும்",
      exploreBooks: "புத்தகங்களை ஆராயுங்கள்",
      readBlog: "சமீபத்திய வலைப்பதிவைப் படியுங்கள்"
    }
  };

  const content = heroContent[currentLanguage];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_70%)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-muted rounded-full">
                <Icon name="Shield" size={16} className="text-primary mr-2" />
                <span className="font-body text-sm font-medium text-text-secondary">
                  {currentLanguage === 'en' ? 'Political Leader & Author' : 'அரசியல் தலைவர் & எழுத்தாளர்'}
                </span>
              </div>

              <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                {content.subtitle}
              </h1>

              <p className="font-headline text-xl sm:text-2xl text-text-secondary font-medium leading-relaxed">
                {content.title}
              </p>

              <p className="font-body text-lg text-text-secondary leading-relaxed max-w-2xl">
                {content.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/speeches">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Play"
                  iconPosition="left"
                  className="font-body font-semibold w-full sm:w-auto"
                >
                  {content.watchLatest}
                </Button>
              </Link>

              <Link to="/books">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="BookOpen"
                  iconPosition="left"
                  className="font-body font-semibold w-full sm:w-auto"
                >
                  {content.exploreBooks}
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="font-headline text-2xl font-bold text-primary">15+</div>
                <div className="font-body text-sm text-text-secondary">
                  {currentLanguage === 'en' ? 'Books Published' : 'வெளியிடப்பட்ட புத்தகங்கள்'}
                </div>
              </div>
              <div className="text-center">
                <div className="font-headline text-2xl font-bold text-primary">500+</div>
                <div className="font-body text-sm text-text-secondary">
                  {currentLanguage === 'en' ? 'Speeches Delivered' : 'உரைகள் வழங்கப்பட்டன'}
                </div>
              </div>
              <div className="text-center">
                <div className="font-headline text-2xl font-bold text-primary">25+</div>
                <div className="font-body text-sm text-text-secondary">
                  {currentLanguage === 'en' ? 'Years of Service' : 'சேவை ஆண்டுகள்'}
                </div>
              </div>
            </div>
          </div>

          {/* Video/Image Section */}
          <div className="relative">
            <div className="relative bg-card rounded-2xl shadow-floating overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src="https://static.wixstatic.com/media/c5ef35_0d2ae7cce69342c1964085639e6c47d8~mv2.png"
                  alt="Dr. MH Jawahirullah delivering a speech"
                  className="w-full h-full object-cover"
                />
                
                {/* Play Button Overlay */}
                {/* <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-20 h-20 bg-primary/90 hover:bg-primary rounded-full flex items-center justify-center transition-smooth hover:scale-105"
                  >
                    <Icon 
                      name={isPlaying ? "Pause" : "Play"} 
                      size={32} 
                      className="text-primary-foreground ml-1" 
                    />
                  </button>
                </div> */}

                {/* Video Info Overlay */}
                {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="text-white">
                    <h3 className="font-headline text-lg font-semibold mb-2">
                      {currentLanguage === 'en' ?'Vision for Tamil Nadu Development' :'தமிழ்நாடு வளர்ச்சிக்கான பார்வை'
                      }
                    </h3>
                    <div className="flex items-center space-x-4 text-sm opacity-90">
                      <span className="flex items-center">
                        <Icon name="Calendar" size={14} className="mr-1" />
                        {currentLanguage === 'en' ? 'Dec 15, 2024' : '15 டிசம்பர், 2024'}
                      </span>
                      <span className="flex items-center">
                        <Icon name="Eye" size={14} className="mr-1" />
                        {currentLanguage === 'en' ? '25.4K views' : '25.4K பார்வைகள்'}
                      </span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Floating Achievement Card */}
            {/* <div className="absolute -bottom-6 -right-6 bg-card rounded-xl shadow-elevated p-4 border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Award" size={24} className="text-primary" />
                </div>
                <div>
                  <div className="font-body font-semibold text-primary">
                    {currentLanguage === 'en' ? 'Latest Recognition' : 'சமீபத்திய அங்கீகாரம்'}
                  </div>
                  <div className="font-body text-sm text-text-secondary">
                    {currentLanguage === 'en' ? 'Excellence in Public Service' : 'பொதுச் சேவையில் சிறப்பு'}
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="font-body text-xs text-text-secondary">
            {currentLanguage === 'en' ? 'Scroll to explore' : 'ஆராய்வதற்கு ஸ்க்ரோல் செய்யவும்'}
          </span>
          <Icon name="ChevronDown" size={20} className="text-text-secondary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;