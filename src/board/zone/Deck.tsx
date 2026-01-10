// React の関数コンポーネントとフックを使うための import。JSX を解釈し、useMemo などを利用するために React 名前空間を読み込む。
import React from "react";
// CSS Modules でスタイルを適用するための import。src/board/ui/text.module.css を参照し、クラス名をオブジェクトとして取得する。
import styles from "../ui/text.module.css";
// ゾーンキー型を取得するための import。盤面レイアウトで定義した ZoneKey を src/board/elements/zones/_shared から参照し、props の型として使用する。
import type { ZoneKey } from "../elements/zones/_shared";
// 状態管理の Context フックとセレクターを取得するための import。GameStateProvider が提供する state/dispatch を受け取る useGameState と、ゾーン内カード配列を取り出す selectCardsInZone を src/common/state から使用する。
import { useGameState, selectCardsInZone } from "../../common/state";

type DeckProps = {
  // どのゾーンを表示するかを示すキーを受け取ります。
  zoneKey: ZoneKey;
};

// デッキ領域の中身だけを担当します。
export function Deck(props: DeckProps) {
  // props からゾーンキーを取り出します。
  const { zoneKey } = props;

  // Context からゲーム状態を取得します。
  const { state } = useGameState();

  // ゾーンキーからカード配列を選択してメモ化します。
  const cardsInDeck = React.useMemo(() => selectCardsInZone(state, zoneKey), [state, zoneKey]);

  return (
    <div className={styles.text}>
      <div>デッキ置き場</div>

      {/* 枚数表示（GameStateと常に一致） */}
      <div>枚数: {cardsInDeck.length}</div>
    </div>
  );
}
