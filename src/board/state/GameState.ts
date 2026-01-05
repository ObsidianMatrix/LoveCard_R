// src/board/state/GameState.ts
import type { ZoneKey } from "../layout/zone/model/zonesLayout";
/**
 * カード1枚を識別するためのIDです。
 * 同じカード番号でも、別の実体として区別するために使います。
 */
export type CardId = string;

/**
 * 盤面上に存在するカード1枚の情報です。
 * Importした「デッキの構成」は cardNumber を持つカード実体に展開して扱います。
 */
export type Card = {
  // このカード固有のID
  id: CardId;

  /**
   * カード番号（例: "PL!SP-bp1-004-R"）
   * Import JSON もカードマスターもこの形式なので string にします。
   */
  cardNumber: string;

  // 表向きかどうか
  faceUp: boolean;

  // タップ状態（TF）
  tapped: boolean;
};

/**
 * ゲーム全体の状態（＝状態管理の箱）です。
 */
export type GameState = {
  /**
   * デッキ名（ImportしたJSONの name を入れます）
   * 未Importなら null。
   */
  deckName: string | null;

  /**
   * 各ゾーンが「どのカードIDを、どの順番で持っているか」
   */
  zones: Record<ZoneKey, CardId[]>;

  /**
   * カードIDからカード情報を引くための辞書
   */
  cardsById: Record<CardId, Card>;
};
