import React from 'react';

export interface BookmarkButtonProps {
  children?: React.ReactNode;
}

function BookmarkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
    </svg>
  );
}
export default function BookmarkButton({ children }: BookmarkButtonProps) {
  return (
    <button className="text-[#5f5e5e] hover:text-[#006e05] transition-colors">
      <BookmarkIcon />
    </button>
  );
}