import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/ui/Header';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useForm } from 'react-hook-form';
import { FirebaseService, COLLECTIONS } from '@/services/firebase';
import { ContactMessage } from '@/types';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ta'>('en');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as 'en' | 'ta' || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const content = {
    en: {
      title: "Contact Dr. Jawahirullah",
      subtitle: "Get in touch for inquiries, feedback, or collaboration opportunities",
      form: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number (Optional)",
        subject: "Subject",
        message: "Your Message",
        submit: "Send Message",
        submitting: "Sending..."
      },
      contactInfo: {
        title: "Contact Information",
        address: "Legislative Assembly Complex, Chennai, Tamil Nadu 600009",
        phone: "+91 44 2345 6789",
        email: "contact@jawahirullah.org",
        office: "Office Hours: Monday - Friday, 9:00 AM - 6:00 PM"
      },
      success: "Thank you for your message! We will get back to you soon.",
      error: "Failed to send message. Please try again."
    },
    ta: {
      title: "டாக்டர் ஜவாஹிருல்லாஹ்வை தொடர்பு கொள்ளுங்கள்",
      subtitle: "விசாரணைகள், கருத்துகள் அல்லது ஒத்துழைப்பு வாய்ப்புகளுக்கு தொடர்பு கொள்ளுங்கள்",
      form: {
        name: "முழு பெயர்",
        email: "மின்னஞ்சல் முகவரி",
        phone: "தொலைபேசி எண் (விருப்பமானது)",
        subject: "விஷயம்",
        message: "உங்கள் செய்தி",
        submit: "செய்தி அனுப்பவும்",
        submitting: "அனுப்புகிறது..."
      },
      contactInfo: {
        title: "தொடர்பு தகவல்",
        address: "சட்டமன்ற வளாகம், சென்னை, தமிழ்நாடு 600009",
        phone: "+91 44 2345 6789",
        email: "contact@jawahirullah.org",
        office: "அலுவலக நேரம்: திங்கள் - வெள்ளி, காலை 9:00 - மாலை 6:00"
      },
      success: "உங்கள் செய்திக்கு நன்றி! நாங்கள் விரைவில் உங்களைத் தொடர்பு கொள்வோம்.",
      error: "செய்தி அனுப்ப முடியவில்லை. மீண்டும் முயற்சிக்கவும்."
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const contactMessage: Omit<ContactMessage, 'id' | 'createdAt' | 'updatedAt'> = {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        subject: data.subject,
        message: data.message,
        status: 'unread',
        replied: false
      };

      await FirebaseService.create<ContactMessage>(COLLECTIONS.CONTACTS, contactMessage);
      setSubmitSuccess(true);
      reset();
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitError(content[currentLanguage].error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>
          {currentLanguage === 'en' 
            ? 'Contact Dr. Jawahirullah | Get in Touch' 
            : 'டாக்டர் ஜவாஹிருல்லாஹ்வை தொடர்பு கொள்ளுங்கள் | தொடர்பு கொள்ளுங்கள்'
          }
        </title>
        <meta 
          name="description" 
          content={currentLanguage === 'en' 
            ? 'Contact Dr. MH Jawahirullah for inquiries, feedback, or collaboration opportunities. Reach out to discuss political initiatives, policy matters, or schedule meetings.'
            : 'விசாரணைகள், கருத்துகள் அல்லது ஒத்துழைப்பு வாய்ப்புகளுக்கு டாக்டர் எம்.எச். ஜவாஹிருல்லாஹ்வை தொடர்பு கொள்ளுங்கள்.'
          }
        />
      </Helmet>

      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="font-headline font-bold text-4xl lg:text-5xl text-primary mb-4">
                {content[currentLanguage].title}
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                {content[currentLanguage].subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-card rounded-xl shadow-elevated p-8">
                <h2 className="font-headline font-bold text-2xl text-primary mb-6">
                  {currentLanguage === 'en' ? 'Send a Message' : 'செய்தி அனுப்பவும்'}
                </h2>

                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <Icon name="CheckCircle" size={20} className="text-green-600 mr-2" />
                      <p className="text-green-800 font-medium">
                        {content[currentLanguage].success}
                      </p>
                    </div>
                  </div>
                )}

                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <Icon name="AlertCircle" size={20} className="text-red-600 mr-2" />
                      <p className="text-red-800 font-medium">
                        {submitError}
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label={content[currentLanguage].form.name}
                      {...register('name', { required: 'Name is required' })}
                      error={errors.name?.message}
                      className="border border-gray-300"
                      required
                    />
                    <Input
                      type="email"
                      label={content[currentLanguage].form.email}
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      error={errors.email?.message}
                      className="border border-gray-300"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      type="tel"
                      label={content[currentLanguage].form.phone}
                      {...register('phone')}
                      className="border border-gray-300"
                    />
                    <Input
                      label={content[currentLanguage].form.subject}
                      {...register('subject', { required: 'Subject is required' })}
                      error={errors.subject?.message}
                      className="border border-gray-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      {content[currentLanguage].form.message} *
                    </label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth resize-none"
                      placeholder={`${content[currentLanguage].form.message}...`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    fullWidth
                    disabled={isSubmitting}
                    iconName={isSubmitting ? "Loader2" : "Send"}
                    iconPosition="right"
                    className={isSubmitting ? "animate-spin" : ""}
                  >
                    {isSubmitting 
                      ? content[currentLanguage].form.submitting 
                      : content[currentLanguage].form.submit
                    }
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-card rounded-xl shadow-elevated p-8">
                  <h3 className="font-headline font-bold text-xl text-primary mb-6">
                    {content[currentLanguage].contactInfo.title}
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="MapPin" size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-body font-semibold text-primary mb-1">
                          {currentLanguage === 'en' ? 'Address' : 'முகவரி'}
                        </h4>
                        <p className="font-body text-text-secondary leading-relaxed">
                          {content[currentLanguage].contactInfo.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Phone" size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-body font-semibold text-primary mb-1">
                          {currentLanguage === 'en' ? 'Phone' : 'தொலைபேசி'}
                        </h4>
                        <a 
                          href={`tel:${content[currentLanguage].contactInfo.phone}`}
                          className="font-body text-text-secondary hover:text-primary transition-smooth"
                        >
                          {content[currentLanguage].contactInfo.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Mail" size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-body font-semibold text-primary mb-1">
                          {currentLanguage === 'en' ? 'Email' : 'மின்னஞ்சல்'}
                        </h4>
                        <a 
                          href={`mailto:${content[currentLanguage].contactInfo.email}`}
                          className="font-body text-text-secondary hover:text-primary transition-smooth"
                        >
                          {content[currentLanguage].contactInfo.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Clock" size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-body font-semibold text-primary mb-1">
                          {currentLanguage === 'en' ? 'Office Hours' : 'அலுவலக நேரம்'}
                        </h4>
                        <p className="font-body text-text-secondary">
                          {content[currentLanguage].contactInfo.office}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-card rounded-xl shadow-elevated p-8">
                  <h3 className="font-headline font-bold text-xl text-primary mb-6">
                    {currentLanguage === 'en' ? 'Follow Us' : 'எங்களைப் பின்தொடருங்கள்'}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      iconName="Twitter"
                      iconPosition="left"
                      className="justify-start"
                    >
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      iconName="Facebook"
                      iconPosition="left"
                      className="justify-start"
                    >
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      iconName="Youtube"
                      iconPosition="left"
                      className="justify-start"
                    >
                      YouTube
                    </Button>
                    <Button
                      variant="outline"
                      iconName="Instagram"
                      iconPosition="left"
                      className="justify-start"
                    >
                      Instagram
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;