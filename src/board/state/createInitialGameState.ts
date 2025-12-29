// src/state/createInitialGameState.ts

import type { GameState, ZoneKey } from "./GameState";

/**
 * ゲーム開始時の空の状態を作ります。
 * すべてのゾーンは「カード0枚」から始まります。
 */
export function createInitialGameState(): GameState {
  // ゾーン名を配列で定義します
  const zoneKeys: ZoneKey[] = [
    "deck",
    "discard",
    "live-right",
    "live-center",
    "live-left",
    "member-right",
    "member-center",
    "member-left",
    "hand",
    "energyDeck",
    "energy",
    "successLive",
  ];

  // zones を空配列で初期化します
  const zones = {} as GameState["zones"];

  for (const key of zoneKeys) {
    zones[key] = [];
  }

  return {
    zones,
    cardsById: {},
  };
}
