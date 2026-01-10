// ファイル責務: フェーズ進行ボタンのラベル表示のみを担うコンポーネントを定義する。
// クリック時の処理や状態遷移は actions 側に委譲し、このファイルでは文字とスタイル適用に限定する。

// テキスト表示用の CSS Modules をインポートする。../ui/text.module.css の default export を styles として受け取り、className に指定する。
// CSS Modules によりクラス名がローカルスコープ化され、他ファイルとのスタイル衝突を回避できる。
import styles from "../ui/text.module.css";

// Phase コンポーネントが受け取る props の型定義。buttonKey を string として受け取るが、表示専用のため内部では利用しない。
type PhaseProps = {
  buttonKey: string;
};

// Phase コンポーネント本体。src/board/elements/buttons/phase/index.tsx の render から呼び出され、ボタンのラベル部分を描画する役割だけを持つ。
export function Phase(_props: PhaseProps) {
  // JSX の div 要素を返し、className で styles.text を適用する。子要素には固定文言「フェーズ進行」を配置し、ボタンの意味を明確に示す。
  // onClick は ButtonFrame で設定されるため、このコンポーネントは副作用を持たない純粋表示コンポーネントとして機能する。
  return <div className={styles.text}>フェーズ進行</div>;
}
