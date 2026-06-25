import React from 'react';

export interface HeadingBlockProps {
  children?: React.ReactNode;
}

export default function HeadingBlock({ children }: HeadingBlockProps) {
  return (
    <div className="p-2 border border-dashed border-gray-300 rounded">
      <h3>HeadingBlock Component</h3>
      {children}
    </div>
  );
}