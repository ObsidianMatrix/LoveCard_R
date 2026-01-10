// JavaScript の仕様として、React の関数コンポーネントとフックを使うために React を import する。JSX を解釈し useMemo を参照して、手札ゾーンの表示責務をこのファイルで完結させるために必要。
import React from "react";
// JavaScript の仕様として、CSS Modules のスタイルを import する。styles を使って手札ゾーンのテキスト表示をこのファイルで制御する。
import styles from "../ui/text.module.css";
// JavaScript の仕様として、ゾーンキー型を import する。ZoneKey を props で受け取り、状態参照の入力として利用するためここに置く。
import type { ZoneKey } from "../elements/zones/_shared";
// JavaScript の仕様として、状態管理フックとセレクターを import する。src/common/state の useGameState と selectCardsInZone を使い、手札ゾーンのカード配列を取得する責務をこのファイルに置く。
import { useGameState, selectCardsInZone } from "../../common/state";

// TypeScript の型定義として props を宣言する。ZoneKey を入力として受け取り、手札ゾーンの識別に使うためこのファイルに定義する。
type HandProps = {
  // JavaScript の仕様としてオブジェクトのプロパティを定義する。zoneKey を入力として受け取り、状態検索のキーとして使うためここに置く。
  zoneKey: ZoneKey;
};

// JavaScript の仕様として関数コンポーネントを宣言する。HandProps を受け取り、手札のラベルと枚数を JSX で返す責務をこのファイルで担う。
export function Hand(props: HandProps) {
  // JavaScript の仕様として分割代入で zoneKey を取り出す。props を入力に受け、後続の状態取得に使うためここで行う。
  const { zoneKey } = props;

  // JavaScript の仕様としてカスタムフックを呼び出す。src/common/state の useGameState に引数なしでアクセスし、GameState を取得して手札のカード配列参照に使うためここで実行する。
  const { state } = useGameState();

  // JavaScript の仕様として React.useMemo を使う。state と zoneKey を入力に selectCardsInZone（src/common/state）を実行し、手札ゾーンのカード配列をメモ化して枚数表示に使うためここに置く。
  const cardsInHand = React.useMemo(() => selectCardsInZone(state, zoneKey), [state, zoneKey]);

  // JavaScript の仕様として JSX を返す。手札ラベルと cardsInHand の枚数を描画し、このゾーン表示の責務をこのファイルで完結させる。
  return (
    <div className={styles.text}>
      <div>手札</div>
      <div>枚数: {cardsInHand.length}</div>
    </div>
  );
}
