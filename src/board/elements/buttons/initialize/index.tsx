// ファイル責務: 「初期化」ボタンの配置・表示・動作をまとめ、_shared/index.ts で利用できる形にする。
// ドローやリセット処理の起点となるボタンをこのフォルダに閉じ込め、他のボタンと同じパターンで管理する。

// JavaScript の仕様として、表示コンポーネント Initialize をインポートする。src/board/button/Initialize のラベル描画を利用する。
import { Initialize } from "../../../button/Initialize";
// JavaScript の仕様として、ボタン定義型 ButtonDefinition をインポートする。../_shared/types から取得し、定義の型安全性を確保する。
import type { ButtonDefinition } from "../_shared/types";

// initialize ボタンの定義。layout で位置を指定し、render でラベルを描画し、createAction でクリック処理を決める。
const initializeDefinition: ButtonDefinition<"initialize"> = {
  // layout: 盤面右下寄りのセル（row:3, col:4）に top 段で縦向き配置する。
  layout: {
    buttonKey: "initialize",
    orientation: "portrait",
    anchors: [{ row: 3, col: 4 }],
    slot: "top",
  },
  // render: Initialize コンポーネントを返し、ラベル表示を担当させる。
  render: (buttonKey) => <Initialize buttonKey={buttonKey} />,
  // createAction: 依存は未使用のままログを出すだけの onClick を返す。将来的に dispatch を利用する際の注入先として維持する。
  createAction: () => () => {
    console.log("action: initialize");
    console.log("次の段階で、ここで「6枚ドロー」などを dispatch します。");
  },
};

// 他のボタン定義と結合できるよう配列形式で公開する。
export const initializeButtons = [initializeDefinition];
