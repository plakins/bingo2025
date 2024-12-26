import { JSX, PropsWithChildren, useEffect, useState } from 'react';

export function ClientOnly({ children, fallback }: PropsWithChildren<{ fallback?: JSX.Element }>) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return fallback;
  }

  return children;
}
