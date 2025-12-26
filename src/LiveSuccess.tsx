import type { CSSProperties } from "react";

type LiveSuccessProps = {
  // 将来 cards: Card[] を追加予定
};

export function LiveSuccess(_props: LiveSuccessProps) {
  const textStyle: CSSProperties = {
    color: "#555",
    textAlign: "center",
    lineHeight: 1.4,
    userSelect: "none",
  };

  return <div style={textStyle}>ライブ成功エリア1</div>;
}

