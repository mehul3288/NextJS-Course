import React from 'react';

export interface UserArticlesProps {
  children?: React.ReactNode;
}

export default function UserArticles({ children }: UserArticlesProps) {
  return (
    <div className="p-2 border border-dashed border-gray-300 rounded">
      <h3>UserArticles Component</h3>
      {children}
    </div>
  );
}