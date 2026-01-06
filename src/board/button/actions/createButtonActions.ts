// ファイル責務: ボタン押下時の動作を外部依存から組み立て、ButtonKey ごとに実行関数を返す辞書を生成する。
// 実際の処理実装は App 側などで提供し、このファクトリ関数は欠損時の安全なデフォルトを補う役割を持つ。

// buttonActions.ts から ButtonActions と ButtonActionDeps の型を読み込む。
// import type は型情報のみを取り込み、実行時の出力に影響しない。型整合性を確保するために利用する。
import type { ButtonActions, ButtonActionDeps } from "./buttonActions";

/**
 * ボタンのクリック処理（actions）をまとめて生成する関数。
 * App などの上位から渡された依存オブジェクトを用いて、全ボタンの onClick を網羅した辞書を返す。
 */
export function createButtonActions(deps: ButtonActionDeps): ButtonActions {
  // 依存が未提供の場合でも例外を出さないよう、何もしない関数を用意する。
  // const は再代入不可の定数宣言、noop は "no operation" の意味で空のアロー関数を割り当てる。
  const noop = () => {
    // ここは意図的に空です。クリックしても動作しないことを保証する。
  };

  // 戻り値として ButtonKey ごとの関数を持つオブジェクトを返す。
  // null 合体演算子 ?? により、deps に該当プロパティが存在しない場合は noop を代入する。
  // こうすることでボタンが必ず実行可能な関数を持ち、undefined 呼び出しによる実行時エラーを防ぐ。
  return {
    back: deps.onBack ?? noop,
    phase: deps.onPhase ?? noop,
    import: deps.onImport ?? noop,
    initialize: deps.onInitialize ?? noop,
    statistics: deps.onStatistics ?? noop,
  };
}
