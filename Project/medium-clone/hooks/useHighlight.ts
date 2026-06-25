import { useState } from 'react';

export function useHighlight() {
  const [selection, setSelection] = useState<string | null>(null);
  return { selection, setSelection };
}