// ファイル責務: デッキ JSON 文字列を検証・解析し、
// カードIDごとの枚数から「カードID + 何枚目」の配列へ展開する。
// 入力検証（型・値の範囲チェック）と変換処理を一箇所にまとめ、
// 呼び出し側が安全な DeckCardInstance 配列だけを受け取れるようにする。

// DeckCardInstance 型をインポートする。
// ./types で定義されたカード1枚分の構造 { cardId: string; nth: number } を戻り値に利用する。
import type { DeckCardInstance } from "./types";

/**
 * cards の value が "1"〜"4" の文字列であるかを判定する型ガード関数。
 * value is "1" | "2" | "3" | "4" という戻り値型により、呼び出し後に value の型を絞り込む。
 */
function isCountString(value: unknown): value is "1" | "2" | "3" | "4" {
  // value が 4 つのいずれかの文字列に一致するかを厳密比較で判定する。true の場合のみ count として扱える。
  return value === "1" || value === "2" || value === "3" || value === "4";
}

/**
 * JSON 文字列を受け取り、構造と値を検証した上で DeckCardInstance 配列に展開する。
 * - JSON.parse で読み取れること
 * - ルートが配列であること
 * - 各要素が name, cards を持つオブジェクトであること
 * - cards の value が "1"〜"4" の文字列のみであること
 * を確認し、カードIDと枚数から「n 枚目」の配列を生成する。
 */
export function parseDeckFromJsonText(jsonText: string): DeckCardInstance[] {
  // data には JSON.parse の結果を格納する。unknown で受け取り、後続で型を狭める。
  let data: unknown;

  // JSON として解釈可能かを try/catch で検証する。
  // JSON.parse（標準関数）が例外を投げた場合はエラーメッセージを差し替えて throw する。
  try {
    data = JSON.parse(jsonText);
  } catch {
    throw new Error("JSONファイルではありません（JSONとして解釈できません）");
  }

  // ルートが配列であることを確認する。Array.isArray（標準メソッド）で配列判定を行い、
  // 違う場合はエラーを投げる。
  if (!Array.isArray(data)) {
    throw new Error("JSONのルートは配列である必要があります");
  }

  // パース結果を格納する配列を初期化する。型を DeckCardInstance[] と明示し、戻り値にもそのまま利用する。
  const result: DeckCardInstance[] = [];

  // for ループで配列をインデックス順に走査する。i は 0 始まりで data.length - 1 まで増加する。
  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    // 各要素がオブジェクトであることを検証する。typeof で "object" 判定し、null でないことを確認する。
    if (typeof item !== "object" || item === null) {
      throw new Error(`配列の${i}番目がオブジェクトではありません`);
    }

    // name と cards を取り出す。unknown を受け取りつつ、プロパティを持つ形にキャストして安全に参照する。
    const name = (item as { name?: unknown }).name;
    const cards = (item as { cards?: unknown }).cards;

    // name が未定義ならエラー。指定フォーマットを満たさないケースを早期に弾く。
    if (name === undefined) {
      throw new Error(`配列の${i}番目に name がありません`);
    }
    // cards が未定義ならエラー。
    if (cards === undefined) {
      throw new Error(`配列の${i}番目に cards がありません`);
    }

    // cards がオブジェクト（Record 形式）であることを確認する。null や配列は不正とみなしエラーを投げる。
    if (typeof cards !== "object" || cards === null || Array.isArray(cards)) {
      throw new Error(`配列の${i}番目の cards はオブジェクトである必要があります`);
    }

    // cards を Record<string, unknown> として扱う。キーがカードID、値が枚数文字列になる想定。
    const cardsObj = cards as Record<string, unknown>;

    // Object.keys（標準メソッド）でカードID一覧を取得し、
    // for...of でループする。各キーに対応する枚数文字列を検証・展開する。
    for (const cardId of Object.keys(cardsObj)) {
      // カードIDは任意文字列のため形式チェックは行わない。値だけを検証する。
      const value = cardsObj[cardId];

      // value が "1"〜"4" の文字列であることを isCountString で確認する。
      // 型ガードにより以降は value が指定文字列型に絞られる。
      if (!isCountString(value)) {
        throw new Error(`cards["${cardId}"] の値が不正です（"1"〜"4" の文字列のみ）`);
      }

      // 文字列の枚数を Number で数値化する。
      // value は "1"〜"4" に限定されているため、count は 1〜4 の数値になる。
      const count = Number(value);

      // 1 から count までループし、カードIDと nth を組み合わせた DeckCardInstance を result に追加する。
      for (let nth = 1; nth <= count; nth++) {
        result.push({ cardId, nth });
      }
    }
  }

  // 検証と展開を終えた DeckCardInstance 配列を返す。呼び出し元でそのまま状態や表示に利用できる形となる。
  return result;
}
