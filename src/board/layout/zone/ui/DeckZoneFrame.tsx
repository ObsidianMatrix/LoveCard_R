import React from "react";
import type { CSSProperties, ReactNode } from "react";
import { ZoneFrame } from "./zoneFrame";
import { DeckDecoration } from "./DeckDecoration";

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
  const { cardCount, children, ...zoneProps } = props;

  // -----------------------------
  // 実測した幅/高さ（px）
  // -----------------------------
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [measured, setMeasured] = React.useState<{ widthPx: number; heightPx: number } | null>(null);

  // -----------------------------
  // 描画後にサイズを測る
  // -----------------------------
  React.useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();

      // 0やNaNを避ける
      const widthPx = Number.isFinite(rect.width) ? rect.width : 0;
      const heightPx = Number.isFinite(rect.height) ? rect.height : 0;

      setMeasured({ widthPx, heightPx });
    };

    update();

    // 画面サイズ変更にも追従
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [zoneProps.width, zoneProps.height]);

  return (
    <ZoneFrame {...zoneProps}>
      {/* ZoneFrameのcontent内にabsoluteを置きたいのでrelativeで包む */}
      <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%" }}>
        {/* 実測できた時だけ描く（NaN対策） */}
        {measured && measured.widthPx > 0 && measured.heightPx > 0 ? (
          <DeckDecoration widthPx={measured.widthPx} heightPx={measured.heightPx} cardCount={cardCount} />
        ) : null}

        <div style={{ position: "relative", zIndex: 2, width: "100%", height: "100%" }}>{children}</div>
      </div>
    </ZoneFrame>
  );
}
