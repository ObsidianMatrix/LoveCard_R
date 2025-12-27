import type { CSSProperties } from "react";

type SuccessLiveProps = {
  // 将来 cards: Card[] を追加予定

    zoneKey: string;
};

export function SuccessLive(_props: SuccessLiveProps) {
  const textStyle: CSSProperties = {
    color: "#555",
    textAlign: "center",
    lineHeight: 1.4,
    userSelect: "none",
  };

  return <div style={textStyle}>ライブ成功<br/>エリア</div>;
}

