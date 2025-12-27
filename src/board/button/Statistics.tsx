import styles from "../ui/text.module.css";

type StatisticsProps = {
  buttonKey: string;
};

// ボタンの中身（表示）だけを担当します。
export function Statistics(_props: StatisticsProps) {
  return <div className={styles.text}>統計情報</div>;
}
