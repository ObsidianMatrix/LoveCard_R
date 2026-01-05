// src/board/state/reducer.ts

import type { GameState, Card } from "./GameState";
import type { GameAction } from "./actions";
import { createInitialGameState } from "./createInitialGameState";
import { createId } from "./id";
import { makeZoneKey } from "../layout/zone/model/zonesLayout";
// デッキゾーンのキーを定数化して、状態管理と書式を合わせます
const deckZoneKey = makeZoneKey("deck");

/**
 * 状態を更新する中心です。
 * - UI（React）からは dispatch でここに依頼します。
 * - ここは「stateをどう変えるか」だけを書きます。
 */
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "IMPORT_DECK": {
      const { deckName, countsByCardNumber } = action.payload;

      /**
       * 業務的に安全な方針：
       * - Importは「新しいデッキを読み込む」なので、盤面状態はリセットします。
       * - デッキだけ差し替えて他ゾーンを残すと、後で整合性事故になりやすいです。
       */
      const next = createInitialGameState();
      next.deckName = deckName;

      // counts を「カード実体」に展開して deck に積みます
      const deckCardIds: string[] = [];
      const nextCardsById: Record<string, Card> = {};

      for (const [cardNumber, count] of Object.entries(countsByCardNumber)) {
        // 0枚や不正値は無視
        if (!Number.isFinite(count) || count <= 0) {
          continue;
        }

        const n = Math.floor(count);

        for (let i = 0; i < n; i++) {
          const id = createId();
          const card: Card = {
            id,
            cardNumber,
            faceUp: false,
            tapped: false,
          };

          nextCardsById[id] = card;
          deckCardIds.push(id);
        }
      }

      return {
        ...next,
        zones: {
          ...next.zones,
          // デッキゾーンには定義済みキーを使ってまとめて格納します
          [deckZoneKey]: deckCardIds,
        },
        cardsById: nextCardsById,
      };
    }

    default:
      return state;
  }
}
