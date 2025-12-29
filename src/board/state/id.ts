// src/board/state/id.ts

/**
 * カード実体のIDを作ります。
 * - ブラウザでは randomUUID が使えることが多いです。
 * - もし無い環境でも動くようにフォールバックを入れます。
 */
export function createId(): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = globalThis as any;

  if (c.crypto && typeof c.crypto.randomUUID === "function") {
    return c.crypto.randomUUID();
  }

  // フォールバック（衝突しにくい程度）
  return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
