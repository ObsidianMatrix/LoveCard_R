import styles from "../ui/text.module.css";

type BackProps = {
  buttonKey: string;
};

// ボタンの中身（表示）だけを担当します。
export function Back(_props: BackProps) {
  return <div className={styles.text}>一手戻る</div>;
}
