import styles from "../ui/text.module.css";

type HandProps = {
  // 将来 cards: Card[] を追加予定

  zoneKey: string;
};

// 控室領域の中身だけを担当します。
export function Hand(_props: HandProps) {
  return <div className={styles.text}>手札</div>;
}
