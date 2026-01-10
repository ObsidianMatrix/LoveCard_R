// ファイル責務: レイアウト系ユーティリティの入口を一本化し、グリッド計算とカードサイズ計算をここから取得できるようにする。
// React/TypeScript の export 構文で下位モジュールをまとめ、import 元を簡略化する。
// グリッド計算と型を提供するエントリーポイント。src/common/layout/grid/index で集約した createGrid などを再公開する。
export * from "./grid";
// カードサイズ計算ユーティリティを再エクスポートする。向きごとの幅高さ計算を行う createCardSize を src/common/layout/cardSize から提供する。
export { createCardSize } from "./cardSize";
