import React from 'react';

export default function HighlightsPage({ params }: any) {
  const slug = params.slug;
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{slug} Highlights</h1>
      <p className="text-gray-600 mt-2">Welcome to the {slug} page.</p>
    </div>
  );
}