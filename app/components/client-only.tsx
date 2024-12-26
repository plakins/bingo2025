import { JSX, PropsWithChildren, useEffect, useState } from 'react';

export function ClientOnly({ children }: PropsWithChildren<{ fallback?: JSX.Element }>) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return children;
}
