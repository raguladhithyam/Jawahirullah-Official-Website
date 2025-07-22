import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/ui/Header';
import Footer from '@/pages/Home/components/Footer';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy | Dr. MH Jawahirullah</title>
        <meta name="description" content="Privacy Policy for Dr. MH Jawahirullah's digital platform" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Header />

      <main className="pt-16">
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-headline font-bold text-4xl text-primary mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-text-secondary mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="font-headline text-2xl font-semibold text-primary mb-4">1. Information We Collect</h2>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    We collect information you provide directly to us, such as when you:
                  </p>
                  <ul className="list-disc pl-6 text-text-secondary space-y-2">
                    <li>Subscribe to our newsletter</li>
                    <li>Contact us through our contact form</li>
                    <li>Interact with our website and services</li>
                    <li>Provide feedback or comments</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-headline text-2xl font-semibold text-primary mb-4">2. How We Use Your Information</h2>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 text-text-secondary space-y-2">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Send you newsletters and updates about Dr. Jawahirullah's activities</li>
                    <li>Respond to your comments, questions, and requests</li>
                    <li>Analyze usage patterns to improve user experience</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-headline text-2xl font-semibold text-primary mb-4">3. Information Sharing</h2>
                  <p className="text-text-secondary leading-relaxed">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this privacy policy. We may share your information in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 text-text-secondary space-y-2 mt-4">
                    <li>With your explicit consent</li>
                    <li>To comply with legal obligations</li>
                    <li>To protect our rights and safety</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-headline text-2xl font-semibold text-primary mb-4">4. Data Security</h2>
                  <p className="text-text-secondary leading-relaxed">
                    We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                  </p>
                </section>

                <section>
                  <h2 className="font-headline text-2xl font-semibold text-primary mb-4">5. Cookies and Tracking</h2>
                  <p className="text-text-secondary leading-relaxed">
                    We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookies through your browser settings.
                  </p>
                </section>

                <section>
                  <h2 className="font-headline text-2xl font-semibold text-primary mb-4">6. Your Rights</h2>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-6 text-text-secondary space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Unsubscribe from our communications</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-headline text-2xl font-semibold text-primary mb-4">7. Contact Us</h2>
                  <p className="text-text-secondary leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-text-secondary">
                      Email: contact@jawahirullah.org<br />
                      Phone: +91 44 2345 6789<br />
                      Address: Legislative Assembly Complex, Chennai, Tamil Nadu 600009
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="font-headline text-2xl font-semibold text-primary mb-4">8. Changes to This Policy</h2>
                  <p className="text-text-secondary leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;