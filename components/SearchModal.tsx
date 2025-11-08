import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { VEHICLE_CATEGORIES } from '../constants';
import { CloseIcon } from './icons/MenuIcons';
import { SearchIcon } from './icons/FeatureIcons';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchableItems = VEHICLE_CATEGORIES.map(item => ({
  id: item.id,
  title: item.name,
  description: item.description,
  type: 'Vehicle Category',
  to: `/services#${item.id}`
}));

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof searchableItems>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setQuery('');
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
        window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const lowerCaseQuery = query.toLowerCase().trim();

    const exactMatch = searchableItems.find(item => item.title.toLowerCase() === lowerCaseQuery);
    if (exactMatch) {
      navigate(exactMatch.to);
      onClose();
      return;
    }

    const filtered = searchableItems.filter(item => 
      item.title.toLowerCase().includes(lowerCaseQuery) ||
      item.description.toLowerCase().includes(lowerCaseQuery)
    );
    setResults(filtered);
  }, [query, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center p-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-heading"
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-lg shadow-2xl flex flex-col h-fit max-h-[80vh] animate-fadeInUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center p-4 border-b border-gray-200">
          <div className="w-6 h-6 text-gray-400 mr-3 shrink-0">
            <SearchIcon />
          </div>
          <input
            id="search-heading"
            type="text"
            placeholder="Search for vehicle models..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-lg text-primary-dark placeholder-gray-500 focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="p-2 ml-2 text-gray-500 hover:text-gray-800" aria-label="Close search">
            <CloseIcon />
          </button>
        </div>
        
        {/* Results */}
        <div className="overflow-y-auto p-2">
          {query.trim() && results.length > 0 && (
            <ul className="divide-y divide-gray-100">
              {results.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.to} 
                    onClick={onClose}
                    className="block p-4 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <div className="font-bold text-primary-dark">{item.title}</div>
                    <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                    <span className="text-xs font-semibold uppercase text-accent-orange mt-1 inline-block">{item.type}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {query.trim() && results.length === 0 && (
            <div className="text-center p-12 text-gray-500">
              <p className="font-semibold">No results found for "{query}"</p>
              <p className="text-sm mt-2">Try searching for a different vehicle type.</p>
            </div>
          )}
           {!query.trim() && (
             <div className="text-center p-12 text-gray-500">
              <p className="font-semibold">Start typing to search</p>
              <p className="text-sm mt-2">Find vehicle types like "Four Wheeler" or "Farm Equipment".</p>
            </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;