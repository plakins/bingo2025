import { BingoElement } from '@/types';

import { Win } from './types';

export function adjustFontSize(container: HTMLDivElement, textElement: HTMLDivElement) {
  let fontSize = 12;
  textElement.style.fontSize = fontSize + 'px';

  const computedStyle = getComputedStyle(container);
  let containerHeight = container.clientHeight;
  let containerWidth = container.clientWidth;
  containerHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
  containerWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);

  while (
    (textElement.scrollWidth > containerWidth || textElement.scrollHeight > containerHeight) &&
    fontSize > 8
  ) {
    fontSize -= 0.25;
    textElement.style.fontSize = fontSize + 'px';
  }

  textElement.style.fontSize = fontSize + 'px';
}

export const checkWin = (items: BingoElement[]): Win | null => {
  let checkedLeftDiagonal = 0;
  let checkedRightDiagonal = 0;
  for (let i = 0; i < 5; i++) {
    let checkedRows = 0;
    let checkedCols = 0;
    for (let j = 0; j < 5; j++) {
      if (items[i * 5 + j].checked) {
        checkedRows += 1;
      }
      if (items[j * 5 + i].checked) {
        checkedCols += 1;
      }
    }

    if (checkedRows === 5) {
      return {
        type: 'row',
        index: i,
      };
    }

    if (checkedCols === 5) {
      return {
        type: 'col',
        index: i,
      };
    }

    if (items[i * 5 + i].checked) {
      checkedLeftDiagonal += 1;
    }
    if (items[i * 5 + 4 - i].checked) {
      checkedRightDiagonal += 1;
    }
  }

  if (checkedLeftDiagonal === 5) {
    return {
      type: 'left-diagonal',
    };
  }

  if (checkedRightDiagonal === 5) {
    return {
      type: 'right-diagonal',
    };
  }

  return null;
};
