import type { Orientation } from "./grid/types";

/**
 * カードの見た目サイズ（固定）をまとめます
 * - 盤面の中心点計算とは切り離しておきます
 */
export const createCardSize = () => {
  const cardAspectRatio = 1024 / 1429;

  // 縦向き（portrait）
  const portraitH = `20vh`;
  const portraitW = `calc(${portraitH} * ${cardAspectRatio})`;

  // 横向き（landscape）：縦横を入れ替え
  const landscapeW = portraitH;
  const landscapeH = portraitW;

  const sizeByOrientation = (o: Orientation) => {
    if (o === "portrait") return { w: portraitW, h: portraitH };
    return { w: landscapeW, h: landscapeH };
  };

  return {
    portraitW,
    portraitH,
    landscapeW,
    landscapeH,
    sizeByOrientation,
  };
};
