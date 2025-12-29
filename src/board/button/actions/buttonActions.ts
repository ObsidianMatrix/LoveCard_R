import type { ButtonKey } from "../../layout/button/model/buttonsLayout";

/**
 * ボタンを押した時に実行する関数の型です。
 * ここは「形」だけを決めます（実装は別ファイル）。
 */
export type ButtonAction = () => void;

/**
 * buttonKey → クリック処理 の辞書の型です。
 */
export type ButtonActions = Record<ButtonKey, ButtonAction>;

/**
 * createButtonActions に渡す「外から注入する材料」です。
 * 例：state/dispatch や ファイル選択などは App 側で実装して、ここには入口だけ渡します。
 */
export type ButtonActionDeps = {
  onBack?: ButtonAction;
  onPhase?: ButtonAction;
  onImport?: ButtonAction;
  onInitialize?: ButtonAction;
  onStatistics?: ButtonAction;
};
