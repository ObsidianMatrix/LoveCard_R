import React from "react";
import { Stage } from "../board/stage/Stage";
import { ZoneFrame } from "../board/layout/zone/ui/zoneFrame";
import { DeckZoneFrame } from "../board/layout/zone/ui/DeckZoneFrame";
import { ButtonFrame } from "../board/layout/button/ui/buttonFrame";

import { createGrid } from "../board/layout/grid/grid";
import { createCardSize } from "../board/layout/cardSize";

import { zoneFromPoints } from "../board/layout/zone/zoneFromPoints";
import { buttonFromPoints } from "../board/layout/button/buttonFromPoints";

import { zones } from "../board/layout/zone/render/zones";
import { createButtons } from "../board/layout/button/render/buttons";
import { makeZoneKey } from "../board/layout/zone/model/zonesLayout";

import { createButtonActions } from "../board/button/actions/createButtonActions";
import { openTextFile } from "../board/button/actions/openJsonFile";
import { parseDeckJson } from "../board/button/actions/parseDeckJson";

import { labels } from "../board/layout/label/render/labels";
import { LabelFrame } from "../board/layout/label/ui/LabelFrame";
import { labelFromPoints } from "../board/layout/label/labelFromPoints";

import { createInitialGameState } from "../board/state/createInitialGameState";
import { gameReducer } from "../board/state/reducer";
import { Deck } from "../board/zone/Deck";

// デッキゾーンのキーを一箇所にまとめておきます（状態管理と常に一致させるため）
const deckZoneKey = makeZoneKey("deck");


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

  // -----------------------------
  // ゲーム状態（state）と更新（dispatch）
  // -----------------------------
  const [state, dispatch] = React.useReducer(gameReducer, undefined, () => createInitialGameState());

  // -----------------------------
  // ボタン動作（actions）
  // -----------------------------
  const actions = createButtonActions({
    onBack: () => {
      console.log("action: back");
    },
    onPhase: () => {
      console.log("action: phase");
    },

    // Import: ファイル選択 → JSON読込 → 加工 → deck に入れる
    onImport: async () => {
      const text = await openTextFile({ accept: ".json,application/json" });
      if (!text) {
        console.log("import: cancelled");
        return;
      }

      try {
        const { deckName, countsByCardNumber } = parseDeckJson(text);

        dispatch({
          type: "IMPORT_DECK",
          payload: { deckName, countsByCardNumber },
        });

        console.log("import: ok", {
          deckName,
          total: Object.values(countsByCardNumber).reduce((a, b) => a + b, 0),
        });
      } catch (e) {
        console.error("import: failed", e);
        alert("デッキJSONの読み込みに失敗しました");
      }
    },

    onInitialize: () => {
      console.log("action: initialize");
      // 次の段階で、ここで「6枚ドロー」などを dispatch します。
    },

    onStatistics: () => {
      console.log("action: statistics");
      console.log("deckName:", state.deckName);
      console.log("deckCount:", state.zones[deckZoneKey].length);
    },
  });

  // -----------------------------
  // ボタン定義（見た目 + クリック処理）
  // -----------------------------
  const buttons = createButtons(actions);

  return (
    <Stage>
      <div style={{ position: "absolute", top: 8, left: 8, fontSize: 12, color: "#666" }}>
        <p>Vite + React + TypeScript</p>
        <p>deckName: {state.deckName ?? "-"}</p>
        <p>deckCount: {state.zones[deckZoneKey].length}</p>
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

        // -----------------------------
        // deck だけ専用の表示（濃い水色 + 厚み）
        // -----------------------------
        // デッキゾーン内のカードIDをキーから取得します
        const deckCards = state.zones[deckZoneKey].map((id) => state.cardsById[id]);

        if (z.zoneKey === deckZoneKey) {
          return (
            <DeckZoneFrame
              key={z.zoneKey}
              title={z.label}
              centerX={rect.centerX}
              centerY={rect.centerY}
              width={rect.width}
              height={rect.height}
              variant={z.variant}
              cardCount={state.zones[deckZoneKey].length}
            >
              <Deck cards={deckCards} />
            </DeckZoneFrame>
          );
        }


        // -----------------------------
        // それ以外は汎用表示
        // -----------------------------
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
          slot: b.slot,
        });

        return (
          <ButtonFrame
            key={`${b.buttonKey}:${b.slot}`}
            centerX={rect.centerX}
            centerY={rect.centerY}
            width={rect.width}
            height={rect.height}
            onClick={b.onClick}
          >
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
          heightRatio: 1 / 6,
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
