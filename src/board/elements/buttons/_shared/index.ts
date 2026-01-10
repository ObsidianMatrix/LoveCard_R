// ファイル責務: 各ボタンフォルダで定義した layout/render/action を配列として結合し、App が利用する ButtonDef 配列を生成する。
// 依存注入されたボタン動作を materializeButton で確定させ、ゾーンと同様に単一の参照元を提供する。

// JavaScript の仕様として、ButtonActionDeps/ButtonDef/ButtonDefinition/materializeButton をインポートする。
// ボタン生成に必要な型とヘルパーを ../_shared/types からまとめて取得し、以降の処理で再利用する。
import { materializeButton, type ButtonActionDeps, type ButtonDef, type ButtonDefinition } from "./types";
// JavaScript の仕様として、back ボタン定義をインポートする。src/board/elements/buttons/back で配置・表示・動作を定義している。
import { backButtons } from "../back";
// JavaScript の仕様として、phase ボタン定義をインポートする。src/board/elements/buttons/phase で管理される。
import { phaseButtons } from "../phase";
// JavaScript の仕様として、initialize ボタン定義をインポートする。src/board/elements/buttons/initialize で管理される。
import { initializeButtons } from "../initialize";
// JavaScript の仕様として、import ボタン定義をインポートする。src/board/elements/buttons/import で管理される。
import { importButtons } from "../import";
// JavaScript の仕様として、statistics ボタン定義をインポートする。src/board/elements/buttons/statistics で管理される。
import { statisticsButtons } from "../statistics";

// すべてのボタン定義をまとめた配列。as const でリテラル型を保持し、ButtonKey を正確に抽出できるようにする。
const buttonDefinitions = [
  ...backButtons,
  ...phaseButtons,
  ...initializeButtons,
  ...importButtons,
  ...statisticsButtons,
] as const;

// ButtonKey のユニオン型。buttonDefinitions から layout.buttonKey を取り出し、App 側でキーを安全に扱えるようにする。
export type ButtonKey = (typeof buttonDefinitions)[number]["layout"]["buttonKey"];

// 依存注入済みの ButtonDef 配列を生成する関数。materializeButton で content と onClick を確定させ、App から map できる形にする。
export function createButtons(deps: ButtonActionDeps): ButtonDef<ButtonKey>[] {
  return buttonDefinitions.map((definition) => materializeButton(definition, deps));
}

// 型をまとめて再エクスポートし、利用側が import 元を一本化できるようにする。
export { type ButtonActionDeps, type ButtonDefinition, type ButtonDef };
