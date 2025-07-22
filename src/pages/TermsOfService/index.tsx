import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/ui/Header';
import Footer from '@/pages/Home/components/Footer';

const TermsOfService: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms of Service | Dr. MH Jawahirullah</title>
        <meta name="description" content="Terms of Service for Dr. MH Jawahirullah's digital platform" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Header />

      <main className="pt-16">
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-headline font-bold text-4xl text-primary mb-8">Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-text-secondary mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="font-headline text-2xl font-semibold text-primary mb-4">1. Acceptance of Terms</h2>
                  <p className="text-text-secondary leading-relaxed">
                    By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </section>

                <section>
                  <h2 className="font-headline text-2xl font-semibold text-primary mb-4">2. Use License</h2>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    Permission is granted to temporarily download one copy of the materials on Dr. MH Jawahirullah's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc pl-6 text-text-secondary space-y-2">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to reverse engineer any software contained on the website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-headline text-2xl font-semibold text-primary mb-4">3. Disclaimer</h2>
                  <p className="text-text-secondary leading-relaxed">
                    The materials on Dr. MH Jawahirullah's website are provided on an 'as is' basis. Dr. MH Jawahirullah makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </section>

                <section>
                  <h2 className="font-headline text-2xl font-semibold text-primary mb-4">4. Limitations</h2>
                  <p className="text-text-secondary leading-relaxed">
                    In no event shall Dr. MH Jawahirullah or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Dr. MH Jawahirullah's website, even if Dr. MH Jawahirullah or an authorized representative has been notified orally or in writing of the possibility of such damage.
                  </p>
                </section>

                <section>
                  <h2 className="font-headline text-2xl font-semibold text-primary mb-4">5. Accuracy of Materials</h2>
                  <p className="text-text-secondary leading-relaxed">
                    The materials appearing on Dr. MH Jawahirullah's website could include technical, typographical, or photographic errors. Dr. MH Jawahirullah does not warrant that any of the materials on its website are accurate, complete, or current. Dr. MH Jawahirullah may make changes to the materials contained on its website at any time without notice.
                  </p>
                </section>

                <section>
                  <h2 className="font-headline text-2xl font-semibold text-primary mb-4">6. Links</h2>
                  <p className="text-text-secondary leading-relaxed">
                    Dr. MH Jawahirullah has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Dr. MH Jawahirullah of the site. Use of any such linked website is at the user's own risk.
                  </p>
                </section>

                <section>
                  <h2 className="font-headline text-2xl font-semibold text-primary mb-4">7. Modifications</h2>
                  <p className="text-text-secondary leading-relaxed">
                    Dr. MH Jawahirullah may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                  </p>
                </section>

                <section>
                  <h2 className="font-headline text-2xl font-semibold text-primary mb-4">8. Governing Law</h2>
                  <p className="text-text-secondary leading-relaxed">
                    These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.
                  </p>
                </section>

                <section>
                  <h2 className="font-headline text-2xl font-semibold text-primary mb-4">9. Contact Information</h2>
                  <p className="text-text-secondary leading-relaxed">
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-text-secondary">
                      Email: contact@jawahirullah.org<br />
                      Phone: +91 44 2345 6789<br />
                      Address: Legislative Assembly Complex, Chennai, Tamil Nadu 600009
                    </p>
                  </div>
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

export default TermsOfService;