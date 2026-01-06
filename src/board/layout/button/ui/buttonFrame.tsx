// ファイル責務: ボタンの「配置」と「クリックイベント受け口」を担う枠コンポーネントを提供する。
// 見た目の中身は children に委譲し、位置計算とイベント無効化のみを扱う。
// クリック処理の実体は App で注入された onClick を受け取り、この枠から button 要素に渡す。
// ロジックや状態は持たずプレゼンテーションに徹する。

// React から CSSProperties 型と ReactNode 型をインポートする。
// CSSProperties は style オブジェクトの型付け、ReactNode は children の型として利用する。
import type { CSSProperties, ReactNode } from "react";

// ButtonFrame が受け取る props の型定義。
// 中心座標（centerX, centerY）、幅、高さ、z-index、無効化フラグ、クリックハンドラ、子要素を指定する。
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

// ButtonFrame コンポーネント本体。ボタンを絶対配置し、クリック可否を制御する。
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
  // 外側の div に適用するスタイル。
  // position:absolute で絶対配置し、centerX/centerY から左上座標を算出するために calc を用いる。
  // pointerEvents を disabled で切り替え、無効時にはマウスイベントを素通りさせる。
  // zIndex で重なり順を指定する。
  const style: CSSProperties = {
    position: "absolute",
    left: `calc(${centerX} - (${width} / 2))`,
    top: `calc(${centerY} - (${height} / 2))`,
    width,
    height,
    zIndex,
    pointerEvents: disabled ? "none" : "auto",
  };

  // 実際の <button> 要素に適用するスタイル。
  // 枠いっぱいに広げ、角丸・枠線・景を設定する。disabled に応じてカーソル形状を切り替える。
  const buttonStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    border: "1px solid #999",
    background: "rgba(255,255,255,0.9)",
    cursor: disabled ? "default" : "pointer",
  };

  // JSX を返す。外側 div に位置スタイルを適用し、その中に button 要素を配置する。
  // button の onClick は props から受け取った関数をそのまま渡し、disabled も同様に反映する。
  // children にはボタンの表示内容が入る。
  return (
    <div style={style}>
      <button type="button" style={buttonStyle} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    </div>
  );
}
