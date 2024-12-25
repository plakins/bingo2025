import { sampleSize } from 'lodash';

import { BINGO_ITEMS } from '@/constants';
import { BingoElement } from '@/types';

export const getRandomBingoItems = () => {
  const sampleItems = sampleSize(BINGO_ITEMS, 24);
  const items = [...sampleItems.slice(0, 12), null, ...sampleItems.slice(12, 24)];

  return items;
};

export const getRandomBingoElements = (): BingoElement[] => {
  const items = getRandomBingoItems();
  return items.map((item, index) => ({
    text: item,
    checked: index === 12,
  }));
};
