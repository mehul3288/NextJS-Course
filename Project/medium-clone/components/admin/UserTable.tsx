import React from 'react';

export interface UserTableProps {
  children?: React.ReactNode;
}

export default function UserTable({ children }: UserTableProps) {
  return (
    <div className="p-2 border border-dashed border-gray-300 rounded">
      <h3>UserTable Component</h3>
      {children}
    </div>
  );
}