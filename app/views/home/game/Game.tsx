'use client';

import { useEffect, useRef } from 'react';

import { Info, RefreshCcw, X } from 'lucide-react';

import putinSrc from '@/assets/putin.png';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
          <div className="pyro fixed left-0 right-0 top-[200px] z-10">
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
        <div className="flex flex-1 flex-col items-center gap-4">
          <Button variant="outline" onClick={handleRegenerate}>
            <RefreshCcw />
            <span>Другая карточка</span>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="h-6">
                <Info />
                <span>Как играть</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-dvh max-w-[600px] overflow-auto">
              <DialogHeader>
                <DialogTitle>Правила игры</DialogTitle>
              </DialogHeader>
              <blockquote className="mt-6 border-l-2 pl-6 italic">
                <p>
                  Как известно, Владимир Владимирович бесконечен, а вот слова в русском языке — нет.
                  Из-за этого в своих речах ему время от времени приходится повторять одни и те же
                  слова и фразы. Новогодняя речь не исключение.
                </p>
              </blockquote>
              <p className="border-b pb-2">
                Меня хватило только на написание этой подводки, а дальше мне стало лень. Поэтому я
                попросил ChatGPT закончить описание и правила за меня. Передаю слово ему!
              </p>
              <h2 className="text-lg font-bold">BINGO 2025: Новогоднее Обращение</h2>
              <p>
                Добро пожаловать в захватывающую и веселую игру{' '}
                <span className="font-semibold italic">BINGO 2025</span>, где новогоднее обращение
                становится не просто тёплым поздравлением, но и увлекательной игрой!
              </p>
              <h3 className="text-lg font-semibold">Как играть:</h3>
              <ul className="list-decimal pl-6">
                <li className="pb-2">
                  <span className="font-semibold">Подготовка:</span> Перед началом новогоднего
                  обращения Владимира Путина выберите одну из карточек Бинго, на которых записаны
                  фразы и слова, часто звучащие в его речах. Это могут быть как привычные «Дорогие
                  друзья» и «Процветание», так и многозначительные «Единство» и «Скрепы».
                </li>
                <li className="pb-2">
                  <span className="font-semibold">Начало игры:</span> Устройтесь поудобнее с
                  телефоном в руках и карточкой Бинго на экране.
                </li>
                <li className="pb-2">
                  <span className="font-semibold">Играем:</span> Во время трансляции внимательно
                  слушайте обращение. Когда услышите фразу или слово с вашей карточки, нажмите на
                  ячейку, чтобы отметить её.{' '}
                  <span className="font-semibold">
                    Засчитываются фразы в разных падежах, числах и с изменённым порядком слов, если
                    смысл остается тот же. Важно играть честно: не натягивайте сову на глобус и не
                    додумывайте ничего за нашего бессменного лидера.
                  </span>
                </li>
                <li className="pb-2">
                  <span className="font-semibold">Выигрываем:</span> Побеждает тот, кто первым
                  заполнит всю горизонталь, вертикаль или диагональ! Когда это произойдёт, не
                  забудьте крикнуть «БИНГО!» для полного праздничного эффекта.
                </li>
              </ul>
              <p>
                Играйте весело, отмечайте внимательно и пусть новогоднее обращение принесет радость
                и удачу в новом году!
              </p>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Все понятно!
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
    </main>
  );
};
