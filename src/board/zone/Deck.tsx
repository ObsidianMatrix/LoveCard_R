import styles from "../ui/text.module.css";
import type { Card } from "../../board/state/GameState";

type DeckProps = {
  // GameState から渡されるデッキのカード一覧
  cards: Card[];
};

// デッキ領域の中身だけを担当します。
export function Deck(props: DeckProps) {
  const { cards } = props;

  return (
    <div className={styles.text}>
      <div>デッキ置き場</div>

      {/* 枚数表示（GameStateと常に一致） */}
      <div>枚数: {cards.length}</div>
    </div>
  );
}
