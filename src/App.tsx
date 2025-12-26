import { Stage } from "./Stage";
import { ZoneFrame } from "./ZoneFrame";
import { Deck } from "./Deck";
import { Discard } from "./Discard";
import { EnergyDeck } from "./EnergyDeck";

type Orientation = "portrait" | "landscape";

type ZoneDef = {
  id: string;
  title: string;

  // グリッド開始位置
  row?: number;
  col: 0 | 1 | 2 | 3 | 4;

  // span（省略時 1）
  rowSpan?: number;
  colSpan?: number;

  // 特殊配置（centerY を直接指定したい場合）
  centerY?: string;

  // 枠自体の向き（枠の高さ・幅に使う）
  orientation: Orientation;

  variant: "dashed" | "solid";
  content: React.ReactNode;
};

export default function App() {
  // =========================================================
  // 1) カード寸法（向きに応じた幅/高さ）
  // =========================================================
  const cardAspectRatio = 1024 / 1429;

  // portrait（縦）
  const portraitH = "20vh";
  const portraitW = `calc(${portraitH} * ${cardAspectRatio})`;

  // landscape（横）: 90度回転の想定
  const landscapeW = portraitH;
  const landscapeH = portraitW;

  const sizeByOrientation = (o: Orientation) => {
    if (o === "portrait") return { w: portraitW, h: portraitH };
    return { w: landscapeW, h: landscapeH };
  };

  const halfWByOrientation = (o: Orientation) =>
    `calc(${sizeByOrientation(o).w} / 2)`;

  const halfHByOrientation = (o: Orientation) =>
    `calc(${sizeByOrientation(o).h} / 2)`;

  const heightByOrientation = (o: Orientation) => sizeByOrientation(o).h;

  // =========================================================
  // 2) row（縦方向）: 今は portraitH 基準のまま
  //    ※必要ならここも orientation 基準に後で拡張可能
  // =========================================================
  const gapY = `calc(${portraitH} / 5)`;
  const baseCenterY = `calc(${gapY} + (${portraitH} / 2))`;
  const rowStep = `calc(${portraitH} + ${gapY})`;

  const rowCenterY = (r: number) => `calc(${baseCenterY} + (${rowStep} * ${r}))`;

  const rowSpanCenterY = (startRow: number, span: number) => {
    if (span <= 1) return rowCenterY(startRow);
    const top = rowCenterY(startRow);
    const bottom = rowCenterY(startRow + (span - 1));
    return `calc((${top} + ${bottom}) / 2)`;
  };

  const heightByRowSpan = (orientation: Orientation, span: number) => {
    const baseH = sizeByOrientation(orientation).h;
    if (span <= 1) return baseH;
    return `calc(${baseH} + (${rowStep} * ${span - 1}))`;
  };

  // =========================================================
  // 3) col（横方向）: ここを「列定義」に一本化する
  //    - colごとに向きが違ってもOK
  //    - colSpanの中心/幅は「端点」から取るのでズレない
  // =========================================================

  // col=0（右端列）の中心X（portrait列）
  // ※既存ロジックを温存
  const rightMargin = `calc(${portraitW} / 2)`;
  const col0CenterX = `calc(100% - (${rightMargin} + (${portraitW} / 2)))`;

  // col=1..4（左側4列）の中心X（landscape基準の割り当て）
  const remainingRightEdge = `calc(100% - (${rightMargin} + ${portraitW}))`;
  const remainingW = remainingRightEdge;
  const gapX = `calc((${remainingW} - (${landscapeW} * 4)) / 5)`;

  const colLandscapeCenterX = (k: number) =>
    `calc(${remainingRightEdge} - (${gapX} * ${k + 1}) - (${landscapeW} * ${k + 0.5}))`;

  // 列定義：この配列が「横方向の真実」になります
  // - centerX: その列の中心X
  // - slotOrientation: その列が想定している向き（span計算に使う）
  type ColDef = {
    index: 0 | 1 | 2 | 3 | 4;
    slotOrientation: Orientation;
    centerX: string;
  };

  const colDefs: ColDef[] = [
    { index: 0, slotOrientation: "portrait", centerX: col0CenterX },
    { index: 1, slotOrientation: "landscape", centerX: colLandscapeCenterX(0) },
    { index: 2, slotOrientation: "landscape", centerX: colLandscapeCenterX(1) },
    { index: 3, slotOrientation: "landscape", centerX: colLandscapeCenterX(2) },
    { index: 4, slotOrientation: "landscape", centerX: colLandscapeCenterX(3) },
  ];

  // 列インデックスから定義を取る
  const getColDef = (col: 0 | 1 | 2 | 3 | 4) => colDefs[col];

  // 列の中心X
  const colCenterX = (col: 0 | 1 | 2 | 3 | 4) => getColDef(col).centerX;

  // 列スロットの「左端/右端」（列ごとの slotOrientation の幅を使う）
  // これが span 計算の基礎になります。
  const colLeftX = (col: 0 | 1 | 2 | 3 | 4) => {
    const def = getColDef(col);
    const halfW = halfWByOrientation(def.slotOrientation);
    return `calc(${def.centerX} - ${halfW})`;
  };

  const colRightX = (col: 0 | 1 | 2 | 3 | 4) => {
    const def = getColDef(col);
    const halfW = halfWByOrientation(def.slotOrientation);
    return `calc(${def.centerX} + ${halfW})`;
  };

  // colSpanの中心X（startCol〜endCol の中央）
  const colSpanCenterX = (startCol: 0 | 1 | 2 | 3 | 4, span: number) => {
    if (span <= 1) return colCenterX(startCol);
    const endCol = (startCol + (span - 1)) as 0 | 1 | 2 | 3 | 4;
    const left = colLeftX(endCol);
    const right = colRightX(startCol);
    return `calc((${left} + ${right}) / 2)`;
  };

  // colSpanの幅（startCol〜endCol の右端 - 左端）
  const widthByColSpan = (orientation: Orientation, startCol: 0 | 1 | 2 | 3 | 4, span: number) => {
    if (span <= 1) return sizeByOrientation(orientation).w;

    const endCol = (startCol + (span - 1)) as 0 | 1 | 2 | 3 | 4;

    const left = colLeftX(endCol);
    const right = colRightX(startCol);

    // 端点差分をそのまま幅にする（列の性質が違ってもズレない）
    return `calc(${right} - ${left})`;
  };

  // =========================================================
  // 4) 特殊スタック（左上カード直下の余白なし2枠）
  // =========================================================
  const leftTopBaseCenterY = rowCenterY(0);

  // 左上カードは col=4 の列スロット（landscape想定）
  // 「基準カードがどの向きか」を1箇所で決める
  const leftTopBaseOrientation: Orientation = getColDef(4).slotOrientation;

  const leftTopBottomY = `calc(${leftTopBaseCenterY} + ${halfHByOrientation(leftTopBaseOrientation)})`;

  // =========================================================
  // 5) 領域定義
  // =========================================================
  const zones: ZoneDef[] = [
    // --- 右端縦列 ---
    { id: "deck", title: "deck", row: 0, col: 0, orientation: "portrait", variant: "dashed", content: <Deck /> },
    { id: "discard-1", title: "discard", row: 1, col: 0, orientation: "portrait", variant: "solid", content: <Discard /> },
    { id: "discard-2", title: "discard", row: 2, col: 0, orientation: "portrait", variant: "solid", content: <Discard /> },

    // --- 上段横向き列 ---
    { id: "energy-0", title: "energy", row: 0, col: 1, orientation: "landscape", variant: "solid", content: <EnergyDeck /> },
    { id: "energy-1", title: "energy", row: 0, col: 2, orientation: "landscape", variant: "solid", content: <EnergyDeck /> },
    { id: "energy-2", title: "energy", row: 0, col: 3, orientation: "landscape", variant: "solid", content: <EnergyDeck /> },
    { id: "energy-3", title: "energy", row: 0, col: 4, orientation: "landscape", variant: "solid", content: <EnergyDeck /> },

    // --- 追加していた deck 群 ---
    { id: "deck-0", title: "deck", row: 1, col: 1, orientation: "portrait", variant: "solid", content: <Deck /> },
    { id: "deck-1", title: "deck", row: 1, col: 2, orientation: "portrait", variant: "solid", content: <Deck /> },
    { id: "deck-2", title: "deck", row: 1, col: 3, orientation: "portrait", variant: "solid", content: <Deck /> },

    // --- 左上カード（col=4,row=0）の直下に余白なしで2枠（landscape） ---
    {
      id: "special-1",
      title: "special",
      col: 4,
      orientation: "landscape",
      variant: "solid",
      centerY: `calc(${leftTopBottomY} + ${halfHByOrientation("landscape")})`,
      content: <EnergyDeck />,
    },
    {
      id: "special-2",
      title: "special",
      col: 4,
      orientation: "landscape",
      variant: "solid",
      centerY: `calc(${leftTopBottomY} + (${heightByOrientation("landscape")} * 1.5))`,
      content: <EnergyDeck />,
    },

    // ======================================================
    // 今回の「またぐ領域」2つ
    // ======================================================

    // row:2, col:1〜3 を1枠（colSpan=3）
    // orientation は枠の見た目（高さ/幅）として portrait でもOK
    // ただし span の幅は「列の端点」から取るのでズレません
    {
      id: "span-area-1",
      title: "span r2 c1-3",
      row: 2,
      col: 1,
      colSpan: 3,
      orientation: "portrait",
      variant: "solid",
      content: <EnergyDeck />,
    },

    // row:3, col:0〜3 を1枠（colSpan=4）
    // col=0 を含んでも、列の端点から幅を取るのでズレません
    {
      id: "span-area-2",
      title: "span r3 c0-3",
      row: 3,
      col: 0,
      colSpan: 4,
      orientation: "portrait",
      variant: "solid",
      content: <EnergyDeck />,
    },
  ];

  // =========================================================
  // 6) 描画
  // =========================================================
  return (
    <Stage>
      <div>
        <h1>Hello World</h1>
        <p>Vite + React + TypeScript</p>
      </div>

      {zones.map((z) => {
        const colSpan = z.colSpan ?? 1;
        const rowSpan = z.rowSpan ?? 1;

        // --- centerX（span対応）---
        const centerX = colSpanCenterX(z.col, colSpan);

        // --- centerY（span対応、ただし centerY 指定があれば優先）---
        const centerY = z.centerY ?? rowSpanCenterY(z.row ?? 0, rowSpan);

        // --- width/height（span対応）---
        const width = widthByColSpan(z.orientation, z.col, colSpan);
        const height = heightByRowSpan(z.orientation, rowSpan);

        return (
          <ZoneFrame
            key={z.id}
            title={z.title}
            centerX={centerX}
            centerY={centerY}
            width={width}
            height={height}
            variant={z.variant}
          >
            {z.content}
          </ZoneFrame>
        );
      })}
    </Stage>
  );
}
