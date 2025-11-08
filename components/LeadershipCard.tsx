import React, { useState } from 'react';

interface LeadershipMember {
    name: string;
    title: string;
    bio: string;
    imageUrl: string;
}

const TRUNCATE_LENGTH = 150; // Truncate after 150 characters

const LeadershipCard: React.FC<{ member: LeadershipMember }> = ({ member }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const needsTruncation = member.bio.length > TRUNCATE_LENGTH;

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 text-center group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full flex flex-col">
            <img
                src={member.imageUrl}
                alt={`Photo of ${member.name}`}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-200 group-hover:border-accent-orange transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
            />
            <h3 className="text-xl font-bold text-primary-dark">{member.name}</h3>
            <p className="text-accent-orange font-semibold mb-2">{member.title}</p>
            
            <div
                className={`transition-all duration-700 ease-in-out overflow-hidden text-left ${isExpanded ? 'max-h-96' : 'max-h-24'}`}
            >
                <p className="text-sm text-gray-500">
                    {needsTruncation && !isExpanded 
                        ? `${member.bio.substring(0, TRUNCATE_LENGTH)}...` 
                        : member.bio
                    }
                </p>
            </div>
            
            {needsTruncation && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-3 text-sm font-bold text-accent-orange hover:underline focus:outline-none self-start flex items-center"
                    aria-expanded={isExpanded}
                >
                    {isExpanded ? 'Read Less' : 'Read More'}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ml-1 transition-transform duration-300 ease-in-out ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default LeadershipCard;