// ファイル責務: 盤面を rows×cols のグリッドとして扱うための座標計算式を一元化し、
// 中心座標やステップ幅を提供する。
// レイアウト計算が必要な各所（ゾーン、ボタン、ラベル）で同じ座標系を共有するため、
// この関数で基準値をまとめて生成する。

// グリッドの行数と列数を受け取るための型定義。rows/cols を指定してレイアウトの分割数を決定する。
export type GridSpec = {
  rows: number;
  cols: number;
};

/**
 * 中心点の計算をまとめたもの
 *
 * 右上を(0,0)として扱うルール:
 * - row は 上→下 に増える（0,1,2,...）
 * - col は 右→左 に増える（0が一番右）
 *
 * 式:
 * centerY(row) = (marginY) + (unitY/2) + (marginY+unitY)×row
 * centerX(col) = 100% - ((marginX) + (unitX/2) + (marginX+unitX)×col)
 *
 * marginY = unitY/(rows+1)
 * marginX = unitX/(cols+1)
 */
export const createGrid = (spec: GridSpec) => {
  // 分割代入で rows と cols を取り出す。オブジェクトから特定のプロパティを変数に展開する JavaScript の構文。
  const { rows, cols } = spec;

  // 画面を均等に割った「1単位」の長さを算出する。`calc(100% / (rows + 1))` で rows+1 分割した高さ/幅を表す。
  const unitY = `calc(100% / (${rows} + 1))`;
  const unitX = `calc(100% / (${cols} + 1))`;

  // 余白を算出する。単位をさらに (rows+1)/(cols+1) で割り、均等なマージンを求める。
  const marginY = `calc(${unitY} / (${rows} + 1))`;
  const marginX = `calc(${unitX} / (${cols} + 1))`;

  // グリッドを1つ進んだときの増分（余白 + 1単位）。中心点同士の距離を表す。
  const stepY = `calc(${marginY} + ${unitY})`;
  const stepX = `calc(${marginX} + ${unitX})`;

  // 最初の中心までの距離（余白 + 半分単位）。row/col が 0 のときの中心座標計算に使用する基準値。
  const firstY = `calc(${marginY} + (${unitY} / 2))`;
  const firstXFromRight = `calc(${marginX} + (${unitX} / 2))`;

  // row に応じた中心Y座標を返す関数。firstY を基準に stepY を row 回足し、calc 文字列で中心位置を表現する。
  const centerYOf = (row: number) => `calc(${firstY} + (${stepY} * ${row}))`;

  // col に応じた中心X座標を返す関数。右端基準で firstXFromRight + stepX×col を算出し、
  // 100% から差し引いて左方向へ増加させる。
  const centerXOf = (col: number) =>
    `calc(100% - (${firstXFromRight} + (${stepX} * ${col})))`;

  // 座標計算に必要な値と関数をまとめて返す。
  // 呼び出し側（App 等）は centerXOf/centerYOf や stepX/stepY をレイアウト計算に利用する。
  return {
    rows,
    cols,
    unitX,
    unitY,
    marginX,
    marginY,
    stepX,
    stepY,
    centerXOf,
    centerYOf,
  };
};
