// React本体を読み込む。
// JSX（<App /> など）を使うために必要。
import React from "react";

// Reactの画面をブラウザに描画するための機能を読み込む。
import ReactDOM from "react-dom/client";

// 画面の中身をまとめた App コンポーネントを読み込む。
import App from "./App";

// アプリ全体で使う共通のCSSを読み込む。
import "./styles/global.css";

// index.html にある <div id="root"></div> を取得する。
// ここが React が画面を描画する「土台」になる。
const rootElement = document.getElementById("root");

// 万が一 root が見つからなかった場合は、
// 何も表示されずに壊れるのを防ぐため、エラーで止める。
if (!rootElement) {
  throw new Error("root not found");
}

// Reactの描画を開始する。
// StrictMode は開発中に問題のある書き方を検出しやすくする仕組み。
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* アプリの一番上のコンポーネントを表示する */}
    <App />
  </React.StrictMode>
);
