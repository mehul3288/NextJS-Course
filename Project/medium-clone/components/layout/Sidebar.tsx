import React from 'react';

export interface SidebarProps {
  children?: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  return (
    <div className="p-2 border border-dashed border-gray-300 rounded">
      <h3>Sidebar Component</h3>
      {children}
    </div>
  );
}