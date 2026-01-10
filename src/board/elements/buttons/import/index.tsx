// ファイル責務: 「Import」ボタンの配置・表示・クリック処理をまとめ、デッキ読み込み専用の動作をここに閉じ込める。
// ファイル選択や JSON パースの依存は actionFactory に注入し、UI 側は定義済みの配列を参照するだけで動作するようにする。

// JavaScript の仕様として、表示コンポーネント Import をインポートする。src/board/button/Import がラベル描画を担当する。
import { Import } from "../../../button/Import";
// JavaScript の仕様として、ボタン定義型 ButtonDefinition をインポートする。../_shared/types から取得し、layout/render/createAction の形を揃える。
import type { ButtonDefinition } from "../_shared/types";

// import ボタンの定義。レイアウトとレンダラーに加えて、ファイル読み込みと state 更新を行うクリック処理を組み立てる。
const importDefinition: ButtonDefinition<"import"> = {
  // layout: 盤面右下セル（row:3, col:4）の middle 段に縦向きで配置する。
  layout: {
    buttonKey: "import",
    orientation: "portrait",
    anchors: [{ row: 3, col: 4 }],
    slot: "middle",
  },
  // render: Import コンポーネントを返し、ボタンラベルを描画する。
  render: (buttonKey) => <Import buttonKey={buttonKey} />,
  // createAction: openTextFile/parseDeckJson/dispatch を依存として受け取り、デッキ読み込み処理を返す。
  createAction: (deps) => {
    // 依存を分割代入し、クリック時に利用する。非同期処理を扱うため async 関数を返す。
    const { openTextFile, parseDeckJson, dispatch } = deps;
    return async () => {
      // openTextFile で JSON 拡張子のみ選択可能なダイアログを開く。戻り値が falsy の場合はキャンセルされたためログを残して終了する。
      const text = await openTextFile({ accept: ".json,application/json" });
      if (!text) {
        console.log("import: cancelled");
        return;
      }

      try {
        // parseDeckJson で JSON 文字列をデッキ名と枚数辞書に変換する。戻り値を dispatch に渡して状態を更新する。
        const { deckName, countsByCardNumber } = parseDeckJson(text);
        dispatch({
          type: "IMPORT_DECK",
          payload: { deckName, countsByCardNumber },
        });

        // 変換結果の総カード枚数を reduce で集計し、成功ログとして出力する。
        console.log("import: ok", {
          deckName,
          total: Object.values(countsByCardNumber).reduce((a, b) => a + b, 0),
        });
      } catch (e) {
        // try/catch でパースや dispatch 失敗時の例外を捕捉し、エラーログとアラートを出して利用者に通知する。
        console.error("import: failed", e);
        alert("デッキJSONの読み込みに失敗しました");
      }
    };
  },
};

// _shared/index.ts で配列結合できるよう単一要素の配列で公開する。
export const importButtons = [importDefinition];
