// ファイル責務: 統計情報ボタンのラベル表示のみを担うコンポーネントを定義する。
// ボタンクリック時の処理は actions 側に委譲し、このファイルでは文字とスタイル適用に限定する。

// テキスト用の CSS Modules をインポートする。../ui/text.module.css の default export を styles として受け取り、className に適用する。
// CSS Modules はクラス名をユニーク化し、スタイルの衝突を防ぎながらローカルに適用できる。
import styles from "../ui/text.module.css";

// Statistics コンポーネントが受け取る props の型定義。buttonKey を string として受け取るが、表示専用のため内部では利用しない。
type StatisticsProps = {
  buttonKey: string;
};

// Statistics コンポーネント本体。buttonRenderers から呼び出され、ボタンラベルを表示する役割だけを持つ。
export function Statistics(_props: StatisticsProps) {
  // JSX の div 要素を返し、className で styles.text を適用する。内部のテキスト「統計情報」でボタンの役割を示す。
  // onClick は ButtonFrame で設定されるため、ここではイベント処理を扱わない純粋表示コンポーネントとなる。
  return <div className={styles.text}>統計情報</div>;
}
