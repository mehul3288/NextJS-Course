import React from 'react';

export interface FooterProps {
  children?: React.ReactNode;
}

export default function Footer({ children }: FooterProps) {
  return (
    <div className="p-2 border border-dashed border-gray-300 rounded">
      <h3>Footer Component</h3>
      {children}
    </div>
  );
}