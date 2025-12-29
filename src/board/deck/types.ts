/**
 * デッキの中の「1枚1枚」を表す型
 * 例: { cardId: "PL!SP-bp1-004-R", nth: 3 } ＝ そのカードの3枚目
 */
export type DeckCardInstance = {
  cardId: string;
  nth: number;
};
