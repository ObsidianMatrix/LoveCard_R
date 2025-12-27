import type { CSSProperties, ReactNode } from "react";

type buttonFrameProps = {
  centerX: CSSProperties["left"];
  centerY: CSSProperties["top"];
  width: CSSProperties["width"];
  height: CSSProperties["height"];
  zIndex?: number;
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
};

// ボタンの「置き場所」と「クリック」を担当します（表示はchildren側）
export function ButtonFrame({
  centerX,
  centerY,
  width,
  height,
  zIndex,
  disabled = false,
  onClick,
  children,
}: buttonFrameProps) {
  const style: CSSProperties = {
    position: "absolute",
    left: `calc(${centerX} - (${width} / 2))`,
    top: `calc(${centerY} - (${height} / 2))`,
    width,
    height,
    zIndex,
    pointerEvents: disabled ? "none" : "auto",
  };

  const buttonStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    border: "1px solid #999",
    background: "rgba(255,255,255,0.9)",
    cursor: disabled ? "default" : "pointer",
  };

  return (
    <div style={style}>
      <button type="button" style={buttonStyle} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    </div>
  );
}
