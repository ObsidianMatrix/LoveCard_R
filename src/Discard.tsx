import styles from "./ZoneText.module.css";

type DiscardProps = {
  // 将来 cards: Card[] を追加予定
};

// 控室領域の中身だけを担当します。
export function Discard(_props: DiscardProps) {
  return <div className={styles.text}>控室</div>;
}
