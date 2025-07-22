import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/AppIcon';
import Button from './Button';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ta'>('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as 'en' | 'ta' || 'en';
    const savedTheme = localStorage.getItem('theme') || 'light';
    setCurrentLanguage(savedLanguage);
    setIsDarkMode(savedTheme === 'dark');
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage: 'en' | 'ta' = currentLanguage === 'en' ? 'ta' : 'en';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('preferred-language', newLanguage);
    window.location.reload();
  };

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navigationItems = [
    {
      path: '/',
      label: currentLanguage === 'en' ? 'Home' : 'முகப்பு',
      icon: 'Home'
    },
    {
      path: '/about',
      label: currentLanguage === 'en' ? 'About' : 'பற்றி',
      icon: 'User'
    },
    {
      path: '/books',
      label: currentLanguage === 'en' ? 'Books' : 'புத்தகங்கள்',
      icon: 'BookOpen'
    },
    {
      path: '/speeches',
      label: currentLanguage === 'en' ? 'Speeches' : 'உரைகள்',
      icon: 'Mic'
    },
    {
      path: '/blog',
      label: currentLanguage === 'en' ? 'Blog' : 'வலைப்பதிவு',
      icon: 'PenTool'
    },
    {
      path: '/contact',
      label: currentLanguage === 'en' ? 'Contact' : 'தொடர்பு',
      icon: 'MessageCircle'
    }
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const Logo = () => (
    <Link 
      to="/" 
      className="flex items-center space-x-3 hover:opacity-80 transition-smooth"
    >
      <div className="w-10 h-10 rounded-lg overflow-hidden">
        <img 
          src="/assets/images/jawahir.png"
          alt="Dr. Jawahirullah"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-headline font-bold text-lg text-primary leading-tight">
          {currentLanguage === 'en' ? 'Dr. Jawahirullah' : 'டாக்டர் ஜவாஹிருல்லாஹ்'}
        </span>
      </div>
    </Link>
  );

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-dignified ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-subtle shadow-elevated' 
          : 'bg-background'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-body font-medium transition-smooth ${
                  isActivePath(item.path)
                    ? 'text-primary bg-muted' :'text-text-secondary hover:text-primary hover:bg-muted/50'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="font-body font-medium"
            >
              {currentLanguage === 'en' ? 'தமிழ்' : 'English'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="font-body text-sm"
            >
              {currentLanguage === 'en' ? 'தமிழ்' : 'EN'}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative"
            >
              <Icon 
                name={isMenuOpen ? "X" : "Menu"} 
                size={20} 
                className="transition-smooth"
              />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`lg:hidden transition-dignified overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="px-4 pb-4 space-y-2 bg-background border-t border-border">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-body font-medium transition-smooth ${
                  isActivePath(item.path)
                    ? 'text-primary bg-muted' :'text-text-secondary hover:text-primary hover:bg-muted/50'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
            
            <div className="pt-4 border-t border-border">
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="default"
                  fullWidth
                  iconName="MessageCircle"
                  iconPosition="left"
                  iconSize={16}
                >
                  {currentLanguage === 'en' ? 'Contact' : 'தொடர்பு'}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;