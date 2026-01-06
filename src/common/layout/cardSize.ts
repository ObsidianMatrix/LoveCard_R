// ファイル責務: カードの見た目サイズ（縦横比、向きごとの幅高さ）を一元管理し、
// レイアウト計算から分離して提供する。
// グリッド計算やゾーン/ボタン/ラベルの矩形算出で共通利用するためのユーティリティ。
import type { Orientation } from "./grid/types";

/**
 * カードの見た目サイズ（固定）をまとめます
 * - 盤面の中心点計算とは切り離しておきます
 */
export const createCardSize = () => {
  // カードの縦横比を定数として定義する。実寸に合わせ 1024/1429 の比率を使用。
  const cardAspectRatio = 1024 / 1429;

  // 縦向き（portrait）の高さと幅を計算する。
  // 高さはビューポート高さの 20%（20vh）、幅は高さにアスペクト比を掛けて求める。
  const portraitH = `20vh`;
  const portraitW = `calc(${portraitH} * ${cardAspectRatio})`;

  // 横向き（landscape）：縦横を入れ替え
  const landscapeW = portraitH;
  const landscapeH = portraitW;

  // 向きに応じたサイズオブジェクトを返す関数。Orientation 型の引数 o を受け取り、w（幅）と h（高さ）を返す。
  // if 文で portrait の場合を判定し、そうでなければ landscape サイズを返す。
  // 戻り値は { w: string, h: string } 形。
  const sizeByOrientation = (o: Orientation) => {
    if (o === "portrait") return { w: portraitW, h: portraitH };
    return { w: landscapeW, h: landscapeH };
  };

  // 計算した各サイズと sizeByOrientation 関数をまとめて返す。
  // 呼び出し側は sizeByOrientation を使って向きごとに幅高さを取得し、レイアウト計算に利用する。
  return {
    portraitW,
    portraitH,
    landscapeW,
    landscapeH,
    sizeByOrientation,
  };
};
