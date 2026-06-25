import React from 'react';

export interface DraftListProps {
  children?: React.ReactNode;
}

export default function DraftList({ children }: DraftListProps) {
  return (
    <div className="p-2 border border-dashed border-gray-300 rounded">
      <h3>DraftList Component</h3>
      {children}
    </div>
  );
}