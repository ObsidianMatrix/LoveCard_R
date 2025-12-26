export type GridSpec = {
  rows: number;
  cols: number;
};

/**
 * 中心点の計算（あなたの式）をまとめたもの
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
  const { rows, cols } = spec;

  // 画面を均等に割った「1単位」
  const unitY = `calc(100% / (${rows} + 1))`;
  const unitX = `calc(100% / (${cols} + 1))`;

  // 余白（unitをさらに割る）
  const marginY = `calc(${unitY} / (${rows} + 1))`;
  const marginX = `calc(${unitX} / (${cols} + 1))`;

  // 1つ進むときの増分（余白 + 1単位）
  const stepY = `calc(${marginY} + ${unitY})`;
  const stepX = `calc(${marginX} + ${unitX})`;

  // 最初の中心までの距離（余白 + 半分単位）
  const firstY = `calc(${marginY} + (${unitY} / 2))`;
  const firstXFromRight = `calc(${marginX} + (${unitX} / 2))`;

  // row: (marginY)+(unitY/2)+(marginY+unitY)×row
  const centerYOf = (row: number) => `calc(${firstY} + (${stepY} * ${row}))`;

  // col: 右からの距離を作ってから 100% から引く
  const centerXOf = (col: number) =>
    `calc(100% - (${firstXFromRight} + (${stepX} * ${col})))`;

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
