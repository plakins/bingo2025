import { useEffect, useState } from 'react';

import putinSrc from '@/assets/putin.png';
import { cn } from '@/lib/utils';

export const Header = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 1000);
  }, []);

  return (
    <header
      className={cn(
        'flex w-full items-center justify-center overflow-hidden bg-gradient-to-b from-blue-600 to-purple-600 text-white',
        'absolute top-0 z-20 duration-300',
        mounted ? 'h-[120px] rounded-b-[100%]' : 'h-dvh'
      )}
    >
      <div className="relative w-full max-w-[500px] px-2 py-4">
        <div className="rotate-30 absolute left-0 top-0 text-[100px]">🎄</div>
        <div className="absolute bottom-0 right-0 w-[120px] -rotate-[30deg]">
          <img src={putinSrc} alt="Putin" />
        </div>
        <h1 className="relative z-10 text-center text-3xl font-semibold">
          <span className="bg-clip-text font-bold italic">🎉BINGO🎉</span>
          <br />
          <span className="text-5xl font-black">2025</span>
        </h1>
      </div>
    </header>
  );
};
