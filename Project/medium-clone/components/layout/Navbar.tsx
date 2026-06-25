import React from 'react';

export interface NavbarProps {
  children?: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <div className="p-2 border border-dashed border-gray-300 rounded">
      <h3>Navbar Component</h3>
      {children}
    </div>
  );
}