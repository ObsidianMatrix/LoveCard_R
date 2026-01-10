import type { ReactNode } from "react";
import styles from "./stage.module.css";

type StageProps = {
  children: ReactNode;
};

// 画面の土台です。
// ZoneFrame の absolute 配置はこの Stage を基準にします。
export function Stage({ children }: StageProps) {
  return <div className={styles.stage}>{children}</div>;
}
