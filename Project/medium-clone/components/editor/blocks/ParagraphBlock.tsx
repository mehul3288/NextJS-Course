import React from 'react';

export interface ParagraphBlockProps {
  children?: React.ReactNode;
}

export default function ParagraphBlock({ children }: ParagraphBlockProps) {
  return (
    <div className="p-2 border border-dashed border-gray-300 rounded">
      <h3>ParagraphBlock Component</h3>
      {children}
    </div>
  );
}