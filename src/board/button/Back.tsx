// ファイル責務: 「一手戻る」ボタンのラベル表示のみを担うプレゼンテーションコンポーネントを提供する。
// クリック処理などのロジックは actions 側に委譲し、このファイルでは見た目と props の受け口だけを定義する。

// テキスト用の CSS Modules をインポートする。../ui/text.module.css の default export を styles として受け取り、className に適用してローカルスコープ化されたスタイルを使う。
import styles from "../ui/text.module.css";

// Back コンポーネントが受け取る props の型定義。buttonKey を string で受け取るが表示専用のため内部では参照しない。
// 型エイリアスを用いて構造を明示し、呼び出し元に正しい形での引数渡しを強制する。
type BackProps = {
  buttonKey: string;
};

// Back コンポーネント本体。関数宣言で名前付き export し、buttonRenderers（../layout/button/render/buttonRenders.tsx）から呼び出される。
export function Back(_props: BackProps) {
  // JSX で div 要素を返す。className に styles.text を指定してテキストスタイルを適用し、ラベル文字列「一手戻る」を表示する。
  // イベントハンドラは受け取らず、ButtonFrame 側で onClick が設定されるため、このコンポーネントは純粋な表示のみを担当する。
  return <div className={styles.text}>一手戻る</div>;
}
