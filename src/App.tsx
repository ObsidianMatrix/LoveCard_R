import React from "react";
import { Stage } from "./Stage";
import { ZoneFrame } from "./ZoneFrame";

import { createGrid } from "./layout/grid";
import { createCardSize } from "./layout/cardSize";
import { rectFromPoints } from "./layout/rectFromPoints";

import { zones } from "./layout/zones";

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
        const rect = rectFromPoints({
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
    </Stage>
  );
}
