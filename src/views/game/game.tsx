import { useEffect, useRef } from 'react';

import { RefreshCcw, X } from 'lucide-react';

import putinSrc from '@/assets/putin.png';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useGame } from './use-game';
import { adjustFontSize } from './utils';

import './pyro.scss';
import styles from './styles.module.css';

export const Game = () => {
  const { active, win, winIndexes, items, handleItemClick, handleStop, handleRegenerate, score } =
    useGame();

  const blockRefs = useRef<{ [key: number]: HTMLDivElement }>({});
  const textRefs = useRef<{ [key: number]: HTMLDivElement }>({});

  useEffect(() => {
    const listener = () => {
      const length = Object.keys(blockRefs.current).length;
      for (let i = 0; i < length; i++) {
        if (i === 12) {
          continue;
        }
        if (textRefs.current[i] && blockRefs.current[i]) {
          adjustFontSize(blockRefs.current[i], textRefs.current[i]);
        }
      }
    };
    listener();
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [items]);

  return (
    <main className="mt-[120px] flex w-full max-w-[500px] flex-1 flex-col gap-3 pt-4">
      <div className="flex flex-col items-center px-2">
        {!!win && (
          <div className="pyro z-10 self-start">
            <div className="before"></div>
            <div className="after"></div>
          </div>
        )}
        <div className="vie-purple-600 shadow-ms grid w-full grid-cols-5 overflow-hidden rounded-xl border bg-gradient-to-r from-blue-600 to-purple-600 shadow">
          {items.map((item, i) => (
            <div
              key={item.text || i}
              ref={(el) => {
                if (el) {
                  blockRefs.current[i] = el;
                }
              }}
              role="button"
              tabIndex={0}
              onClick={() => handleItemClick(i)}
              aria-disabled={!active}
              className={cn(
                'relative flex aspect-square select-none flex-col items-center justify-center overflow-hidden px-1 py-3 duration-300',
                {
                  'border-r': i % 5 !== 4,
                  'border-b': i < 20,
                  'overflow-visible': i === 12,
                  'z-10': i === 12,
                },
                active && !win && 'cursor-pointer',
                item.checked
                  ? 'border-transparent bg-transparent text-white'
                  : 'bg-[hsl(var(--background))]',
                winIndexes?.includes(i) && 'bg-yellow-500'
              )}
            >
              {i !== 12 ? (
                <div
                  ref={(el) => {
                    if (el) {
                      textRefs.current[i] = el;
                    }
                  }}
                  className={cn(
                    'text flex-col items-center justify-center hyphens-auto text-balance text-center font-semibold',
                    item.checked && styles.checked
                  )}
                >
                  {i !== 12 ? (
                    item.text
                  ) : (
                    <img
                      src={putinSrc}
                      alt="Putin"
                      className={cn('t-0 l-0 absolute h-full w-full', active && styles.putinActive)}
                    />
                  )}
                </div>
              ) : (
                <img
                  src={putinSrc}
                  alt="Putin"
                  className={cn(
                    't-0 l-0 absolute z-10 h-full w-full',
                    active && styles.putinActive
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {!win && active && (
        <div className="flex flex-1 flex-col items-center gap-4">
          <span className="text-lg font-semibold">
            Счет:{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-black italic text-transparent">
              {score}
            </span>
          </span>
          <Button size="icon" variant="outline" onClick={handleStop}>
            <X />
          </Button>
        </div>
      )}
      {!win && !active && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3">
          <Button variant="outline" onClick={handleRegenerate}>
            <RefreshCcw />
            <span>Другая карточка</span>
          </Button>
        </div>
      )}
      {!!win && (
        <div className="flex flex-1 flex-col items-center gap-2">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-black italic text-transparent">
            БИНГО!
          </span>
          <Button size="icon" variant="outline" onClick={handleStop}>
            <X />
          </Button>
        </div>
      )}
      <footer className="flex items-center justify-center px-4 pb-4">
        <div className="text-sm leading-loose text-muted-foreground">
          Разработано{' '}
          <a href="https://plakins.github.io/" className="font-medium underline underline-offset-4">
            plakins
          </a>
        </div>
      </footer>
    </main>
  );
};
