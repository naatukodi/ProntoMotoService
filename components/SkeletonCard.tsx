import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg animate-pulse h-full">
      <div className="w-16 h-16 mb-6 rounded-xl bg-gray-300"></div>
      <div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;