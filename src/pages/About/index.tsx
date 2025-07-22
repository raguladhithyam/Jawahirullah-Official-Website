import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/ui/Header';
import Icon from '@/components/AppIcon';
import Image from '@/components/AppImage';
import Footer from '@/pages/Home/components/Footer';

const About: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ta'>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as 'en' | 'ta' || 'en';
    setCurrentLanguage(savedLanguage);
    window.scrollTo(0, 0);
  }, []);

  const content = {
    en: {
      title: "About Dr. MH Jawahirullah",
      subtitle: "A Life Dedicated to Public Service and Progressive Leadership",
      whoAmI: {
        title: "Who Am I",
        content: "Dr. MH Jawahirullah is a distinguished political leader, author, and advocate for progressive governance in Tamil Nadu. With over 25 years of dedicated public service, he has emerged as a voice for transparent administration, social justice, and inclusive development. His intellectual approach to politics, combined with deep-rooted Tamil cultural values, has made him a respected figure in contemporary Indian politics."
      },
      journey: {
        title: "My Political Journey",
        milestones: [
          {
            year: "1998",
            title: "Entry into Politics",
            description: "Began political career with a focus on grassroots development and community empowerment."
          },
          {
            year: "2006",
            title: "First Legislative Victory",
            description: "Elected to Tamil Nadu Legislative Assembly, representing the voice of progressive change."
          },
          {
            year: "2011",
            title: "Policy Leadership",
            description: "Championed key legislation on digital governance and educational reform."
          },
          {
            year: "2016",
            title: "Literary Contributions",
            description: "Published first political commentary book, establishing intellectual discourse platform."
          },
          {
            year: "2021",
            title: "Digital Transformation",
            description: "Launched comprehensive digital governance initiatives for transparent administration."
          }
        ]
      },
      achievements: {
        title: "Key Achievements",
        items: [
          {
            icon: "BookOpen",
            title: "15+ Publications",
            description: "Authored numerous books on political theory, governance, and Tamil Nadu's development."
          },
          {
            icon: "Users",
            title: "Community Development",
            description: "Initiated over 50 community development projects across Tamil Nadu."
          },
          {
            icon: "Award",
            title: "Recognition",
            description: "Received multiple awards for excellence in public service and literary contributions."
          },
          {
            icon: "Mic",
            title: "500+ Speeches",
            description: "Delivered impactful speeches on governance, development, and social justice."
          }
        ]
      },
      vision: {
        title: "Vision for Tamil Nadu",
        content: "My vision encompasses a Tamil Nadu that seamlessly blends its rich cultural heritage with modern technological advancement. I believe in creating an inclusive society where economic prosperity, social justice, and environmental sustainability coexist harmoniously. Through transparent governance, quality education, and innovative policy-making, we can build a state that serves as a model for progressive development in India."
      }
    },
    ta: {
      title: "டாக்டர் எம்.எச். ஜவாஹிருல்லாஹ் பற்றி",
      subtitle: "பொதுச் சேவை மற்றும் முற்போக்கு தலைமைத்துவத்திற்காக அர்ப்பணிக்கப்பட்ட வாழ்க்கை",
      whoAmI: {
        title: "நான் யார்",
        content: "டாக்டர் எம்.எச். ஜவாஹிருல்லாஹ் ஒரு புகழ்பெற்ற அரசியல் தலைவர், எழுத்தாளர் மற்றும் தமிழ்நாட்டில் முற்போக்கு ஆட்சிக்கான வக்கீல். 25 ஆண்டுகளுக்கும் மேலான அர்ப்பணிப்புள்ள பொதுச் சேவையுடன், அவர் வெளிப்படையான நிர்வாகம், சமூக நீதி மற்றும் உள்ளடக்கிய வளர்ச்சிக்கான குரலாக உருவெடுத்துள்ளார்."
      },
      journey: {
        title: "எனது அரசியல் பயணம்",
        milestones: [
          {
            year: "1998",
            title: "அரசியலில் நுழைவு",
            description: "அடிமட்ட வளர்ச்சி மற்றும் சமூக அதிகாரமளித்தலில் கவனம் செலுத்தி அரசியல் வாழ்க்கையைத் தொடங்கினார்."
          },
          {
            year: "2006",
            title: "முதல் சட்டமன்ற வெற்றி",
            description: "தமிழ்நாடு சட்டமன்றத்திற்கு தேர்ந்தெடுக்கப்பட்டு, முற்போக்கு மாற்றத்தின் குரலைப் பிரதிநிதித்துவப்படுத்தினார்."
          },
          {
            year: "2011",
            title: "கொள்கை தலைமைத்துவம்",
            description: "டிஜிட்டல் ஆட்சி மற்றும் கல்வி சீர்திருத்தம் குறித்த முக்கிய சட்டங்களை முன்னெடுத்தார்."
          },
          {
            year: "2016",
            title: "இலக்கிய பங்களிப்புகள்",
            description: "முதல் அரசியல் வர்ணனை புத்தகத்தை வெளியிட்டு, அறிவுசார் சொற்பொழிவு தளத்தை நிறுவினார்."
          },
          {
            year: "2021",
            title: "டிஜிட்டல் மாற்றம்",
            description: "வெளிப்படையான நிர்வாகத்திற்கான விரிவான டிஜிட்டல் ஆட்சி முன்முயற்சிகளைத் தொடங்கினார்."
          }
        ]
      },
      achievements: {
        title: "முக்கிய சாதனைகள்",
        items: [
          {
            icon: "BookOpen",
            title: "15+ வெளியீடுகள்",
            description: "அரசியல் கோட்பாடு, ஆட்சி மற்றும் தமிழ்நாட்டின் வளர்ச்சி குறித்து பல புத்தகங்களை எழுதியுள்ளார்."
          },
          {
            icon: "Users",
            title: "சமூக வளர்ச்சி",
            description: "தமிழ்நாடு முழுவதும் 50க்கும் மேற்பட்ட சமூக வளர்ச்சி திட்டங்களைத் தொடங்கினார்."
          },
          {
            icon: "Award",
            title: "அங்கீகாரம்",
            description: "பொதுச் சேவை மற்றும் இலக்கிய பங்களிப்புகளில் சிறப்புக்காக பல விருதுகளைப் பெற்றுள்ளார்."
          },
          {
            icon: "Mic",
            title: "500+ உரைகள்",
            description: "ஆட்சி, வளர்ச்சி மற்றும் சமூக நீதி குறித்து தாக்கமான உரைகளை வழங்கியுள்ளார்."
          }
        ]
      },
      vision: {
        title: "தமிழ்நாட்டிற்கான பார்வை",
        content: "எனது பார்வை தமிழ்நாட்டின் வளமான கலாச்சார பாரம்பரியத்தை நவீன தொழில்நுட்ப முன்னேற்றத்துடன் தடையின்றி இணைக்கும் ஒரு தமிழ்நாட்டை உள்ளடக்கியது. பொருளாதார செழிப்பு, சமூக நீதி மற்றும் சுற்றுச்சூழல் நிலைத்தன்மை ஆகியவை இணக்கமாக இணைந்து வாழும் ஒரு உள்ளடக்கிய சமூகத்தை உருவாக்குவதில் நான் நம்புகிறேன்."
      }
    }
  };

  const currentContent = content[currentLanguage];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>
          {currentLanguage === 'en' 
            ? 'About Dr. MH Jawahirullah | Political Leader & Author' 
            : 'டாக்டர் எம்.எச். ஜவாஹிருல்லாஹ் பற்றி | அரசியல் தலைவர் & எழுத்தாளர்'
          }
        </title>
        <meta 
          name="description" 
          content={currentLanguage === 'en' 
            ? 'Learn about Dr. MH Jawahirullah - distinguished political leader, author, and advocate for progressive governance in Tamil Nadu with 25+ years of public service.'
            : 'டாக்டர் எம்.எச். ஜவாஹிருல்லாஹ் பற்றி அறியுங்கள் - புகழ்பெற்ற அரசியல் தலைவர், எழுத்தாளர் மற்றும் 25+ ஆண்டுகள் பொதுச் சேவையுடன் தமிழ்நாட்டில் முற்போக்கு ஆட்சிக்கான வக்கீல்.'
          }
        />
      </Helmet>

      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="font-headline font-bold text-4xl lg:text-5xl text-primary mb-6">
                  {currentContent.title}
                </h1>
                <p className="text-xl text-text-secondary leading-relaxed mb-8">
                  {currentContent.subtitle}
                </p>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="font-headline text-3xl font-bold text-primary">25+</div>
                    <div className="font-body text-sm text-text-secondary">
                      {currentLanguage === 'en' ? 'Years Service' : 'ஆண்டுகள் சேவை'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-headline text-3xl font-bold text-primary">15+</div>
                    <div className="font-body text-sm text-text-secondary">
                      {currentLanguage === 'en' ? 'Books' : 'புத்தகங்கள்'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-headline text-3xl font-bold text-primary">500+</div>
                    <div className="font-body text-sm text-text-secondary">
                      {currentLanguage === 'en' ? 'Speeches' : 'உரைகள்'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-floating">
                  <Image
                    src="https://static.wixstatic.com/media/c5ef35_0d2ae7cce69342c1964085639e6c47d8~mv2.png"
                    alt="Dr. MH Jawahirullah"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Am I Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-headline font-bold text-3xl text-primary mb-8 text-center">
              {currentContent.whoAmI.title}
            </h2>
            <p className="font-body text-lg text-text-secondary leading-relaxed text-center">
              {currentContent.whoAmI.content}
            </p>
          </div>
        </section>

        {/* Political Journey */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-headline font-bold text-3xl text-primary mb-12 text-center">
              {currentContent.journey.title}
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20"></div>
              <div className="space-y-12">
                {currentContent.journey.milestones.map((milestone, index) => (
                  <div key={milestone.year} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-card rounded-xl shadow-elevated p-6">
                        <div className="font-headline font-bold text-2xl text-primary mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="font-headline font-semibold text-xl text-primary mb-3">
                          {milestone.title}
                        </h3>
                        <p className="font-body text-text-secondary leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    <div className="relative z-10">
                      <div className="w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                    </div>
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-headline font-bold text-3xl text-primary mb-12 text-center">
              {currentContent.achievements.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {currentContent.achievements.items.map((achievement, index) => (
                <div key={index} className="bg-card rounded-xl shadow-elevated p-6 text-center hover-lift transition-smooth">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={achievement.icon} size={32} className="text-primary" />
                  </div>
                  <h3 className="font-headline font-semibold text-xl text-primary mb-3">
                    {achievement.title}
                  </h3>
                  <p className="font-body text-text-secondary leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-headline font-bold text-3xl mb-8">
              {currentContent.vision.title}
            </h2>
            <p className="font-body text-lg leading-relaxed opacity-90">
              {currentContent.vision.content}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;