// ファイル責務: デッキ Import のための JSON 文字列を解析し、
// アプリ内部で扱いやすい形（デッキ名とカード番号ごとの枚数辞書）に変換する。
// JSON パースと入力検証をここに集約し、呼び出し元は安全な構造化データだけを受け取れるようにする。

/**
 * Import で読み込む JSON の型定義。
 * 配列の各要素が { name: string; cards: Record<string, string> } であり、
 * cards の値は "4" のように文字列で来る前提を明示する。
 */
type ImportedDeckJson = Array<{
  name: string;
  cards: Record<string, string>;
}>;

/**
 * JSON 文字列をパースして、デッキ名と「カード番号→枚数」の辞書を返す関数。
 * @param text ブラウザで読み込んだ JSON 文字列
 * @returns { deckName, countsByCardNumber } を含むオブジェクト。
 * countsByCardNumber は number に正規化済み。
 */
export function parseDeckJson(text: string): { deckName: string; countsByCardNumber: Record<string, number> } {
  // JSON.parse（JavaScript 標準の JSON 解析関数）で文字列をオブジェクトへ変換する。
  // as ImportedDeckJson で型アサーションを行い、以降のプロパティアクセスを型安全にする。
  const data = JSON.parse(text) as ImportedDeckJson;

  // データが配列で、かつ空でないことを検証する。Array.isArray は標準の配列判定関数。
  // data.length が 0 の場合は有効なデッキが存在しないため Error を投げる。
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("デッキJSONが空です");
  }

  // 配列先頭の要素を取り出す。最初のデッキ情報のみを扱う前提。
  // オプショナルチェーン ?. で安全に name を参照し、string であることをチェックする。
  const first = data[0];
  if (typeof first?.name !== "string") {
    throw new Error("デッキJSONの name が見つかりません");
  }
  // cards プロパティがオブジェクトであり null でないことを検証する。
  if (typeof first?.cards !== "object" || first.cards === null) {
    throw new Error("デッキJSONの cards が見つかりません");
  }

  // カード番号ごとの枚数を格納する辞書を初期化する。キーはカード番号、値は整数枚数。
  const countsByCardNumber: Record<string, number> = {};

  // Object.entries（標準メソッド）で cards を [キー, 値] の配列に変換し、for...of で走査する。
  // 分割代入 [cardNumber, countStr] でカード番号と枚数文字列を変数へ展開する。
  for (const [cardNumber, countStr] of Object.entries(first.cards)) {
    // Number(countStr) で枚数を数値化する。
    // 変換できない場合は NaN となり、後続の isFinite 判定で除外される。
    const count = Number(countStr);

    // Number.isFinite で有限な数値かつ 0 より大きいことを確認する。
    // 条件を満たさない場合は continue でスキップする。
    if (!Number.isFinite(count) || count <= 0) {
      continue;
    }

    // Math.floor で小数を切り捨てて整数化し、countsByCardNumber に代入する。
    // この辞書は reducer の IMPORT_DECK 処理でカード実体へ展開されるため、ここで数値を確定させておく。
    countsByCardNumber[cardNumber] = Math.floor(count);
  }

  // 解析結果としてデッキ名と枚数辞書をまとめたオブジェクトを返す。
  // 呼び出し元ではこの戻り値をそのまま dispatch の payload に渡し、状態管理に反映させる。
  return { deckName: first.name, countsByCardNumber };
}
