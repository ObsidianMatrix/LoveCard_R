// JavaScript の仕様として、React の関数コンポーネントとフックを使うために React を import する。JSX の解釈と useMemo の参照を行い、メンバーゾーンの表示責務をこのファイルで完結させるために必要。
import React from "react";
// JavaScript の仕様として、CSS Modules のスタイルを import する。styles を使ってメンバーゾーンのテキスト表示をこのファイルで制御する。
import styles from "../ui/text.module.css";
// JavaScript の仕様として、ゾーンキー型を import する。ZoneKey を props の入力として使い、状態参照のキーにするためこのファイルで受け取る。
import type { ZoneKey } from "../elements/zones/_shared";
// JavaScript の仕様として、状態管理フックとセレクターを import する。src/common/state の useGameState と selectCardsInZone を受け取り、メンバーゾーンのカード配列を取得する責務をここに持たせる。
import { useGameState, selectCardsInZone } from "../../common/state";

// TypeScript の型定義として props を宣言する。ZoneKey を入力として受け取り、メンバーゾーンの識別に使うためこのファイルで定義する。
type MemberProps = {
  // JavaScript の仕様として、オブジェクトのプロパティを定義する。zoneKey を入力に受け取り、状態参照のキーとして使用するためここに置く。
  zoneKey: ZoneKey;
};

// JavaScript の仕様として関数コンポーネントを宣言する。MemberProps を受け取り、メンバーエリアのラベルと枚数を JSX で返し、このゾーンの表示責務をこのファイルで担う。
export function Member(props: MemberProps) {
  // JavaScript の仕様として分割代入で zoneKey を取り出す。props を入力として受け取り、カード取得のキーに使うためここで行う。
  const { zoneKey } = props;

  // JavaScript の仕様としてカスタムフックを呼び出す。src/common/state の useGameState に引数なしでアクセスし、GameState を取得してカード配列参照に使うためこのファイルで実行する。
  const { state } = useGameState();

  // JavaScript の仕様として React.useMemo を使う。state と zoneKey を入力に selectCardsInZone（src/common/state）を実行し、メンバーゾーンのカード配列をメモ化して枚数表示に使うためここに置く。
  const cardsInMember = React.useMemo(() => selectCardsInZone(state, zoneKey), [state, zoneKey]);

  // JavaScript の仕様として JSX を返す。メンバーエリアのラベルと枚数を描画し、このゾーンの表示責務をこのファイルで完結させる。
  return (
    <div data-zone-key={zoneKey} className={styles.text}>
      <div>
        メンバー
        <br />
        エリア
      </div>
      <div>枚数: {cardsInMember.length}</div>
    </div>
  );
}
