import React from 'react';

export interface CommentSectionProps {
  children?: React.ReactNode;
}
function CommentIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  );
}

export function CommentButton() {
  return (
    <button className="flex items-center gap-1.5 text-[#5f5e5e] hover:text-[#006e05] transition-colors text-[14px] font-medium">
      <CommentIcon />
      <span>Comment</span>
    </button>
  );
}

export default function CommentSection({ children }: CommentSectionProps) {
  return (
    <div className="p-2 border border-dashed border-gray-300 rounded">
      <h3>CommentSection Component</h3>
      {children}
    </div>
  );
}