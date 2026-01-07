// JavaScript の仕様として、React の関数コンポーネントとフックを使うために React を import する。JSX の解釈と useMemo の参照を行い、エネルギーデッキ表示の責務をこのファイルで完結させるために必要。
import React from "react";
// JavaScript の仕様として、CSS Modules のクラス名を取得するために import する。styles を使ってエネルギーデッキ枠のテキスト装飾をこのファイルで行うため。
import styles from "../ui/text.module.css";
// JavaScript の仕様として、ゾーンキー型を import する。ZoneKey を props の入力に使い、状態参照のキーとして利用するためここで受け取る。
import type { ZoneKey } from "../elements/zones/_shared";
// JavaScript の仕様として、状態参照フックとセレクターを import する。src/common/state の useGameState と selectCardsInZone を使い、エネルギーデッキのカード配列を取得する責務をここに置く。
import { useGameState, selectCardsInZone } from "../../common/state";

// TypeScript の型定義として props を宣言する。ZoneKey を入力として受け取り、エネルギーデッキの対象ゾーンを特定するためこのファイルで定義する。
type EnergyDeckProps = {
  // JavaScript の仕様としてオブジェクト型のプロパティを定義する。zoneKey を入力として受け取り、状態検索に使うためここで保持する。
  zoneKey: ZoneKey;
};

// JavaScript の仕様として関数コンポーネントを宣言する。EnergyDeckProps を入力に受け、エネルギーデッキのラベルと枚数を描画する責務をこのファイルで担当する。
export function EnergyDeck(props: EnergyDeckProps) {
  // JavaScript の仕様として分割代入で zoneKey を取り出す。props を入力として受け取り、後続の状態参照に使うためここで行う。
  const { zoneKey } = props;

  // JavaScript の仕様としてカスタムフックを呼び出す。src/common/state の useGameState に引数なしでアクセスし、GameState を取得してカード配列参照に使うためこのファイルで実行する。
  const { state } = useGameState();

  // JavaScript の仕様として React.useMemo を呼び出す。state と zoneKey を入力に selectCardsInZone（src/common/state）でカード配列を得て、枚数表示に使うためここでメモ化する。
  const cardsInEnergyDeck = React.useMemo(() => selectCardsInZone(state, zoneKey), [state, zoneKey]);

  // JavaScript の仕様として JSX を返す。エネルギーデッキのラベルと枚数を描画し、表示の責務をこのファイルで完結させる。
  return (
    <div className={styles.text}>
      <div>
        エネルギー
        <br />
        デッキ
      </div>
      <div>枚数: {cardsInEnergyDeck.length}</div>
    </div>
  );
}
