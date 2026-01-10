// ファイル責務: ブラウザのファイル選択ダイアログを開き、
// 選択されたファイルをテキストとして読み込む処理を単一関数にまとめる。
// UI コンポーネントから直接 DOM API を扱わずに済むよう、このユーティリティで抽象化している。

/**
 * ファイル選択ダイアログを開いて、選んだファイルを文字列として読み込む非同期関数。
 * @param options.accept 許可する MIME タイプや拡張子をカンマ区切りで指定する。
 * 例: ".json,application/json"
 * @returns 選択したファイルのテキスト（Promise<string|null>）。キャンセルや読み込み失敗時は null を返す。
 */
export async function openTextFile(options: { accept: string }): Promise<string | null> {
  // 新しい Promise を生成し、resolve を通じて結果を返す。
  // 非同期処理をラップすることで、呼び出し元は await で待機できる。
  return new Promise((resolve) => {
    // document.createElement は DOM API で新しい要素を作成する。
    // ここでは <input type="file"> を生成し、プログラムからダイアログを開くために使用する。
    const input = document.createElement("input");
    // type="file" を設定し、ファイル選択用の入力要素にする。
    input.type = "file";
    // accept 属性に渡された拡張子/MIME を設定し、ユーザーが選べるファイル種別を制限する。
    input.accept = options.accept;

    // onchange イベントハンドラを設定する。ユーザーがファイルを選択したときに呼び出される。
    // アロー関数は this を束縛せず、外側の resolve などをクロージャで保持する。
    // async により内部で await が利用できる。
    input.onchange = async () => {
      // input.files は FileList で、?.[0] により最初のファイルを安全に取得する。
      // ファイル未選択の場合は undefined となる。
      const file = input.files?.[0];
      // ファイルがない（キャンセルした）場合は null を resolve して早期終了する。
      if (!file) {
        resolve(null);
        return;
      }

      try {
        // File.text()（ブラウザ標準の File API）でファイル内容を文字列として非同期取得する。
        // 戻り値は Promise<string> なので await で解決する。
        const text = await file.text();
        // 正常に読み込めた文字列を resolve し、呼び出し元へ返す。
        resolve(text);
      } catch {
        // 読み込み中に例外が発生した場合は null を返して失敗を示す。
        // catch ブロックではエラー内容を無視し、呼び出し側のハンドリングを簡易化する。
        resolve(null);
      }
    };

    // input.click() でプログラム的にクリックイベントを発火させ、ファイル選択ダイアログを表示する。
    input.click();
  });
}
