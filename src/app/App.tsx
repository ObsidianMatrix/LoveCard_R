import React from "react";
import { Stage } from "../board/stage/Stage";
import { ZoneFrame } from "../board/layout/zone/ui/zoneFrame";
import { ButtonFrame } from "../board/layout/button/ui/buttonFrame";

import { createGrid } from "../board/layout/grid/grid";
import { createCardSize } from "../board/layout/cardSize";

import { zoneFromPoints } from "../board/layout/zone/zoneFromPoints";
import { buttonFromPoints } from "../board/layout/button/buttonFromPoints";

import { zones } from "../board/layout/zone/render/zones";
import { buttons } from "../board/layout/button/render/buttons";

import { labels } from "../board/layout/label/render/labels";
import { LabelFrame } from "../board/layout/label/ui/LabelFrame";
import { labelFromPoints } from "../board/layout/label/labelFromPoints";


export default function App() {
  // -----------------------------
  // 盤面のグリッド（中心点計算）
  // -----------------------------
  const grid = createGrid({ rows: 4, cols: 5 });

  // -----------------------------
  // カードの見た目サイズ
  // -----------------------------
  const card = createCardSize();
  const sizeByOrientation = card.sizeByOrientation;

  return (
    <Stage>
      <div style={{ position: "absolute", top: 8, left: 8, fontSize: 12, color: "#666" }}>
        <p>Vite + React + TypeScript</p>
      </div>

      {zones.map((z) => {
        const rect = zoneFromPoints({
          orientation: z.orientation,
          points: z.anchors,

          centerXOf: grid.centerXOf,
          centerYOf: grid.centerYOf,

          stepX: grid.stepX,
          stepY: grid.stepY,

          sizeByOrientation,
        });

        return (
          <ZoneFrame
            key={z.zoneKey}
            title={z.label}
            centerX={rect.centerX}
            centerY={rect.centerY}
            width={rect.width}
            height={rect.height}
            variant={z.variant}
          >
            {z.content}
          </ZoneFrame>
        );
      })}
      {buttons.map((b) => {
      // -----------------------------
      // ボタンの中心座標とサイズを計算
      // -----------------------------
      const rect = buttonFromPoints({
        orientation: b.orientation,
        points: b.anchors,
        centerXOf: grid.centerXOf,
        centerYOf: grid.centerYOf,
        stepY: grid.stepY,
        sizeByOrientation,
        heightRatio: 0.25,
        slot: b.slot, // ★追加
      });


      return (
        <ButtonFrame
          key={b.buttonKey}
          centerX={rect.centerX}
          centerY={rect.centerY}
          width={rect.width}
          height={rect.height}
          disabled={b.disabled}
          onClick={b.onClick}
        >
          {/* -----------------------------
              ボタンの見た目（中身）
            ----------------------------- */}
          {b.content}
        </ButtonFrame>
      );
      })}


    {labels.map((l) => {
      const rect = labelFromPoints({
        orientation: l.orientation,
        points: l.anchors,
        centerXOf: grid.centerXOf,
        centerYOf: grid.centerYOf,
        stepX: grid.stepX,
        stepY: grid.stepY,
        sizeByOrientation,

        slot: l.slot,

        // ラベルの見た目の高さ（小さめでOK）
        heightRatio: 1 / 6,

        // ★段はボタンと同じ基準で計算する（重要）
        laneHeightRatio: 0.25,
      });


      return (
        <LabelFrame
          key={l.labelKey}
          centerX={rect.centerX}
          centerY={rect.centerY}
          width={rect.width}
          height={rect.height}
          zIndex={10}
        >
          {l.content}
        </LabelFrame>
      );
    })}

    </Stage>
  );
}
