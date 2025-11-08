import React, { useState, FormEvent } from 'react';
import { GoogleGenAI, GenerateContentResponse, Type } from '@google/genai';
import { Link } from 'react-router-dom';
import { VEHICLE_CATEGORIES, VEHICLE_AGE_OPTIONS } from '../constants';
import { FourWheelerIcon, UserIcon, EnvelopeIcon, TechnologyIcon, PrecisionIcon, TrustedIcon } from './icons/FeatureIcons';
import ScrollAnimator from './ScrollAnimator';

interface ValuationResult {
    range: string;
    explanation: string;
}

const ValuationEstimator: React.FC = () => {
  const [formData, setFormData] = useState({
    vehicleType: '',
    vehicleAge: '',
    name: '',
    email: '',
  });
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.vehicleType || !formData.vehicleAge || !formData.name || !formData.email) {
      setError('Please fill out all fields.');
      return;
    }
    setError('');
    setIsLoading(true);
    setResult(null);

    try {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set.");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const prompt = `You are an expert vehicle valuator for the Indian market. Your task is to provide a non-binding, rough estimated valuation range and a brief, one-sentence explanation for the estimate.

        **Vehicle Information:**
        - Type: ${formData.vehicleType}
        - Age: ${formData.vehicleAge} years old

        **Instructions:**
        1.  Consider the broad range of models within the given type and age in India.
        2.  Assume an average condition for the vehicle.
        3.  Provide a realistic valuation range in Indian Rupees (₹).
        4.  Provide a concise, single-sentence explanation highlighting the primary factors influencing the valuation range for this category.
        5.  Return the response ONLY as a valid JSON object with the keys "range" and "explanation".

        Example response format:
        {
          "range": "₹50,000 - ₹65,000",
          "explanation": "The final value depends heavily on the specific make, model, and physical condition of the vehicle."
        }`;

      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              range: { type: Type.STRING },
              explanation: { type: Type.STRING },
            }
          }
        }
      });
      
      const jsonStr = response.text.trim();
      const parsedResult: ValuationResult = JSON.parse(jsonStr);
      setResult(parsedResult);
      setIsSubmitted(true);

    } catch (apiError) {
      console.error('Gemini API Error:', apiError);
      setError('Sorry, we couldn\'t calculate an estimate at this time. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({ vehicleType: '', vehicleAge: '', name: '', email: '' });
    setResult(null);
    setError('');
  };


  const Speedometer: React.FC<{ isLoading: boolean }> = ({ isLoading }) => (
    <div className="relative w-full max-w-xs mx-auto">
      <svg viewBox="0 0 200 120" className="w-full">
        {/* Background Arc */}
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" strokeWidth="20" className="stroke-gray-200" />
        {/* Gradient Arc */}
        <defs>
          <linearGradient id="speedoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="stop-green-400" />
            <stop offset="50%" className="stop-yellow-400" />
            <stop offset="100%" className="stop-red-500" />
          </linearGradient>
        </defs>
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#speedoGradient)" strokeWidth="20" strokeLinecap="round" />
        {/* Needle */}
        <g transform="translate(100, 100)">
          {/* This group rotates around its origin (0,0), which is the center of the hub */}
          <g className={`transition-transform duration-500 ease-out ${isLoading ? 'animate-sweepNeedle' : 'rotate-[-135deg]'}`}>
            <path
              d="M 0 0 L -70 0"
              strokeWidth="4"
              className="stroke-primary-dark"
              strokeLinecap="round"
            />
          </g>
          {/* Needle Hub (outside the rotating group) */}
          <circle cx="0" cy="0" r="8" className="fill-primary-dark" />
          <circle cx="0" cy="0" r="4" className="fill-accent-orange" />
        </g>
      </svg>
      <div className="absolute bottom-[-10px] w-full text-center">
        <span className="text-sm font-bold text-gray-500">VALUATION ESTIMATOR</span>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimator>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark">
              Instant Valuation Insights
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Get a free, AI-powered preliminary valuation for your vehicle in seconds.
            </p>
          </div>
        </ScrollAnimator>
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 grid md:grid-cols-2 gap-8 items-center">
          <ScrollAnimator animation="animate-slideInLeft" className="hidden md:block">
            <Speedometer isLoading={isLoading} />
          </ScrollAnimator>
          <ScrollAnimator animation="animate-slideInRight">
            <div className="relative overflow-hidden flex items-center">
                {/* Form View */}
                <div className={`transition-all duration-500 ease-in-out w-full ${isSubmitted ? 'opacity-0 -translate-x-full absolute pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                            <div className="relative mt-1">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <div className="w-5 h-5"><FourWheelerIcon /></div>
                                </div>
                                <select id="vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleInputChange} required className="block w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-primary-dark focus:border-accent-orange focus:outline-none focus:ring-accent-orange sm:text-sm">
                                    <option value="" disabled>Select a type</option>
                                    {VEHICLE_CATEGORIES.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="vehicleAge" className="block text-sm font-medium text-gray-700">Vehicle Age</label>
                             <select id="vehicleAge" name="vehicleAge" value={formData.vehicleAge} onChange={handleInputChange} required className="mt-1 block w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 px-4 text-primary-dark focus:border-accent-orange focus:outline-none focus:ring-accent-orange sm:text-sm">
                                <option value="" disabled>Select age range</option>
                                {/* Fix: Use opt.value for the option value to send a clean value to the API. */}
                                {VEHICLE_AGE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                             <div className="relative mt-1">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <div className="w-5 h-5"><UserIcon /></div>
                                </div>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required placeholder="John Doe" className="block w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-primary-dark focus:border-accent-orange focus:outline-none focus:ring-accent-orange sm:text-sm" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
                             <div className="relative mt-1">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <div className="w-5 h-5"><EnvelopeIcon /></div>
                                </div>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="you@example.com" className="block w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-primary-dark focus:border-accent-orange focus:outline-none focus:ring-accent-orange sm:text-sm" />
                            </div>
                        </div>
                        {error && <p className="text-sm font-semibold text-red-500">{error}</p>}
                        <button type="submit" disabled={isLoading} className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-lg text-base font-medium rounded-lg text-white bg-accent-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-orange transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed">
                          {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Calculating...
                            </>
                          ) : "Calculate My Estimate"}
                        </button>
                    </form>
                </div>

                {/* Results View */}
                <div className={`transition-all duration-500 ease-in-out w-full ${isSubmitted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute pointer-events-none'}`}>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">AI Estimated Valuation</p>
                        <p className="text-4xl font-extrabold text-accent-orange my-2">{result?.range || '...'}</p>
                    </div>
                    
                    <div className="mt-4 p-4 border-l-4 border-accent-orange/50 bg-accent-orange/5">
                         <div className="flex">
                            <div className="flex-shrink-0">
                                <div className="w-5 h-5 text-accent-orange/80"><TechnologyIcon /></div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-700">
                                    <span className="font-bold">AI Insight:</span> {result?.explanation || '...'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 text-left">
                        <h4 className="font-bold text-primary-dark">What This Means:</h4>
                        <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-gray-600">
                            <li>This is a data-driven starting point, not a final offer.</li>
                            <li>Market conditions and vehicle specifics cause variations.</li>
                            <li>A physical inspection ensures a precise, certified value.</li>
                        </ul>
                    </div>

                    <div className="mt-6 space-y-3">
                        <Link to="/contact" className="w-full text-center inline-flex justify-center items-center bg-accent-orange text-white font-bold py-3 px-5 rounded-lg text-base uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-accent-orange/30">
                            Request a Certified Inspection
                        </Link>
                        <button onClick={handleReset} className="w-full text-sm font-semibold text-gray-600 hover:text-primary-dark transition-colors">
                            Calculate Another &rarr;
                        </button>
                    </div>
                </div>

            </div>
          </ScrollAnimator>
        </div>
      </div>
    </section>
  );
};

export default ValuationEstimator;
