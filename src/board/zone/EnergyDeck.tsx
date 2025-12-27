import styles from "../ui/text.module.css";

type EnergyDeckProps = {
  // 将来 cards: Card[] を追加予定

  zoneKey: string;
};

// エネルギーデッキ領域の中身だけを担当します。
export function EnergyDeck(_props: EnergyDeckProps) {
  return <div className={styles.text}>エネルギー<br />デッキ</div>;
}
