import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';
import { FirebaseService } from '@/services/firebase';
import { showToast } from '@/components/ui/Toast';

const Footer: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ta'>('en');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as 'en' | 'ta' || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const footerContent = {
    en: {
      tagline: "Progressive Leadership Rooted in Service",
      description: "Committed to serving the people of Tamil Nadu through intellectual leadership, transparent governance, and unwavering dedication to progress and social justice.",
      quickLinks: "Quick Links",
      connect: "Connect",
      newsletter: "Stay Updated",
      newsletterDesc: "Subscribe to receive the latest updates on political initiatives, new publications, and upcoming events.",
      emailPlaceholder: "Enter your email address",
      subscribe: "Subscribe",
      followUs: "Follow Us",
      contactInfo: "Contact Information",
      address: "Legislative Assembly Complex, Chennai, Tamil Nadu 600009",
      phone: "+91 44 2345 6789",
      email: "contact@jawahirullah.org",
      office: "Office Hours: Monday - Friday, 9:00 AM - 6:00 PM",
      copyright: "All rights reserved. Dr. MH Jawahirullah Digital Legacy Platform.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      sitemap: "Sitemap"
    },
    ta: {
      tagline: "சேவையில் வேரூன்றிய முற்போக்கு தலைமை",
      description: "அறிவுசார் தலைமை, வெளிப்படையான ஆட்சி மற்றும் முன்னேற்றம் மற்றும் சமூக நீதிக்கான அசைக்க முடியாத அர்ப்பணிப்பின் மூலம் தமிழ்நாட்டு மக்களுக்கு சேவை செய்வதில் உறுதியாக உள்ளோம்.",
      quickLinks: "விரைவு இணைப்புகள்",
      connect: "தொடர்பு",
      newsletter: "புதுப்பித்த நிலையில் இருங்கள்",
      newsletterDesc: "அரசியல் முன்முயற்சிகள், புதிய வெளியீடுகள் மற்றும் வரவிருக்கும் நிகழ்வுகள் பற்றிய சமீபத்திய புதுப்பிப்புகளைப் பெற சந்தா செலுத்துங்கள்.",
      emailPlaceholder: "உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்",
      subscribe: "சந்தா",
      followUs: "எங்களைப் பின்தொடருங்கள்",
      contactInfo: "தொடர்பு தகவல்",
      address: "சட்டமன்ற வளாகம், சென்னை, தமிழ்நாடு 600009",
      phone: "+91 44 2345 6789",
      email: "contact@jawahirullah.org",
      office: "அலுவலக நேரம்: திங்கள் - வெள்ளி, காலை 9:00 - மாலை 6:00",
      copyright: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. டாக்டர் எம்.எச். ஜவாஹிருல்லாஹ் டிஜிட்டல் மரபு தளம்.",
      privacy: "தனியுரிமைக் கொள்கை",
      terms: "சேவை விதிமுறைகள்",
      sitemap: "தள வரைபடம்"
    }
  };

  const content = footerContent[currentLanguage];
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { path: '/', label: currentLanguage === 'en' ? 'Home' : 'முகப்பு' },
    { path: '/about', label: currentLanguage === 'en' ? 'About' : 'பற்றி' },
    { path: '/books', label: currentLanguage === 'en' ? 'Books' : 'புத்தகங்கள்' },
    { path: '/speeches', label: currentLanguage === 'en' ? 'Speeches' : 'உரைகள்' },
    { path: '/blog', label: currentLanguage === 'en' ? 'Blog' : 'வலைப்பதிவு' }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: '#', color: 'hover:text-blue-400' },
    { name: 'Facebook', icon: 'Facebook', url: '#', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: 'Instagram', url: '#', color: 'hover:text-pink-500' },
    { name: 'YouTube', icon: 'Youtube', url: '#', color: 'hover:text-red-500' },
    { name: 'LinkedIn', icon: 'Linkedin', url: '#', color: 'hover:text-blue-700' }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;
    
    // Save to Firebase
    const saveSubscription = async () => {
      try {
        const now = new Date();
        await FirebaseService.create('newsletter_subscriptions', {
          email: email.trim(),
          status: 'active',
          subscribedAt: now
        });
        setEmail('');
        showToast.success(
          currentLanguage === 'en' 
            ? 'Successfully subscribed to newsletter!' 
            : 'செய்திமடலுக்கு வெற்றிகரமாக சந்தா செலுத்தப்பட்டது!'
        );
      } catch (error) {
        console.error('Error saving subscription:', error);
        showToast.error(
          currentLanguage === 'en' 
            ? 'Failed to subscribe. Please try again.' 
            : 'சந்தா செலுத்த முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
        );
      }
    };
    
    saveSubscription();
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <img 
                  src="/assets/images/jawahir.png"
                  alt="Dr. Jawahirullah"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-headline font-bold text-xl">
                  {currentLanguage === 'en' ? 'Dr. Jawahirullah' : 'டாக்டர் ஜவாஹிருல்லாஹ்'}
                </div>
              </div>
            </div>
            
            <p className="font-body text-sm opacity-90 leading-relaxed mb-6">
              {content.description}
            </p>

            {/* Social Links */}
            <div>
              <h4 className="font-body font-semibold mb-4">{content.followUs}</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className={`w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center transition-smooth ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon name={social.icon} size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline font-semibold text-lg mb-6">{content.quickLinks}</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-body text-sm opacity-90 hover:opacity-100 hover:text-primary-foreground transition-smooth"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-headline font-semibold text-lg mb-6">{content.contactInfo}</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={18} className="mt-1 opacity-80" />
                <p className="font-body text-sm opacity-90 leading-relaxed">
                  {content.address}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={18} className="opacity-80" />
                <a href={`tel:${content.phone}`} className="font-body text-sm opacity-90 hover:opacity-100 transition-smooth">
                  {content.phone}
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={18} className="opacity-80" />
                <a href={`mailto:${content.email}`} className="font-body text-sm opacity-90 hover:opacity-100 transition-smooth">
                  {content.email}
                </a>
              </div>
              
              <div className="flex items-start space-x-3">
                <Icon name="Clock" size={18} className="mt-1 opacity-80" />
                <p className="font-body text-sm opacity-90">
                  {content.office}
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-headline font-semibold text-lg mb-6">{content.newsletter}</h3>
            <p className="font-body text-sm opacity-90 mb-6 leading-relaxed">
              {content.newsletterDesc}
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={content.emailPlaceholder}
                  className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg font-body text-sm text-black placeholder-primary-foreground/60 focus:outline-none focus:border-primary-foreground/40 transition-smooth"
                  required
                />
              </div>
              
              <Button
                type="submit"
                variant="secondary"
                fullWidth
                iconName="Send"
                iconPosition="right"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                {content.subscribe}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="font-body text-sm opacity-80">
              © {currentYear} {content.copyright}
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="/privacy-policy" className="font-body text-sm opacity-80 hover:opacity-100 transition-smooth">
                {content.privacy}
              </a>
              <a href="/terms-of-service" className="font-body text-sm opacity-80 hover:opacity-100 transition-smooth">
                {content.terms}
              </a>
              <a href="#" className="font-body text-sm opacity-80 hover:opacity-100 transition-smooth">
                {content.sitemap}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;