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
      
      window.location.href = mailtoLink;

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTouched({});
      setErrors({});
      setTimeout(() => setIsSubmitted(false), 5000);
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
      <header className="bg-primary-dark py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold animate-fadeInDown bg-gradient-to-r from-accent-orange to-orange-400 bg-clip-text text-transparent">Contact Us</h1>
          <p className="mt-2 text-lg text-gray-300 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>We're here to help. Reach out to us anytime.</p>
        </div>
      </header>

      <main className="py-16 container mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Contact Info Cards */}
        <section>
            <ScrollAnimator>
                <h2 className="text-3xl font-bold text-center text-primary-dark mb-4">Get In Touch</h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Reach out for enquiries, and to explore the endless possibilities of technological transformation, speed and standards.
                </p>
            </ScrollAnimator>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {CONTACT_DETAILS.map((detail, index) => (
                    <ScrollAnimator key={index} delay={index * 150}>
                        <div 
                            className="bg-white p-8 rounded-lg shadow-lg h-full transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl group"
                        >
                            <div className="flex flex-col items-center h-full">
                                <div className="w-16 h-16 p-3 flex items-center justify-center bg-accent-orange/10 text-accent-orange rounded-full mb-4 transition-all duration-300 group-hover:bg-accent-orange group-hover:text-white group-hover:scale-110 group-hover:rotate-12">
                                    <div className="w-10 h-10 transition-transform duration-300 group-hover:scale-125">
                                        {detail.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold my-4 text-primary-dark">{detail.title}</h3>
                                <div className="space-y-1">
                                    {detail.lines.map((line, lineIndex) => (
                                        line.href ? (
                                            <a key={lineIndex} href={line.href} className="block text-gray-600 hover:text-accent-orange hover:underline transition-colors">{line.text}</a>
                                        ) : (
                                            <p key={lineIndex} className="text-gray-600">{line.text}</p>
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
                  <div className="text-center p-4" role="alert">
                    <AnimatedCheckmark />
                    <p className="font-bold text-xl text-green-800">Message Sent!</p>
                    <p className="text-gray-600 mt-2">Your email client should now be open. Please send the message to complete your request.</p>
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
                    <button type="submit" className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-lg text-base font-medium rounded-lg text-white bg-accent-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-orange transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-accent-orange/40 animate-pulsate">
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
                <div className="bg-gradient-to-r from-accent-orange to-orange-500 text-white rounded-xl shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                    <div className="flex-shrink-0 w-20 h-20 p-4 bg-white/20 rounded-full">
                        <ServiceIcon />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">24/7 Customer Support</h2>
                        <p className="mt-2 text-lg text-orange-100 max-w-3xl">
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