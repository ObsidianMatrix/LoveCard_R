// ファイル責務: インポートボタンのラベル表示のみを担うプレゼンテーションコンポーネントを定義する。
// ファイル選択や状態更新などのロジックは actions 側に委譲し、このコンポーネントは文字列とスタイル適用に限定する。

// テキスト表示用の CSS Modules をインポートする。../ui/text.module.css の default export を styles として受け取り、className で利用する。
// CSS Modules はクラス名をローカルスコープ化し、他のスタイルと衝突しないようにする仕組み。
import styles from "../ui/text.module.css";

// Import コンポーネントが受け取る props の型定義。buttonKey を string として受け取るが、表示専用のため内部では参照しない。
type ImportProps = {
  buttonKey: string;
};

// Import コンポーネント本体。buttonRenderers から呼び出され、ボタンのラベル部分を描画する。
export function Import(_props: ImportProps) {
  // JSX の div 要素を返し、className に styles.text を指定してテキストスタイルを適用する。
  // 子要素に固定文言「インポート」を配置し、ボタンの役割をユーザーに伝える。クリック処理は ButtonFrame で設定されるためここでは扱わない。
  return <div className={styles.text}>インポート</div>;
}
