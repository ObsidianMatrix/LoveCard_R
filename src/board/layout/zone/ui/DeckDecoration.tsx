// ファイル責務: デッキゾーン専用の装飾を描画する。
// カード枚数に応じて背景色と厚み表現の線を重ね、見た目のみを担当するプレゼンテーションコンポーネント。
// 枠の位置やサイズ計算は DeckZoneFrame 側で行い、
// このコンポーネントは受け取った実測値を使って装飾の絶対配置を行う。

// React 名前空間をインポートする。JSX を記述するため、React のスコープが必要となる。
import React from "react";

// DeckDecoration が受け取る props の型定義。
// widthPx/heightPx は枠の内側サイズ(px)、cardCount はデッキ枚数。
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
  // 分割代入で props から幅・高さ・枚数を取り出す。
  // オブジェクトの特定プロパティを変数化する JavaScript の構文。
  const { widthPx, heightPx, cardCount } = props;

  // カードがあるかどうか。0 枚より大きい場合 true となり、背景や厚み線を描画する条件に使う。
  const hasCards = cardCount > 0;

  // 10枚ごとの段数（例: 56 枚なら 5 段）。Math.floor は小数切り捨てで整数化する標準関数。
  const stackCount = Math.floor(cardCount / 10);

  return (
    <>
      {/* 背景（水色）。hasCards が true のときだけ描画する。
      inset:0 で親要素いっぱいに絶対配置し、zIndex=0 で奥に敷く。 */}
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

      {/* 厚み表現（10枚ごと）。hasCards が true の場合のみ、stackCount 回だけ縦線・横線を描画する。 */}
      {hasCards &&
        Array.from({ length: stackCount }).map((_, i) => {
          // i は 0 始まりなので、線のずらし量として 1 から始まる offset を計算する。
          const offset = i + 1;

          return (
            <React.Fragment key={i}>
              {/* 縦線（右側）。left を枠幅+offset にし、top を offset にして右下方向にずらす。
              高さは heightPx で枠の高さと同じにする。 */}
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

              {/* 横線（下側）。top を高さ+offset にし、left を offset にして右下方向にずらす。
              幅は widthPx で枠幅と同じにする。 */}
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
