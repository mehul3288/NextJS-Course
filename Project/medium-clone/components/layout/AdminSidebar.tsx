import React from 'react';

export interface AdminSidebarProps {
  children?: React.ReactNode;
}

export default function AdminSidebar({ children }: AdminSidebarProps) {
  return (
    <div className="p-2 border border-dashed border-gray-300 rounded">
      <h3>AdminSidebar Component</h3>
      {children}
    </div>
  );
}