import type { CSSProperties, ReactNode } from "react";
import styles from "./ZoneFrame.module.css";

type zoneFrameProps = {
  // 枠の中心座標
  centerX: CSSProperties["left"];
  centerY: CSSProperties["top"];

  // 枠のサイズ
  width: CSSProperties["width"];
  height: CSSProperties["height"];

  // ラベル
  title?: string;

  // 枠線
  variant?: "dashed" | "solid";

  // 操作不可（モーダル中など）
  disabled?: boolean;

  // 重なり順
  zIndex?: number;

  // 中身
  children?: ReactNode;
};

// 領域の共通枠です。
// centerX/centerY（中心）を left/top（左上）へ変換します。
export function ZoneFrame({
  centerX,
  centerY,
  width,
  height,
  title,
  variant = "dashed",
  disabled = false,
  zIndex,
  children,
}: zoneFrameProps) {
  const style: CSSProperties = {
    left: `calc(${centerX} - (${width} / 2))`,
    top: `calc(${centerY} - (${height} / 2))`,
    width,
    height,
    zIndex,
  };

  const className = [
    styles.frame,
    styles[variant],
    disabled ? styles.disabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} style={style}>
      {title ? <div className={styles.title}>{title}</div> : null}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
