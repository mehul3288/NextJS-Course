import React from 'react';

export interface FlagTableProps {
  children?: React.ReactNode;
}

export default function FlagTable({ children }: FlagTableProps) {
  return (
    <div className="p-2 border border-dashed border-gray-300 rounded">
      <h3>FlagTable Component</h3>
      {children}
    </div>
  );
}