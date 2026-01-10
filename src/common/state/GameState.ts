// src/common/state/GameState.ts
// React/TypeScript の型定義として ZoneKey を取り込むための import。盤面レイアウトで定義したゾーン識別子を src/board/elements/zones/_shared から参照し、状態型に含める。
import type { ZoneKey } from "../../board/elements/zones/_shared";
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
