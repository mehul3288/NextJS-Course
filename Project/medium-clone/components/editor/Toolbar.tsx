import React from 'react';

export interface ToolbarProps {
  children?: React.ReactNode;
}

export default function Toolbar({ children }: ToolbarProps) {
  return (
    <div className="p-2 border border-dashed border-gray-300 rounded">
      <h3>Toolbar Component</h3>
      {children}
    </div>
  );
}