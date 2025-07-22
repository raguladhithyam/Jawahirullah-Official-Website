import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/ui/Header';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';
import { useSpeeches } from '@/hooks/useFirebase';
import Footer from '@/pages/Home/components/Footer';

const Speeches: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ta'>('en');
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());
  const { data: speeches, loading, error } = useSpeeches();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as 'en' | 'ta' || 'en';
    setCurrentLanguage(savedLanguage);
    window.scrollTo(0, 0);
  }, []);

  const content = {
    en: {
      title: "Oratorical Excellence",
      subtitle: "Watch Dr. Jawahirullah's powerful speeches on governance, development, and social justice",
      categories: "Categories",
      allSpeeches: "All Speeches",
      governance: "Governance",
      development: "Development",
      social: "Social Justice",
      education: "Education",
      economy: "Economy",
      watchNow: "Watch Now",
      deliveredOn: "Delivered on",
      duration: "Duration",
      views: "Views",
      location: "Location",
      noSpeeches: "No speeches found in this category.",
      loading: "Loading speeches...",
      transcript: "Transcript",
      closeVideo: "Close Video"
    },
    ta: {
      title: "பேச்சுத்திறன் சிறப்பு",
      subtitle: "ஆட்சி, வளர்ச்சி மற்றும் சமூக நீதி குறித்த டாக்டர் ஜவாஹிருல்லாஹ்வின் சக்திவாய்ந்த உரைகளைப் பார்க்கவும்",
      categories: "வகைகள்",
      allSpeeches: "அனைத்து உரைகள்",
      governance: "ஆட்சி",
      development: "வளர்ச்சி",
      social: "சமூக நீதி",
      education: "கல்வி",
      economy: "பொருளாதாரம்",
      watchNow: "இப்போது பார்க்கவும்",
      deliveredOn: "வழங்கப்பட்ட தேதி",
      duration: "கால அளவு",
      views: "பார்வைகள்",
      location: "இடம்",
      noSpeeches: "இந்த வகையில் உரைகள் எதுவும் கிடைக்கவில்லை.",
      loading: "உரைகள் ஏற்றப்படுகின்றன...",
      transcript: "பிரதி",
      closeVideo: "வீடியோவை மூடு"
    }
  };

  const currentContent = content[currentLanguage];

  const getYouTubeVideoId = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname === "youtu.be") {
        // Shortened URL: youtu.be/<id>
        return parsedUrl.pathname.slice(1, 12);
      }
      if (parsedUrl.hostname.includes("youtube.com")) {
        // Standard URL: youtube.com/watch?v=<id>
        if (parsedUrl.searchParams.has("v")) {
          return parsedUrl.searchParams.get("v");
        }
        // Embedded URL: youtube.com/embed/<id>
        const embedMatch = parsedUrl.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
        if (embedMatch) return embedMatch[1];
      }
    } catch (e) {
      // fallback for non-standard URLs
      const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([a-zA-Z0-9_-]{11})/);
      return match ? match[1] : null;
    }
    return null;
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    // Always construct the embed URL without autoplay
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0` : url;
  };

  const toggleVideo = (speechId: string) => {
    setPlayingVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(speechId)) {
        newSet.delete(speechId);
      } else {
        newSet.add(speechId);
      }
      return newSet;
    });
  };

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
            ? 'Speeches by Dr. MH Jawahirullah | Oratorical Excellence' 
            : 'டாக்டர் எம்.எச். ஜவாஹிருல்லாஹ்வின் உரைகள் | பேச்சுத்திறன் சிறப்பு'
          }
        </title>
        <meta 
          name="description" 
          content={currentLanguage === 'en' 
            ? 'Watch Dr. MH Jawahirullah\'s powerful speeches on governance, development, and social justice. Access video recordings of his impactful oratory.'
            : 'ஆட்சி, வளர்ச்சி மற்றும் சமூக நீதி குறித்த டாக்டர் எம்.எச். ஜவாஹிருல்லாஹ்வின் சக்திவாய்ந்த உரைகளைப் பார்க்கவும்.'
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

        {/* Speeches Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {error && (
              <div className="text-center py-12">
                <Icon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
                <p className="font-body text-red-600">{error}</p>
              </div>
            )}

            {/* {filteredSpeeches.length === 0 && !loading && !error && (
              <div className="text-center py-12">
                <Icon name="Mic" size={48} className="text-text-secondary mx-auto mb-4" />
                <p className="font-body text-text-secondary">{currentContent.noSpeeches}</p>
              </div>
            )} */}

            {/* Responsive Grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {speeches.filter(speech => speech.status === 'published').map((speech) => (
                <div key={speech.id} className="bg-card rounded-xl shadow-elevated overflow-hidden hover-lift transition-smooth">
                  {/* Video Section */}
                  <div className="relative">
                    <div className="aspect-video">
                      <iframe
                        src={getYouTubeEmbedUrl(speech.videoUrl)}
                        title={currentLanguage === 'en' ? speech.title : speech.titleTamil}
                        className="w-full h-full rounded-t-xl"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4">
                    {/* Title */}
                    <h3 className="font-headline text-lg font-bold text-primary mb-2 line-clamp-2">
                      {currentLanguage === 'en' ? speech.title : speech.titleTamil}
                    </h3>
                    
                    {/* Description */}
                    {/* {speech.description && (
                      <p className="font-body text-sm text-text-secondary leading-relaxed mb-3 line-clamp-2">
                        {currentLanguage === 'en' ? speech.description : speech.descriptionTamil}
                      </p>
                    )} */}

                    {/* Video Stats */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary mb-3">
                      {/* {speech.views && (
                        <div className="flex items-center">
                          <Icon name="Eye" size={12} className="mr-1" />
                          {formatViews(speech.views)}
                        </div>
                      )}
                      {speech.date && (
                        <div className="flex items-center">
                          <Icon name="Calendar" size={12} className="mr-1" />
                          {formatDate(speech.date)}
                        </div>
                      )} */}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                      <Button
                        variant={playingVideos.has(speech.id) ? "outline" : "default"}
                        size="sm"
                        iconName={playingVideos.has(speech.id) ? "Pause" : "Play"}
                        iconPosition="left"
                        onClick={() => toggleVideo(speech.id)}
                        fullWidth
                      >
                        {playingVideos.has(speech.id) 
                          ? (currentLanguage === 'en' ? 'Hide Video' : 'வீடியோவை மறை') 
                          : currentContent.watchNow
                        }
                      </Button>
                      
                      {speech.videoUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="ExternalLink"
                          iconPosition="right"
                          onClick={() => window.open(speech.videoUrl, '_blank')}
                          fullWidth
                        >
                          {currentLanguage === 'en' ? 'YouTube' : 'YouTube'}
                        </Button>
                      )}
                    </div>

                    {/* Location */}
                    {/* {speech.location && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="flex items-center text-xs text-text-secondary">
                          <Icon name="MapPin" size={12} className="mr-1" />
                          {currentLanguage === 'en' ? speech.location : speech.locationTamil}
                        </div>
                      </div>
                    )} */}
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

export default Speeches;