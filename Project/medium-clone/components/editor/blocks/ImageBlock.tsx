import React from 'react';

export interface ImageBlockProps {
  children?: React.ReactNode;
}

export default function ImageBlock({ children }: ImageBlockProps) {
  return (
    <div className="p-2 border border-dashed border-gray-300 rounded">
      <h3>ImageBlock Component</h3>
      {children}
    </div>
  );
}