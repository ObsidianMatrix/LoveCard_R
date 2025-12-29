// src/board/button/actions/openJsonFile.ts

/**
 * ファイル選択ダイアログを開いて、選んだファイルを文字列として読み込みます。
 * - accept で .json を優先させます
 */
export async function openTextFile(options: { accept: string }): Promise<string | null> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = options.accept;

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) {
        resolve(null);
        return;
      }

      try {
        const text = await file.text();
        resolve(text);
      } catch {
        resolve(null);
      }
    };

    input.click();
  });
}
