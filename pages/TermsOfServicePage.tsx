import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="bg-white animate-pageFadeIn">
      <header className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-primary-dark tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Effective Date: {new Date().toLocaleDateString()}
          </p>
        </div>
      </header>

      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-4xl mx-auto text-gray-600 leading-7">

            <p>
              Please read these Terms of Service ("Terms") carefully before using the website and services operated by Vehga Inspections Private Limited ("Company", "we", "our", or "us").
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using our website and services, you agree to be legally bound by these Terms. If you do not agree with any part of these Terms, you must discontinue use of our services immediately.
            </p>

            <h2>2. Services</h2>
            <p>
              Vehga Inspections Private Limited provides vehicle inspection and valuation services for financing institutions, insurance companies, businesses, and individuals. All reports and valuations are prepared based on the information and physical inspection available at the time of assessment.
            </p>

            <h2>3. Use of Website</h2>
            <p>
              You agree to use our website only for lawful purposes and in accordance with these Terms. You must not:
            </p>
            <ul>
              <li>Use the website in any way that violates applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to our systems or data</li>
              <li>Interfere with the proper functioning of the website</li>
              <li>Copy, reproduce, or redistribute website content without written permission</li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, designs, and software, is the property of Vehga Inspections Private Limited and is protected by applicable intellectual property laws. Unauthorized use is strictly prohibited.
            </p>

            <h2>5. Accuracy of Information</h2>
            <p>
              While we strive to ensure the accuracy of information on our website, we do not guarantee that all content is complete, accurate, or current. Vehicle valuation reports are based on inspection findings and available documentation at the time of assessment.
            </p>

            <h2>6. Disclaimer of Warranties</h2>
            <p>
              Our website and services are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We disclaim all warranties including, but not limited to, merchantability, fitness for a particular purpose, and non-infringement.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              In no event shall Vehga Inspections Private Limited, its directors, employees, or affiliates be liable for any indirect, incidental, special, or consequential damages arising out of or related to the use of our website or services.
            </p>

            <h2>8. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Andhra Pradesh, India.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. Continued use of our website after changes constitutes acceptance of the updated Terms.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have any questions regarding these Terms of Service, please contact us at{' '}
              <a
                href="mailto:connect@prontomoto.in"
                className="text-accent-orange hover:underline"
              >
                connect@prontomoto.in
              </a>.
            </p>

          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfServicePage;
