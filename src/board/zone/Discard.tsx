// JavaScript の仕様として、React の関数コンポーネントとフックを使うために React を import する。JSX を解釈して useMemo を参照し、控室ゾーンの表示責務をこのファイルで完結させるために必要。
import React from "react";
// JavaScript の仕様として、CSS Modules のクラスを取得するために import する。テキスト装飾用の styles を受け取り、このゾーン専用の見た目をここで適用するために使う。
import styles from "../ui/text.module.css";
// JavaScript の仕様として、ゾーン識別子の型を import する。ZoneKey を受け取り、状態参照の入力として使うためこのファイルに置く。
import type { ZoneKey } from "../elements/zones/_shared";
// JavaScript の仕様として、状態取得フックとセレクター関数を import する。src/common/state から useGameState と selectCardsInZone を受け取り、控室ゾーンのカード配列を取得する責務をこのファイルに置く。
import { useGameState, selectCardsInZone } from "../../common/state";

// TypeScript の型エイリアス定義として props 形状を宣言する。ZoneKey を入力として受け取り、控室ゾーンの表示先を特定するためこのコンポーネントに紐づける。
type DiscardProps = {
  // JavaScript の仕様として、オブジェクト型のプロパティを定義する。zoneKey を入力として受け取り、状態検索のキーとして使用するためにこのファイルで定義する。
  zoneKey: ZoneKey;
};

// JavaScript の仕様として関数コンポーネントを宣言する。DiscardProps を入力に取り、控室ゾーンのラベルと枚数を JSX で返し、表示責務をこのファイルに置く。
export function Discard(props: DiscardProps) {
  // JavaScript の仕様として分割代入で zoneKey を取り出す。入力 props からゾーンキーを抽出し、後続の状態参照に使うためここで行う。
  const { zoneKey } = props;

  // JavaScript の仕様としてカスタムフックを呼び出す。src/common/state の useGameState に引数なしでアクセスし、GameState を取得してこのゾーン内カードの参照に使うためこのファイルで実行する。
  const { state } = useGameState();

  // JavaScript の仕様として React の useMemo フックを呼び出す。state と zoneKey を入力にして selectCardsInZone（src/common/state）を実行し、控室のカード配列をメモ化して枚数表示に使うためここで行う。
  const cardsInDiscard = React.useMemo(() => selectCardsInZone(state, zoneKey), [state, zoneKey]);

  // JavaScript の仕様として JSX を返す。控室ラベルと cardsInDiscard の枚数を描画し、ゾーン表示の責務をこのファイルで完結させる。
  return (
    <div className={styles.text}>
      <div>控室</div>
      <div>枚数: {cardsInDiscard.length}</div>
    </div>
  );
}