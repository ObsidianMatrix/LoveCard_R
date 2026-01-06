// src/common/state/actions.ts

/**
 * Import で得られた「デッキ名」と「カード番号→枚数」を state に入れるためのActionです。
 */
export type ImportDeckPayload = {
  deckName: string;
  countsByCardNumber: Record<string, number>;
};

/**
 * 今回必要なのは Import だけなので、まずはこれだけ用意します。
 * 将来 Initialize / Draw などを追加していきます。
 */
export type GameAction =
  | {
      type: "IMPORT_DECK";
      payload: ImportDeckPayload;
    };
