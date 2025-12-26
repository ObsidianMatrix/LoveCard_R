import React from "react";
import { Stage } from "./Stage";
import { ZoneFrame } from "./ZoneFrame";

import { createGrid } from "./layout/grid";
import { createCardSize } from "./layout/cardSize";
import { rectFromPoints } from "./layout/rectFromPoints";

import { zones } from "./layout/zones";

export default function App() {
  // -----------------------------
  // 中心点の計算（あなたの式）
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
          points: z.points,

          centerXOf: grid.centerXOf,
          centerYOf: grid.centerYOf,

          stepX: grid.stepX,
          stepY: grid.stepY,

          sizeByOrientation,
        });

        return (
          <ZoneFrame
            key={z.id}
            title={z.title}
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
