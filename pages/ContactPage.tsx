import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { CONTACT_DETAILS, ESCALATION_MATRIX, FOOTER_CONTACT_INFO } from '../constants';
import ClientLogos from '../components/ClientLogos';
import ScrollAnimator from '../components/ScrollAnimator';
import InteractiveMap from '../components/InteractiveMap';
import AnimatedCheckmark from '../components/icons/AnimatedCheckmark';
import { PhoneIcon, UserIcon, ServiceIcon } from '../components/icons/FeatureIcons';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validation logic, can be called at any time
  const validate = (currentFormData: typeof formData) => {
    const newErrors: { [key:string]: string } = {};
    if (!currentFormData.name.trim()) newErrors.name = 'Name is required.';
    
    if (!currentFormData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(currentFormData.email)) {
      newErrors.email = 'Email address is invalid.';
    }
    
    if (!currentFormData.message.trim()) newErrors.message = 'Message is required.';
    
    return newErrors;
  };

  // Effect to run validation in real-time after a field has been touched
  useEffect(() => {
    const validationErrors = validate(formData);
    const touchedErrors = Object.keys(validationErrors).reduce((acc, key) => {
      if (touched[key]) {
        acc[key] = validationErrors[key];
      }
      return acc;
    }, {} as { [key: string]: string | undefined });
    
    setErrors(touchedErrors);
  }, [formData, touched]);


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    
    if (Object.keys(validationErrors).length === 0) {
      const { name, email, message } = formData;
      const subject = encodeURIComponent(`Contact Form Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      
      const mailtoLink = `mailto:${FOOTER_CONTACT_INFO.email}?subject=${subject}&body=${body}`;
      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${FOOTER_CONTACT_INFO.email}&su=${subject}&body=${body}`;
      
      // Use a more robust way to trigger mailto
      const link = document.createElement('a');
      link.href = mailtoLink;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      
      // Small delay before showing success state
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTouched({});
        setErrors({});
      }, 500);
      
      // Auto-reset success message after 10 seconds
      setTimeout(() => setIsSubmitted(false), 10000);
    } else {
      setTouched({ name: true, email: true, message: true });
      setErrors(validationErrors);
    }
  };

  const getLevelBadgeClass = (level: string) => {
    if (level.toLowerCase().includes('nodal')) {
      return 'bg-red-100 text-accent-red';
    }
    if (level.toLowerCase().includes('2nd')) {
      return 'bg-orange-100 text-accent-orange';
    }
    return 'bg-gray-200 text-gray-800';
  };

  const inputBaseClasses = "mt-1 block w-full rounded-lg border px-4 py-3 shadow-sm transition-all duration-300 bg-gray-50 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:scale-[1.02]";
  const inputNormalClasses = "border-gray-300 focus:border-accent-orange focus:ring-accent-orange/50 focus:shadow-lg focus:shadow-accent-orange/30";
  const inputErrorClasses = "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500/50 focus:shadow-lg focus:shadow-red-500/30";


  return (
    <div className="bg-gray-50 animate-pageFadeIn">
      <header 
        className="py-20 text-white text-center relative overflow-hidden bg-cover bg-center"
        style={{backgroundImage: "url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"}}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-teal-950/70 to-black/80 backdrop-blur-[1px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold animate-fadeInDown tracking-tight">Contact Us</h1>
        </div>
      </header>

      <main className="py-16 container mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Contact Info Cards */}
        <section>
            <ScrollAnimator>
                <h2 className="text-3xl font-bold text-center text-teal-700 mb-4">Get In Touch</h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Reach out for enquiries, and to explore the endless possibilities of technological transformation, speed and standards.
                </p>
            </ScrollAnimator>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {CONTACT_DETAILS.map((detail, index) => (
                    <ScrollAnimator key={index} delay={index * 150} animation="animate-card-pop-in">
                        <div 
                            className="bg-white p-8 rounded-lg shadow-lg h-full transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl group border border-gray-100"
                        >
                            <div className="flex flex-col items-center h-full">
                                <div className="w-16 h-16 p-3 flex items-center justify-center text-teal-700 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                                    <div className="w-10 h-10 transition-transform duration-300 group-hover:scale-125">
                                        {detail.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold my-4 text-black">{detail.title}</h3>
                                <div className="space-y-1">
                                    {detail.lines.map((line, lineIndex) => (
                                        line.href ? (
                                            <a key={lineIndex} href={line.href} className="block text-gray-700 hover:text-teal-700 hover:underline transition-colors">{line.text}</a>
                                        ) : (
                                            <p key={lineIndex} className="text-gray-700">{line.text}</p>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollAnimator>
                ))}
            </div>
        </section>

        {/* Map and Form Section */}
        <section className="grid lg:grid-cols-2 gap-12 items-start">
            <ScrollAnimator animation="animate-slideInLeft">
              <div className="bg-white p-8 rounded-lg shadow-2xl h-full">
                <h2 className="text-2xl font-bold text-primary-dark mb-6">Send us a Message</h2>
                {isSubmitted ? (
                  <div className="text-center p-6 bg-green-50 rounded-xl border border-green-100 shadow-inner animate-fadeIn" role="alert">
                    <div className="flex justify-center mb-4">
                      <AnimatedCheckmark />
                    </div>
                    <p className="font-bold text-2xl text-green-800">Message Prepared!</p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                      Your default email application should have opened. 
                      Please click <strong>"Send"</strong> in that app to complete your request.
                    </p>
                    
                    <div className="mt-8 pt-6 border-t border-green-200">
                      <p className="text-sm text-gray-500 mb-4 uppercase tracking-wider font-semibold">If no app opened, try these options:</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        <a 
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${FOOTER_CONTACT_INFO.email}&su=${encodeURIComponent('Contact Form Inquiry')}&body=${encodeURIComponent('Please type your message here...')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-red-100 text-red-600 rounded-xl hover:bg-red-50 transition-all font-semibold shadow-sm"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.38l-9 5.65-9-5.65V21H1.5C.65 21 0 20.35 0 19.5v-15c0-.42.17-.8.44-1.06L12 10.67l11.56-7.23c.27.26.44.64.44 1.06z"/>
                          </svg>
                          Open in Gmail
                        </a>
                        <a 
                          href={`https://outlook.office.com/mail/deeplink/compose?to=${FOOTER_CONTACT_INFO.email}&subject=${encodeURIComponent('Contact Form Inquiry')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-blue-100 text-blue-600 rounded-xl hover:bg-blue-50 transition-all font-semibold shadow-sm"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.3 1.1c.1-.1.2-.1.4-.1h1.6c.2 0 .3 0 .4.1l10.2 10.2c.1.1.1.2.1.4v1.6c0 .2 0 .3-.1.4L13.7 23.9c-.1.1-.2.1-.4.1h-1.6c-.2 0-.3 0-.4-.1L1.1 13.7c-.1-.1-.1-.2-.1-.4v-1.6c0-.2 0-.3.1-.4L11.3 1.1z"/>
                          </svg>
                          Open in Outlook
                        </a>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <code className="bg-white px-4 py-2 rounded-lg border border-green-200 text-teal-700 font-mono text-lg shadow-sm">
                          {FOOTER_CONTACT_INFO.email}
                        </code>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(FOOTER_CONTACT_INFO.email);
                            alert('Email address copied to clipboard!');
                          }}
                          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 shadow-md"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          Copy Email
                        </button>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-8 text-teal-600 hover:text-teal-800 font-semibold underline underline-offset-4"
                    >
                      Back to form
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name <span className="text-accent-red">*</span></label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} className={`${inputBaseClasses} ${errors.name ? inputErrorClasses : inputNormalClasses}`} required aria-invalid={!!errors.name} />
                      {errors.name && <p className="mt-1.5 text-sm font-semibold text-red-600">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email <span className="text-accent-red">*</span></label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} className={`${inputBaseClasses} ${errors.email ? inputErrorClasses : inputNormalClasses}`} required aria-invalid={!!errors.email} />
                      {errors.email && <p className="mt-1.5 text-sm font-semibold text-red-600">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message <span className="text-accent-red">*</span></label>
                      <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} onBlur={handleBlur} className={`${inputBaseClasses} ${errors.message ? inputErrorClasses : inputNormalClasses}`} required aria-invalid={!!errors.message}></textarea>
                      {errors.message && <p className="mt-1.5 text-sm font-semibold text-red-600">{errors.message}</p>}
                    </div>
                    <button type="submit" className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-lg text-base font-medium rounded-lg text-white bg-accent-orange hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-orange transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-accent-orange/40 animate-pulsate">
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </ScrollAnimator>
            <ScrollAnimator animation="animate-slideInRight" delay={200}>
                <div className="rounded-lg shadow-2xl overflow-hidden p-1 bg-white border border-gray-200">
                  <InteractiveMap />
                </div>
            </ScrollAnimator>
        </section>

        {/* Customer Support Section */}
        <section>
            <ScrollAnimator>
                <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white rounded-xl shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                    <div className="flex-shrink-0 w-20 h-20 p-4 rounded-full">
                        <ServiceIcon />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">24/7 Customer Support</h2>
                        <p className="mt-2 text-lg text-teal-50 max-w-3xl">
                            Our customer-centric approach provides 24/7 support, ensuring seamless user experiences and client satisfaction.
                        </p>
                    </div>
                </div>
            </ScrollAnimator>
        </section>

        <ClientLogos />
        
        {/* Escalation Matrix Section */}
        <section>
            <ScrollAnimator>
                <h2 className="text-3xl font-bold text-center text-primary-dark mb-4">
                Escalation Matrix
                </h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                For unresolved issues, please follow the escalation path below to ensure your concerns are addressed promptly.
                </p>
            </ScrollAnimator>
            <ScrollAnimator delay={200}>
                <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-200">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                Level
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                Contact Person
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                Phone Number
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {ESCALATION_MATRIX.map((item) => (
                            <tr key={item.level} className="hover:bg-gray-100/50 transition-colors duration-200">
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <span className={`px-3 py-1.5 text-xs font-bold leading-none rounded-full ${getLevelBadgeClass(item.level)}`}>
                                        {item.level}
                                    </span>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 mr-3 text-gray-400">
                                            <UserIcon />
                                        </div>
                                        <span className="font-medium text-gray-800">{item.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <a href={`tel:+91${item.phone}`} className="inline-flex items-center group">
                                        <div className="w-6 h-6 mr-3 text-gray-400 group-hover:text-accent-orange transition-colors">
                                            <PhoneIcon />
                                        </div>
                                        <span className="font-semibold text-accent-orange group-hover:underline">
                                            +91 {item.phone}
                                        </span>
                                    </a>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </ScrollAnimator>
        </section>

      </main>
    </div>
  );
};

export default ContactPage;