import styles from "../ui/text.module.css";

type ImportProps = {
  buttonKey: string;
};

// ボタンの中身（表示）だけを担当します。
export function Import(_props: ImportProps) {
  return <div className={styles.text}>インポート</div>;
}
