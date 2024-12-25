import { useEffect, useMemo } from 'react';

import { useAtom } from 'jotai';

import { getRandomBingoElements } from '@/lib/bingo';
import { activeStore, bingoItemsStore } from '@/stores/bingo';

import { checkWin } from './utils';

export const useGame = () => {
  const [active, setActive] = useAtom(activeStore);

  const [items, setItems] = useAtom(bingoItemsStore);

  const handleRegenerate = () => {
    setItems(() => getRandomBingoElements());
  };

  const handleStop = () => {
    setActive(false);
    setItems((prev) => prev.map((item, i) => ({ ...item, checked: i === 12 })));
  };

  const handleItemClick = (i: number) => {
    if (i === 12) {
      return;
    }

    if (!active) {
      setActive(true);
    }

    const newItems = [...items];
    newItems[i] = { ...newItems[i], checked: !newItems[i].checked };

    setItems(newItems);
  };

  const win = useMemo(() => {
    if (items.length) {
      return checkWin(items);
    }
    return null;
  }, [items]);

  const winIndexes = useMemo(() => {
    if (!win) {
      return [];
    }
    if (win.type === 'row') {
      return Array.from({ length: 5 }, (_, i) => win.index! * 5 + i);
    }
    if (win.type === 'col') {
      return Array.from({ length: 5 }, (_, i) => i * 5 + win.index!);
    }
    if (win.type === 'left-diagonal') {
      return Array.from({ length: 5 }, (_, i) => i * 5 + i);
    }
    if (win.type === 'right-diagonal') {
      return Array.from({ length: 5 }, (_, i) => i * 5 + 4 - i);
    }
  }, [win]);

  const score = useMemo(
    () => items.reduce((acc, item) => acc + (item.checked ? 1 : 0), 0) - 1,
    [items]
  );

  useEffect(() => {
    if (!items.length) {
      setItems(getRandomBingoElements());
    }
  }, [items]);

  return {
    active,
    win,
    winIndexes,
    items,
    handleItemClick,
    handleRegenerate,
    handleStop,
    score,
  };
};
