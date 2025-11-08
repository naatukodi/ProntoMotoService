import React from 'react';
import { CLIENTS } from '../constants';

const ClientTicker: React.FC = () => {
  // Duplicate the client list to create a seamless scrolling effect
  const repeatedClients = [...CLIENTS, ...CLIENTS];

  // Function to apply specific styles to logos that need adjustment
  const getLogoStyling = (clientName: string): { container: string; image: string } => {
    // Standardize container width for consistent spacing between logos.
    const containerWidth = 'w-48';
    const defaultStyling = { container: containerWidth, image: 'h-14' };

    switch (clientName) {
      case 'ICICI Bank':
        // This is a very wide logo with a lot of whitespace. To make it visible,
        // we dramatically increase its height. `object-contain` will scale up
        // the actual logo content to fit this height, making it larger, while
        // the parent container crops the unused vertical space.
        return { container: containerWidth, image: 'h-32' };
      case 'Union Bank of India':
        return { container: containerWidth, image: 'h-16' };
      case 'Sundaram Finance':
        // The source image for this logo contains significant vertical whitespace,
        // which makes it appear tiny when constrained to a standard height.
        // To counteract this, we dramatically increase the image's height.
        // The `object-contain` property will scale the visible logo content up,
        // while the parent container's fixed height and `items-center` will
        // center it, effectively cropping the excess whitespace.
        return { container: containerWidth, image: 'h-40' };
      case 'Muthoot Money':
        // This logo is tall but has whitespace, make it taller
        return { container: containerWidth, image: 'h-20' };
      case 'Bijay Finance':
        // This logo was appearing too large compared to others.
        return { container: containerWidth, image: 'h-12' };
      case 'Veritas':
        return { container: containerWidth, image: 'h-6' };
      case 'The Oriental Insurance Company':
        // This is a wide logo and needs a wider container. Reduced size for better balance.
        return { container: containerWidth, image: 'h-10' };
      default:
        return defaultStyling;
    }
  };

  return (
    <div className="bg-white py-8 border-b border-t border-gray-200 group">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-sm font-bold uppercase text-gray-500 tracking-widest mb-6">
          Trusted By Industry Leaders
        </h2>
        <div className="w-full overflow-hidden [mask-image:_linear_gradient(to_right,transparent_0,_black_5%,_black_95%,transparent_100%)]">
            <div className="flex w-fit animate-scroll group-hover:[animation-play-state:paused] whitespace-nowrap items-center gap-x-12">
            {repeatedClients.map((client, index) => {
                const styling = getLogoStyling(client.name);
                return (
                <div key={index} className={`flex-shrink-0 ${styling.container} h-24 flex items-center justify-center`}>
                    {client.logoUrl ? (
                        <img
                            src={client.logoUrl}
                            alt={`${client.name} logo`}
                            className={`${styling.image} w-auto object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
                        />
                    ) : (
                        <span className="text-3xl font-semibold text-gray-400 transition-all duration-300 group-hover:text-primary-dark">
                        {client.name}
                        </span>
                    )}
                </div>
                );
            })}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ClientTicker;