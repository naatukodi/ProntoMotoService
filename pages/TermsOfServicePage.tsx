import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="bg-white animate-pageFadeIn">
      <header className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-primary-dark tracking-tight">Terms of Service</h1>
          <p className="mt-4 text-lg text-gray-500">Effective Date: {new Date().toLocaleDateString()}</p>
        </div>
      </header>
      
      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-4xl mx-auto text-gray-600 leading-7">
            <p>
              Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the prontomotoservices.com website (the "Service") operated by Pronto Moto Services ("us", "we", or "our").
            </p>
            
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using our Service, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on Pronto Moto Services' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>attempt to decompile or reverse engineer any software contained on our website;</li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            <p>
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time.
            </p>

            <h2>3. Disclaimer</h2>
            <p>
              The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h2>4. Limitation of Liability</h2>
            <p>
              In no event shall Pronto Moto Services or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
            
            <h2>5. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>

            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at <a href="mailto:connect@prontomoto.in" className="text-accent-orange hover:underline">connect@prontomoto.in</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfServicePage;