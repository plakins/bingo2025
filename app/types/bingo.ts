export type BingoElement = {
  text: string | null;
  checked: boolean;
};

export type Win = {
  type: 'row' | 'col' | 'left-diagonal' | 'right-diagonal';
  index?: number;
};
