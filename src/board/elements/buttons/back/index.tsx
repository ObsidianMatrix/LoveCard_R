// ファイル責務: 「一手戻る」ボタンのレイアウト・見た目・クリック動作を一箇所にまとめ、_shared/index.ts で他ボタンと連結できる形で提供する。
// 配置や文言の変更がこのフォルダ内で完結するようにし、App からは定義済み配列を参照するだけにする。

// JavaScript の仕様として、表示コンポーネント Back をインポートする。src/board/button/Back にあり、ボタンラベルの描画を担当する。
import { Back } from "../../../button/Back";
// JavaScript の仕様として、ボタン定義型 ButtonDefinition をインポートする。レイアウト・レンダラー・アクションの契約を ../_shared/types から取得する。
import type { ButtonDefinition } from "../_shared/types";

// back ボタンの定義本体。layout で配置座標と向きを指定し、render で JSX を生成し、createAction でクリック時の処理を組み立てる。
const backDefinition: ButtonDefinition<"back"> = {
  // layout: 盤面右上（row:2, col:4）のカード枠を縦向きで基準にし、slot: "top" に配置する。
  layout: {
    buttonKey: "back",
    orientation: "portrait",
    anchors: [{ row: 2, col: 4 }],
    slot: "top",
  },
  // render: buttonKey を受け取り Back コンポーネントを返す。見た目のみを担当し、クリックは ButtonFrame 側で処理する。
  render: (buttonKey) => <Back buttonKey={buttonKey} />,
  // createAction: onClick に渡す処理を生成する。依存物を必要としないため、引数 deps は未使用で単にログ出力のみを返す。
  createAction: () => () => {
    console.log("action: back");
  },
};

// _shared/index.ts で配列結合できるよう、単一要素の配列としてエクスポートする。
export const backButtons = [backDefinition];
