import React from 'react';
import { CLIENTS } from '../constants';
import ScrollAnimator from './ScrollAnimator';

const ClientLogos: React.FC = () => {
  // Function to apply specific styles to logos that need adjustment for visual balance
  const getLogoStyling = (clientName: string): string => {
    switch (clientName) {
      case 'ICICI Bank':
        // This very wide logo needs more vertical height to increase its visual weight.
        return 'max-h-20';
      case 'Union Bank of India':
        return 'max-h-20';
      case 'IndusInd Bank':
        // This logo is very wide, so a smaller max-height prevents it from shrinking too much vertically.
        return 'max-h-14';
      case 'Sundaram Finance':
        // This logo has excessive vertical whitespace. By setting a large explicit height,
        // we force the `object-contain` property to scale the visible logo content up.
        // The parent `div` with a fixed height and `items-center` will then center and
        // effectively crop the excess whitespace, making the logo appear balanced.
        return 'h-40';
      case 'Bijay Finance':
        // This logo is visually heavy and benefits from being slightly smaller.
        return 'max-h-16';
      case 'Muthoot Money':
      case 'Sakthi Finance':
        // These logos are a bit tall or bold, so a slightly smaller size balances them.
        return 'max-h-20';
      case 'Veritas':
        // This logo appeared too large, so its size has been reduced for better balance.
        return 'max-h-6';
      case 'The Oriental Insurance Company':
        // This is a wide logo, reduced size for better balance.
        return 'max-h-10';
      default:
        // Default size for well-proportioned logos.
        return 'max-h-24 max-w-[180px]';
    }
  };

  return (
    <section className="mt-24">
        <ScrollAnimator>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary-dark mb-4">
            Our Valued Clients
            </h2>
        </ScrollAnimator>
        <ScrollAnimator delay={150}>
            <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            We are trusted by leading financial institutions and insurance providers.
            </p>
        </ScrollAnimator>
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4">
        {CLIENTS.map((client, index) => (
            <ScrollAnimator
                key={client.name}
                delay={index * 100}
            >
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-200 flex justify-center items-center h-28 w-56 group overflow-hidden">
                    {client.logoUrl ? (
                        <img 
                            src={client.logoUrl} 
                            alt={`${client.name} logo`}
                            className={`${getLogoStyling(client.name)} w-auto object-contain transition-all duration-300`}
                        />
                    ) : (
                        <span className="text-xl font-bold text-accent-orange whitespace-nowrap text-center">
                            {client.name}
                        </span>
                    )}
                </div>
            </ScrollAnimator>
        ))}
        </div>
    </section>
  );
};

export default ClientLogos;