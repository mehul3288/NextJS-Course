import React from 'react';

export interface LinkBlockProps {
  children?: React.ReactNode;
}

export default function LinkBlock({ children }: LinkBlockProps) {
  return (
    <div className="p-2 border border-dashed border-gray-300 rounded">
      <h3>LinkBlock Component</h3>
      {children}
    </div>
  );
}