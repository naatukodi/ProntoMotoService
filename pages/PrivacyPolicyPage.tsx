import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white animate-pageFadeIn">
      <header className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-primary-dark tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-lg text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
      </header>
      
      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-4xl mx-auto text-gray-600 leading-7">
            <p>
              Pronto Moto Services ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
            
            <h2>1. Information We Collect</h2>
            <p>
              We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, fill out a form, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, and phone number.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect in the following ways:
            </p>
            <ul>
              <li>To provide, operate, and maintain our website</li>
              <li>To improve, personalize, and expand our website</li>
              <li>To understand and analyze how you use our website</li>
              <li>To develop new products, services, features, and functionality</li>
              <li>To communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
              <li>To send you emails</li>
              <li>To find and prevent fraud</li>
            </ul>

            <h2>3. Log Files</h2>
            <p>
              Pronto Moto Services follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
            </p>

            <h2>4. Cookies and Web Beacons</h2>
            <p>
              Like any other website, Pronto Moto Services uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            </p>

            <h2>5. Data Security</h2>
            <p>
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
            </p>

            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:connect@prontomoto.in" className="text-accent-orange hover:underline">connect@prontomoto.in</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;