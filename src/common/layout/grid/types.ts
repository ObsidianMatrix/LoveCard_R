// ファイル責務: グリッド座標や向き、矩形定義など、レイアウト計算で共通に利用する型を集約する。
// ロジックは持たず、型エイリアスだけを提供することで他モジュール間の前提を揃える。

/**
 * グリッド上の1点を表す型。
 * row は上から下へ増加し、col は右から左へ増加するインデックス。盤面配置のアンカーポイントとして使用する。
 */
export type GridPoint = {
  // 行番号（0 が最上段）。値が大きいほど下方向のセルを指す。
  row: number;
  // 列番号（0 が最右列）。値が大きいほど左方向のセルを指す。
  col: number;
};

/**
 * 枠やカードの向きを表すリテラル型。
 * portrait は縦向き、landscape は横向きを示し、サイズ計算やレイアウト分岐の基準になる。
 */
export type Orientation = "portrait" | "landscape";

/**
 * ZoneFrame などに渡す矩形情報を表す型。
 * centerX/centerY は中心座標（CSS calc 式など文字列で表現）、width/height は幅と高さ。
 */
export type RectDef = {
  centerX: string;
  centerY: string;
  width: string;
  height: string;
};
