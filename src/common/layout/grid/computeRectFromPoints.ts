// ファイル責務: 複数のグリッド点から共通の矩形情報
// （中心座標・カードサイズ・スパン数）を算出するヘルパーを提供する。
// ゾーンやボタン、ラベルのレイアウト計算で共有する前処理をまとめ、
// 各処理が固有の幅高さ算出に専念できるようにする。

// グリッド座標と向きを表す型をインポートする。GridPoint はアンカー位置、Orientation は縦横向きを示す。
import type { GridPoint, Orientation } from "./types";

// 点群から矩形基礎情報を計算する関数。戻り値は as const でリテラル型を固定し、利用側で読み取り専用として扱う。
export const computeRectFromPoints = (args: {
  orientation: Orientation;
  points: GridPoint[];
  centerXOf: (col: number) => string;
  centerYOf: (row: number) => string;
  sizeByOrientation: (o: Orientation) => { w: string; h: string };
}) => {
  // 分割代入で引数を取り出す。
  // オブジェクトから同名プロパティを変数化する JavaScript の構文で、後続の式を簡潔にする。
  const { orientation, points, centerXOf, centerYOf, sizeByOrientation } = args;

  // アンカー配列が空でも計算できるよう、デフォルトで (0,0) を含む配列に置き換える。
  // 三項演算子で条件分岐し、安全な配列 safePoints を得る。
  const safePoints: GridPoint[] = points.length === 0 ? [{ row: 0, col: 0 }] : points;

  // 行・列番号の配列を作成する。
  // Array.prototype.map を使い、各 GridPoint から row/col を抽出する。map は新しい配列を返す高階関数。
  const rows = safePoints.map((p) => p.row);
  const cols = safePoints.map((p) => p.col);

  // 行・列の最小値と最大値を求める。
  // Math.min/Math.max は可変長引数を取るため、スプレッド構文 ... で配列を展開して渡す。
  const minRow = Math.min(...rows);
  const maxRow = Math.max(...rows);
  const minCol = Math.min(...cols);
  const maxCol = Math.max(...cols);

  // 両端の中心座標を平均し、枠全体の中心座標を計算する。
  // centerXOf/centerYOf はグリッド番号から CSS calc 文字列を返す関数であり、
  // それらを加算して /2 することで中点を求める。
  const centerX = `calc((${centerXOf(minCol)} + ${centerXOf(maxCol)}) / 2)`;
  const centerY = `calc((${centerYOf(minRow)} + ${centerYOf(maxRow)}) / 2)`;

  // sizeByOrientation でカード1枚分の幅・高さを取得する。
  // 戻り値のオブジェクトを分割代入し、cardW/cardH として保持する。
  const { w: cardW, h: cardH } = sizeByOrientation(orientation);
  // スパン数（列方向/行方向の差分）を計算する。最大値と最小値の差で何マス分広がっているかを表す。
  const colSpan = maxCol - minCol;
  const rowSpan = maxRow - minRow;

  // 算出した中心座標・カードサイズ・スパン数を返す。
  // as const でリテラル型にし、利用側で変更されないことを明示する。
  return { centerX, centerY, cardW, cardH, colSpan, rowSpan } as const;
};
