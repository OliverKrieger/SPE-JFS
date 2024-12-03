// components/Alert.tsx
import React from 'react';

interface AlertProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  const alertStyles: Record<string, string> = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  };

  return (
    <div className={`${alertStyles[type]} text-white p-4 rounded-md mb-2 animate-slideInRight`}>
      {message}
    </div>
  );
};

export default Alert;
