import styles from "../ui/text.module.css";

type EnergyProps = {
  // 将来 cards: Card[] を追加予定

  zoneKey: string;
};

// 控室領域の中身だけを担当します。
export function Energy(_props: EnergyProps) {
  return <div className={styles.text}>エネルギーエリア</div>;
}
