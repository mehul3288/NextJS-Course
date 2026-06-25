import React from 'react';

export interface CodeBlockProps {
  children?: React.ReactNode;
}

export default function CodeBlock({ children }: CodeBlockProps) {
  return (
    <div className="p-2 border border-dashed border-gray-300 rounded">
      <h3>CodeBlock Component</h3>
      {children}
    </div>
  );
}