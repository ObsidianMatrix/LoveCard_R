import type { CSSProperties, ReactNode } from "react";

type LabelFrameProps = {
  centerX: CSSProperties["left"];
  centerY: CSSProperties["top"];
  width: CSSProperties["width"];
  height: CSSProperties["height"];
  zIndex?: number;
  children?: ReactNode;
};

// ラベルの「置き場所」だけを担当します（クリックなし）
export function LabelFrame({ centerX, centerY, width, height, zIndex, children }: LabelFrameProps) {
  const style: CSSProperties = {
    position: "absolute",
    left: `calc(${centerX} - (${width} / 2))`,
    top: `calc(${centerY} - (${height} / 2))`,
    width,
    height,
    zIndex,
    pointerEvents: "none", // ★操作させない
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return <div style={style}>{children}</div>;
}
