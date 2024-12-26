import { atomWithStorage } from 'jotai/utils';

import { BingoElement, Win } from '@/types/bingo';

export const bingoItemsStore = atomWithStorage<BingoElement[]>('items', [], undefined, {
  getOnInit: true,
});

export const activeStore = atomWithStorage('active', false, undefined, { getOnInit: true });
export const winStore = atomWithStorage<Win | null>('win', null, undefined, { getOnInit: true });
