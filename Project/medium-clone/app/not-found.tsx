import React from 'react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">Could not find requested resource</p>
    </div>
  );
}