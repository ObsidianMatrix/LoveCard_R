// 通常のカード
export type Card = {
  id: number;
};

// 解決待機用カード
export type PendingCard = Card & {
  originalIndex: number;
};
