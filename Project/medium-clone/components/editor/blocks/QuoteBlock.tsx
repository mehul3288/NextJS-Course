import React from 'react';

export interface QuoteBlockProps {
  children?: React.ReactNode;
}

export default function QuoteBlock({ children }: QuoteBlockProps) {
  return (
    <div className="p-2 border border-dashed border-gray-300 rounded">
      <h3>QuoteBlock Component</h3>
      {children}
    </div>
  );
}