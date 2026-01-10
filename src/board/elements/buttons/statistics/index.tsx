// ファイル責務: 「統計」ボタンのレイアウト・表示・クリック動作をまとめ、デッキ情報の簡易表示処理をボタン単位で閉じ込める。
// state を参照してデッキ名や枚数を出力するため、依存注入された state を使って onClick を構築する。

// JavaScript の仕様として、統計ラベルの表示コンポーネント Statistics をインポートする。src/board/button/Statistics の描画を利用する。
import { Statistics } from "../../../button/Statistics";
// JavaScript の仕様として、zone キー生成ヘルパー makeZoneKey をインポートする。デッキゾーンのキーを算出するため src/board/elements/zones/_shared から取得する。
import { makeZoneKey } from "../../zones/_shared";
// JavaScript の仕様として、ボタン定義型 ButtonDefinition をインポートする。../_shared/types から取得し、layout/render/createAction の契約を守る。
import type { ButtonDefinition } from "../_shared/types";

// 統計ボタンの定義。layout で位置を指定し、render でラベルを描画し、createAction でデッキ情報をログ出力する。
const statisticsDefinition: ButtonDefinition<"statistics"> = {
  // layout: 盤面右上セル（row:2, col:4）の bottom 段に縦向きで配置する。
  layout: {
    buttonKey: "statistics",
    orientation: "portrait",
    anchors: [{ row: 2, col: 4 }],
    slot: "bottom",
  },
  // render: Statistics コンポーネントを返し、ラベル描画を担当させる。
  render: (buttonKey) => <Statistics buttonKey={buttonKey} />,
  // createAction: state を受け取り、デッキ名と枚数をログ出力する onClick を生成する。
  createAction: (deps) => {
    // デッキゾーンのキーを作成し、state 内の該当ゾーン参照に利用する。
    const deckZoneKey = makeZoneKey("deck");
    return () => {
      console.log("action: statistics");
      console.log("deckName:", deps.state.deckName);
      console.log("deckCount:", deps.state.zones[deckZoneKey].length);
    };
  },
};

// 他ボタン定義と配列連結できるよう単一配列で公開する。
export const statisticsButtons = [statisticsDefinition];
