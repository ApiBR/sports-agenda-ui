import React from 'react';

export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <p className="text-red-600 font-medium">{message}</p>
      <p className="text-gray-600 mt-2">Please try again later or contact support if the problem persists.</p>
    </div>
  </div>
);
