// 画面全体を表示するための一番上のコンポーネント。
// Vite + React では、この App コンポーネントが最初に表示される。
export default function App() {
  return (
    // 画面の中身を囲むための箱。
    // padding を指定して、画面の端に文字がくっつかないようにしている。
    <div style={{ padding: 24 }}>
      {/* 画面に表示するタイトル */}
      <h1>Hello World</h1>

      {/* タイトルの下に表示する説明文 */}
      <p>Vite + React + TypeScript</p>
    </div>
  );
}
