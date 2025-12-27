import styles from "../ui/text.module.css";

type PhaseProps = {
  labelKey: string;
  title: string;
};

// ラベルの中身（表示）だけを担当します。
export function Phase(props: PhaseProps) {
  return <div className={styles.text}>{props.title}</div>;
}
