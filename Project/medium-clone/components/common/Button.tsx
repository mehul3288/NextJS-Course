import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export default function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded font-medium transition-colors ${
        variant === 'primary' 
          ? 'bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200' 
          : 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}