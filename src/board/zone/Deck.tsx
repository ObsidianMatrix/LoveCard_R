import styles from "../ui/text.module.css";

type DeckProps = {
  // 将来 cards: Card[] を追加予定

  zoneKey: string;
};

// デッキ領域の中身だけを担当します。
export function Deck(_props: DeckProps) {
  return <div className={styles.text}>デッキ置き場</div>;
}
