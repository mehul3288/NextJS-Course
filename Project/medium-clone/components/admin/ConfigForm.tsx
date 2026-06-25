import React from 'react';

export interface ConfigFormProps {
  children?: React.ReactNode;
}

export default function ConfigForm({ children }: ConfigFormProps) {
  return (
    <div className="p-2 border border-dashed border-gray-300 rounded">
      <h3>ConfigForm Component</h3>
      {children}
    </div>
  );
}