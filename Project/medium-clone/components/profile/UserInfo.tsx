import React from 'react';

export interface UserInfoProps {
  children?: React.ReactNode;
}

export default function UserInfo({ children }: UserInfoProps) {
  return (
    <div className="p-2 border border-dashed border-gray-300 rounded">
      <h3>UserInfo Component</h3>
      {children}
    </div>
  );
}