import React from 'react';

export interface BlogTableProps {
  children?: React.ReactNode;
}

export default function BlogTable({ children }: BlogTableProps) {
  return (
    <div className="p-2 border border-dashed border-gray-300 rounded">
      <h3>BlogTable Component</h3>
      {children}
    </div>
  );
}