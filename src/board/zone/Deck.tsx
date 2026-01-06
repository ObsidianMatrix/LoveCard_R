import React from "react";
import styles from "../ui/text.module.css";
import type { ZoneKey } from "../layout/zone/model/zonesLayout";
import { useGameState } from "../state/GameStateContext";
import { selectCardsInZone } from "../state/selectors";

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