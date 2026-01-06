// ファイル責務: 初期化ボタンのラベル表示のみを行うプレゼンテーションコンポーネントを定義する。
// クリック処理や状態更新などのロジックは actions 側に委譲し、ここでは文字列表示とスタイル適用に限定する。

// CSS Modules で定義されたテキストスタイルをインポートする。../ui/text.module.css の default export を styles として受け取り、className に適用する。
// CSS Modules はクラス名をローカルスコープ化し、他コンポーネントとの衝突を防ぐ。
import styles from "../ui/text.module.css";

// Initialize コンポーネントが受け取る props の型定義。buttonKey を string として受け取るが、表示専用のため内部では利用しない。
type InitializeProps = {
  buttonKey: string;
};

// Initialize コンポーネント本体。buttonRenderers から呼び出され、ボタンのラベル部分を描画する役割を持つ。
export function Initialize(_props: InitializeProps) {
  // JSX の div 要素を返し、className に styles.text を指定してテキストスタイルを適用する。
  // children に固定文言「初期化」を配置し、ボタンの内容をユーザーに明示する。クリックハンドラは外部の ButtonFrame で設定されるためここでは扱わない。
  return <div className={styles.text}>初期化</div>;
}
