// ファイル責務: ラベルを配置するための枠要素を提供し、位置・サイズ・重なり順だけを制御する。
// クリックイベントなどのインタラクションは持たず、
// 子要素に表示内容を委譲するプレゼンテーションコンポーネントとする。

// React から CSSProperties と ReactNode 型をインポートする。
// CSSProperties は style オブジェクトの型、ReactNode は children の許容型として使用する。
import type { CSSProperties, ReactNode } from "react";

// LabelFrame が受け取る props の型定義。中心座標（centerX, centerY）、幅、高さ、zIndex、子要素を指定する。
type LabelFrameProps = {
  centerX: CSSProperties["left"];
  centerY: CSSProperties["top"];
  width: CSSProperties["width"];
  height: CSSProperties["height"];
  zIndex?: number;
  children?: ReactNode;
};

// LabelFrame コンポーネント本体。配置だけを担当し、クリックなどは無効化する。
export function LabelFrame({ centerX, centerY, width, height, zIndex, children }: LabelFrameProps) {
  // style オブジェクトを CSSProperties 型として定義する。
  // position:absolute で絶対配置し、centerX/centerY と width/height から左上座標を算出する。
  // pointerEvents: "none" でマウスイベントを無効化し、下層のボタンなどの操作を阻害しない。
  // display:flex と alignItems/justifyContent で中央揃えにし、children を枠の中央に配置する。
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

  // div 要素を返し、style を適用した枠の中に children（ラベル内容）を配置する。
  return <div style={style}>{children}</div>;
}
