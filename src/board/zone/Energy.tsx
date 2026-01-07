// JavaScript の仕様として、React の関数コンポーネントとフックを使うために React を import する。JSX の解釈と useMemo の参照を行い、エネルギーゾーンの表示責務をここに集約するために必要。
import React from "react";
// JavaScript の仕様として、CSS Modules のクラスを取得するために import する。ゾーン内テキストの見た目をこのファイルで適用するため styles を利用する。
import styles from "../ui/text.module.css";
// JavaScript の仕様として、ゾーンキー型を import する。ZoneKey を受け取り、状態セレクターの入力として使うためこのコンポーネントで保持する。
import type { ZoneKey } from "../elements/zones/_shared";
// JavaScript の仕様として、状態参照のフックとセレクターを import する。src/common/state から useGameState と selectCardsInZone を取得し、エネルギーゾーンのカード配列をここで取得する責務を持たせる。
import { useGameState, selectCardsInZone } from "../../common/state";

// TypeScript の型定義として props を宣言する。ZoneKey を入力として受け取り、エネルギーゾーンの識別に使うためこのファイルで定義する。
type EnergyProps = {
  // JavaScript の仕様としてオブジェクト型のプロパティを定義する。zoneKey を入力として受け取り、後続の状態取得に使うためここに置く。
  zoneKey: ZoneKey;
};

// JavaScript の仕様として関数コンポーネントを宣言する。EnergyProps を受け取り、エネルギーエリアの表示と枚数出力を行う責務をこのファイルに置く。
export function Energy(props: EnergyProps) {
  // JavaScript の仕様として分割代入で zoneKey を取り出す。props を入力に受け、状態検索のキーとして使うためにここで実施する。
  const { zoneKey } = props;

  // JavaScript の仕様としてカスタムフックを呼び出す。src/common/state の useGameState に引数なしでアクセスし、現在の GameState を取得してカード参照に使うためこのファイルで実行する。
  const { state } = useGameState();

  // JavaScript の仕様として React.useMemo を使う。state と zoneKey を入力に selectCardsInZone（src/common/state）を実行し、エネルギーゾーン内カード配列をメモ化して枚数表示に使うためここに置く。
  const cardsInEnergy = React.useMemo(() => selectCardsInZone(state, zoneKey), [state, zoneKey]);

  // JavaScript の仕様として JSX を返す。エネルギーエリアのラベルと枚数を描画し、このゾーンの表示責務をこのファイルで完結させる。
  return (
    <div className={styles.text}>
      <div>エネルギーエリア</div>
      <div>枚数: {cardsInEnergy.length}</div>
    </div>
  );
}
