import type { ButtonActions, ButtonActionDeps } from "./buttonActions";

/**
 * ボタンのクリック処理（actions）をまとめて作ります。
 * 「固定の定数」にしないで、外から材料を渡して生成できる形にします。
 */
export function createButtonActions(deps: ButtonActionDeps): ButtonActions {
  // deps が未設定でも落ちないように、何もしない関数を用意します。
  const noop = () => {
    // ここは意図的に空です。
  };

  return {
    back: deps.onBack ?? noop,
    phase: deps.onPhase ?? noop,
    import: deps.onImport ?? noop,
    initialize: deps.onInitialize ?? noop,
    statistics: deps.onStatistics ?? noop,
  };
}
