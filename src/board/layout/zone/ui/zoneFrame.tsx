// ファイル責務: ゾーン領域の共通枠を描画し、中心座標を左上基準へ変換する。
// 枠線のスタイルや重なり順、無効化状態を管理し、内部の content を包む。
// 状態やビジネスロジックは持たず、レイアウトと見た目の適用に専念する。

// React から CSSProperties と ReactNode 型をインポートする。
// CSSProperties は style オブジェクトの型、ReactNode は children に許可される要素型。
import type { CSSProperties, ReactNode } from "react";
// 枠のスタイル定義を含む CSS Modules をインポートする。
// zoneFrame.module.css のクラス名を styles オブジェクト経由で参照する。
import styles from "./zoneFrame.module.css";

// ZoneFrame が受け取る props の型定義。
// 中心座標、サイズ、タイトル、枠線スタイル、無効化フラグ、重なり順、子要素を指定する。
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
  // スタイル計算。中心座標を基に calc で左上座標を求め、幅・高さ・zIndex を設定する。
  const style: CSSProperties = {
    left: `calc(${centerX} - (${width} / 2))`,
    top: `calc(${centerY} - (${height} / 2))`,
    width,
    height,
    zIndex,
  };

  // 適用するクラス名を組み立てる。styles.frame（基本枠）と styles[variant]（枠線スタイル）、
  // disabled 時は styles.disabled を加え、filter(Boolean) で空文字を除去して join する。
  const className = [
    styles.frame,
    styles[variant],
    disabled ? styles.disabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  // JSX を返す。外側の div に計算済みの className と style を適用し、タイトルがあれば表示、
  // content 領域に children を配置する。
  return (
    <div className={className} style={style}>
      {title ? <div className={styles.title}>{title}</div> : null}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
