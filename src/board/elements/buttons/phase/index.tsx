// ファイル責務: 「フェーズ進行」ボタンのレイアウト・表示・動作を集約し、他ボタンと同じ形式で _shared/index.ts に渡せるようにする。
// フェーズ処理のトリガーとなる UI をここで完結させ、App では配列を受け取って描画するだけにする。

// JavaScript の仕様として、フェーズ表示コンポーネント Phase をインポートする。src/board/button/Phase にあり、ボタンラベルを描画する。
import { Phase } from "../../../button/Phase";
// JavaScript の仕様として、ボタン定義型 ButtonDefinition をインポートする。../_shared/types から取得し、layout/render/createAction の構造を守る。
import type { ButtonDefinition } from "../_shared/types";

// phase ボタンの定義。layout で配置、render で見た目、createAction でクリック時の挙動を指定する。
const phaseDefinition: ButtonDefinition<"phase"> = {
  // layout: 盤面右上の同じセルに middle 段で配置する。縦向き・アンカーは row:2, col:4 とする。
  layout: {
    buttonKey: "phase",
    orientation: "portrait",
    anchors: [{ row: 2, col: 4 }],
    slot: "middle",
  },
  // render: フェーズ名表示用の Phase コンポーネントを返す。buttonKey を渡しつつ、描画のみ担当する。
  render: (buttonKey) => <Phase buttonKey={buttonKey} />,
  // createAction: 依存を使わず「フェーズ」イベントをログ出力するだけの onClick を返す。
  createAction: () => () => {
    console.log("action: phase");
  },
};

// _shared/index.ts で他ボタンと結合するため、配列形式でエクスポートする。
export const phaseButtons = [phaseDefinition];
