import type { DeckCardInstance } from "./types";

/**
 * cards の value は "1"〜"4" の文字列のみ許可
 * （指定どおり）
 */
function isCountString(value: unknown): value is "1" | "2" | "3" | "4" {
  return value === "1" || value === "2" || value === "3" || value === "4";
}

/**
 * JSON文字列を受け取り、
 * - JSONファイルであること（JSON.parseできる）
 * - ルートが配列であること
 * - 各要素が name, cards を持つこと
 * - cards の value が "1"〜"4" の文字列のみ
 * をチェックして、
 * 「カードID + 〇枚目」の配列を作る
 */
export function parseDeckFromJsonText(jsonText: string): DeckCardInstance[] {
  let data: unknown;

  // JSONとして読めるか（指定どおり）
  try {
    data = JSON.parse(jsonText);
  } catch {
    throw new Error("JSONファイルではありません（JSONとして解釈できません）");
  }

  // ルートが配列か（指定どおり）
  if (!Array.isArray(data)) {
    throw new Error("JSONのルートは配列である必要があります");
  }

  const result: DeckCardInstance[] = [];

  // 配列を順番にチェック
  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    // 各要素はオブジェクトである必要がある
    if (typeof item !== "object" || item === null) {
      throw new Error(`配列の${i}番目がオブジェクトではありません`);
    }

    // name, cards を持つこと（指定どおり）
    const name = (item as { name?: unknown }).name;
    const cards = (item as { cards?: unknown }).cards;

    if (name === undefined) {
      throw new Error(`配列の${i}番目に name がありません`);
    }
    if (cards === undefined) {
      throw new Error(`配列の${i}番目に cards がありません`);
    }

    // cards はオブジェクト（Record）である必要がある
    if (typeof cards !== "object" || cards === null || Array.isArray(cards)) {
      throw new Error(`配列の${i}番目の cards はオブジェクトである必要があります`);
    }

    const cardsObj = cards as Record<string, unknown>;

    // cards の中身を展開して「〇枚目」を作る
    for (const cardId of Object.keys(cardsObj)) {
      // カードIDは自由（指定どおり）なので、形式チェックはしない
      const value = cardsObj[cardId];

      // value は "1"〜"4" の文字列だけ
      if (!isCountString(value)) {
        throw new Error(`cards["${cardId}"] の値が不正です（"1"〜"4" の文字列のみ）`);
      }

      // "1"〜"4" を数に変換して 1枚目〜count枚目 を作る
      const count = Number(value);

      for (let nth = 1; nth <= count; nth++) {
        result.push({ cardId, nth });
      }
    }
  }

  return result;
}
