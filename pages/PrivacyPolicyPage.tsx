import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white animate-pageFadeIn">
      <header className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-primary-dark tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </header>

      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-4xl mx-auto text-gray-600 leading-7">
            
            <p>
              Vehga Inspections Private Limited ("we," "our," or "us") is committed to safeguarding your privacy and protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services.
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              We may collect personal identification information in various ways, including when you:
            </p>
            <ul>
              <li>Visit our website</li>
              <li>Fill out contact forms</li>
              <li>Request a vehicle valuation</li>
              <li>Communicate with us via email or phone</li>
            </ul>
            <p>
              Information collected may include your name, email address, phone number, business details, and any other information voluntarily provided.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use collected information for legitimate business purposes, including:
            </p>
            <ul>
              <li>Providing vehicle inspection and valuation services</li>
              <li>Responding to inquiries and service requests</li>
              <li>Improving website functionality and user experience</li>
              <li>Communicating updates, service information, or support</li>
              <li>Ensuring regulatory and compliance requirements are met</li>
              <li>Preventing fraud and ensuring operational security</li>
            </ul>

            <h2>3. Log Files</h2>
            <p>
              Vehga Inspections Private Limited follows standard industry practices for using log files. These logs may include IP addresses, browser type, Internet Service Provider (ISP), date and time stamps, referring/exit pages, and click data. This information is used for analytics, site administration, and security monitoring.
            </p>

            <h2>4. Cookies and Tracking Technologies</h2>
            <p>
              Our website may use cookies and similar tracking technologies to enhance user experience. Cookies help us understand user preferences, optimize website performance, and analyze traffic patterns.
            </p>
            <p>
              You may choose to disable cookies through your browser settings; however, doing so may affect certain functionalities of the website.
            </p>

            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational safeguards to protect your personal information against unauthorized access, alteration, disclosure, or destruction. While we strive to use commercially acceptable means to protect your data, no method of transmission over the internet is completely secure.
            </p>

            <h2>6. Third-Party Disclosure</h2>
            <p>
              We do not sell, trade, or rent personal identification information to third parties. Information may be shared with trusted partners only when necessary to provide services, comply with legal obligations, or protect our legitimate business interests.
            </p>

            <h2>7. Your Consent</h2>
            <p>
              By using our website, you consent to this Privacy Policy and agree to its terms.
            </p>

            <h2>8. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy or how your information is handled, please contact us at{' '}
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

export default PrivacyPolicyPage;
