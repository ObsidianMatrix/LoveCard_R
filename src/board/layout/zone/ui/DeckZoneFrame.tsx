// ファイル責務: デッキゾーン専用の枠を描画する。
// 共通枠 ZoneFrame にデッキ専用装飾 DeckDecoration を合成し、実測した内側サイズを装飾に渡す。
// レイアウト計算は上位から受け取り、ここでは DOM 実測と装飾の描画制御だけを担当する。

// React をインポートする。
// useRef/useState/useLayoutEffect などのフックを利用するため、名前空間を読み込む。
import React from "react";
// CSSProperties と ReactNode 型をインポートする。props で受け取る CSS 値や children の型として使用する。
import type { CSSProperties, ReactNode } from "react";
// 共通枠コンポーネント ZoneFrame をインポートする。中心座標・サイズ・枠線スタイルなどを適用して枠を描画する。
import { ZoneFrame } from "./zoneFrame";
// デッキ専用の装飾コンポーネント DeckDecoration をインポートする。枚数に応じた背景と厚み表現を描画する。
import { DeckDecoration } from "./DeckDecoration";

// DeckZoneFrame が受け取る props の型定義。
// ZoneFrame への座標・サイズ・枠線設定に加え、デッキ枚数 cardCount を持つ。
type Props = {
  // ZoneFrameに渡す値（CSS値でもOK）
  centerX: CSSProperties["left"];
  centerY: CSSProperties["top"];
  width: CSSProperties["width"];
  height: CSSProperties["height"];
  title?: string;
  variant?: "dashed" | "solid";
  disabled?: boolean;
  zIndex?: number;
  children?: ReactNode;

  // デッキ枚数
  cardCount: number;
};

/**
 * deck 専用の ZoneFrame
 * - ZoneFrame（共通枠）に、DeckDecoration（専用装飾）を合成する
 * - px の幅/高さは実測して求める（calc文字列などでも確実に動く）
 */
export function DeckZoneFrame(props: Props) {
  // 分割代入で cardCount と children を取り出し、それ以外の枠関連 props を zoneProps としてまとめる。
  const { cardCount, children, ...zoneProps } = props;

  // -----------------------------
  // 実測した幅/高さ（px）
  // -----------------------------
  // containerRef: 枠内コンテナの DOM を参照するための ref。
  // React.useRef はミュータブルなオブジェクトを返し、current に要素を保持する。
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  // measured: 実測結果を保持する state。useState で { widthPx, heightPx } または null を管理する。
  const [measured, setMeasured] = React.useState<{ widthPx: number; heightPx: number } | null>(null);

  // -----------------------------
  // 描画後にサイズを測る
  // -----------------------------
  // useLayoutEffect: DOM 更新後に同期的に実行される React フック。
  // ここでは描画後に getBoundingClientRect を呼び出すために使用する。
  React.useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // サイズを計測し state へ反映する関数。
    // getBoundingClientRect は DOMRect を返し、幅・高さを取得できる。
    const update = () => {
      const rect = el.getBoundingClientRect();

      // 0やNaNを避けるため、Number.isFinite で検証してから代入する。無効値の場合は 0 を入れる。
      const widthPx = Number.isFinite(rect.width) ? rect.width : 0;
      const heightPx = Number.isFinite(rect.height) ? rect.height : 0;

      setMeasured({ widthPx, heightPx });
    };

    update();

    // 画面サイズ変更にも追従するため、resize イベントで update を呼ぶ。
    // イベントリスナはクリーンアップで解除する。
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [zoneProps.width, zoneProps.height]); // width/height が変わったときも再計測するよう依存配列に含める。

  return (
    // ZoneFrame に座標・サイズ・枠スタイルなどの props をそのまま渡し、共通枠を描画する。
    <ZoneFrame {...zoneProps}>
      {/* ZoneFrameのcontent内にabsoluteを置きたいのでrelativeで包む。
          containerRef で DOM を参照し、
          position:relative にすることで内部の absolute 要素の基準をこの div にする。 */}
      <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%" }}>
        {/* 実測できた時だけ描く（NaN対策）。
        measured が null でなく、width/height が正のとき DeckDecoration を描画する。 */}
        {measured && measured.widthPx > 0 && measured.heightPx > 0 ? (
          <DeckDecoration widthPx={measured.widthPx} heightPx={measured.heightPx} cardCount={cardCount} />
        ) : null}

        {/* デッキの中身（children）を前面に配置する。
        position:relative と zIndex:2 で装飾より前に表示する。 */}
        <div style={{ position: "relative", zIndex: 2, width: "100%", height: "100%" }}>{children}</div>
      </div>
    </ZoneFrame>
  );
}
