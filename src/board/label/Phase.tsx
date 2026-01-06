// ファイル責務: フェーズ表示用ラベルの中身（文字列とスタイル適用）のみを担当する
// プレゼンテーションコンポーネントを定義する。
// ラベルの配置や大きさは LabelFrame、表示内容の決定は labelRenderers から委譲され、
// ここでは受け取った props を描画するだけに限定する。

// テキストスタイルを定義した CSS Modules をインポートする。
// ../ui/text.module.css の default export を styles として受け取り、
// className に適用してローカルスコープ化されたクラス名を使う。
import styles from "../ui/text.module.css";

// Phase コンポーネントが受け取る props の型定義。
// labelKey はこのラベルを一意に識別するキー、title は画面に表示するフェーズ名の文字列。
type PhaseProps = {
  labelKey: string;
  title: string;
};

// Phase コンポーネント本体。
// labelRenderers（../layout/label/render/labelRenderers.tsx）から呼び出され、
// 渡された title を表示する役割のみを持つ。
export function Phase(props: PhaseProps) {
  // JSX の div 要素を返し、className に styles.text を指定してテキストスタイルを適用する。
  // children に props.title を直接渡し、現在のフェーズ名をラベルとして描画する。
  // クリックなどのインタラクションは持たず純粋な表示コンポーネントとなる。
  return <div className={styles.text}>{props.title}</div>;
}
