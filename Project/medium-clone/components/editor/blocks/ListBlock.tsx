import React from 'react';

export interface ListBlockProps {
  children?: React.ReactNode;
}

export default function ListBlock({ children }: ListBlockProps) {
  return (
    <div className="p-2 border border-dashed border-gray-300 rounded">
      <h3>ListBlock Component</h3>
      {children}
    </div>
  );
}