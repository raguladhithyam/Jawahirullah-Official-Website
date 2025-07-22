import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/ui/Header';
import HeroSection from './components/HeroSection';
import NewsSection from './components/NewsSection';
import ShowcaseSection from './components/ShowcaseSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Dr. MH Jawahirullah - Progressive Leadership Rooted in Service | Tamil Nadu Political Leader</title>
        <meta name="description" content="Dr. MH Jawahirullah's official digital platform showcasing progressive leadership, intellectual publications, oratorical excellence, and commitment to Tamil Nadu's development through transparent governance and social justice." />
        <meta name="keywords" content="Dr Jawahirullah, Tamil Nadu politics, political leader, books, speeches, progressive governance, digital Tamil Nadu, social justice, political commentary" />
        <meta property="og:title" content="Dr. MH Jawahirullah - Progressive Leadership Rooted in Service" />
        <meta property="og:description" content="Bridging traditional Tamil political values with contemporary governance through intellectual leadership and unwavering commitment to progress." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dr. MH Jawahirullah - Progressive Leadership" />
        <meta name="twitter:description" content="Official digital platform of Dr. MH Jawahirullah - Tamil Nadu political leader, author, and advocate for progressive governance." />
        <link rel="canonical" href="/" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          <HeroSection />
          <NewsSection />
          <ShowcaseSection />
          <TestimonialsSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Home;