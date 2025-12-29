import React from "react";

type Props = {
  // deck枠の内側サイズ（px）
  widthPx: number;
  heightPx: number;

  // デッキ枚数
  cardCount: number;
};

/**
 * デッキ専用の装飾
 * - カードがある時は中を濃い水色にする
 * - 10枚ごとに厚みを表す線を追加する
 */
export function DeckDecoration(props: Props) {
  const { widthPx, heightPx, cardCount } = props;

  // カードがあるかどうか
  const hasCards = cardCount > 0;

  // 10枚ごとの段数（56枚なら5段）
  const stackCount = Math.floor(cardCount / 10);

  return (
    <>
      {/* 背景（水色） */}
      {hasCards && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#8fd3ff",
            zIndex: 0,
          }}
        />
      )}

      {/* 厚み表現（10枚ごと） */}
      {hasCards &&
        Array.from({ length: stackCount }).map((_, i) => {
          const offset = i + 1;

          return (
            <React.Fragment key={i}>
              {/* 縦線（右側） */}
              <div
                style={{
                  position: "absolute",
                  left: widthPx + offset,
                  top: offset,
                  width: 1,
                  height: heightPx,
                  backgroundColor: "#333",
                  zIndex: 1,
                }}
              />

              {/* 横線（下側） */}
              <div
                style={{
                  position: "absolute",
                  left: offset,
                  top: heightPx + offset,
                  width: widthPx,
                  height: 1,
                  backgroundColor: "#333",
                  zIndex: 1,
                }}
              />
            </React.Fragment>
          );
        })}
    </>
  );
}
