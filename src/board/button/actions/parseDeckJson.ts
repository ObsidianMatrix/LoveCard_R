// src/board/button/actions/parseDeckJson.ts

/**
 * Importで読むJSONの型です。
 * cards の値は "4" のように文字列で来る前提です。
 */
type ImportedDeckJson = Array<{
  name: string;
  cards: Record<string, string>;
}>;

/**
 * JSON文字列をパースして、デッキ名と「カード番号→枚数」を返します。
 */
export function parseDeckJson(text: string): { deckName: string; countsByCardNumber: Record<string, number> } {
  const data = JSON.parse(text) as ImportedDeckJson;

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("デッキJSONが空です");
  }

  const first = data[0];
  if (typeof first?.name !== "string") {
    throw new Error("デッキJSONの name が見つかりません");
  }
  if (typeof first?.cards !== "object" || first.cards === null) {
    throw new Error("デッキJSONの cards が見つかりません");
  }

  const countsByCardNumber: Record<string, number> = {};

  for (const [cardNumber, countStr] of Object.entries(first.cards)) {
    const count = Number(countStr);

    // "0" や変な値は弾きます
    if (!Number.isFinite(count) || count <= 0) {
      continue;
    }

    countsByCardNumber[cardNumber] = Math.floor(count);
  }

  return { deckName: first.name, countsByCardNumber };
}
