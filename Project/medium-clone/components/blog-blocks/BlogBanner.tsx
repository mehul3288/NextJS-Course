import React from 'react';

export interface BlogBannerProps {
  children?: React.ReactNode;
}

export default function BlogBanner({ children }: BlogBannerProps) {
  return (
    <div className="p-2 border border-dashed border-gray-300 rounded">
      <h3>BlogBanner Component</h3>
      {children}
    </div>
  );
}