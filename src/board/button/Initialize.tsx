import styles from "../ui/text.module.css";

type InitializeProps = {
  buttonKey: string;
};

// ボタンの中身（表示）だけを担当します。
export function Initialize(_props: InitializeProps) {
  return <div className={styles.text}>初期化</div>;
}
