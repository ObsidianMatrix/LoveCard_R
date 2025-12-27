import styles from "../ui/text.module.css";

type PhaseProps = {
  buttonKey: string;
};

// ボタンの中身（表示）だけを担当します。
export function Phase(_props: PhaseProps) {
  return <div className={styles.text}>フェーズ進行</div>;
}
