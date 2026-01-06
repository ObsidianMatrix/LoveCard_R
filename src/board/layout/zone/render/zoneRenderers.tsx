// ファイル責務: ゾーン種類（ZoneKind）ごとに中身を生成するレンダラー辞書を提供し、
// 条件分岐を避けてキー→コンポーネントの対応を明確にする。
// レイアウト側（zones.tsx）はこの辞書を参照して content を作成し、
// zoneKey を渡すだけで適切なコンポーネントが描画される。

// React 名前空間をインポートする。JSX を使用するために必要であり、戻り値の型として React.ReactNode を扱う。
import React from "react";

// 各ゾーンの表示コンポーネントをインポートする。
// ../../../zone 配下の Deck/Discard/EnergyDeck/Energy/Hand/Live/Member/SuccessLive を利用する。
import { Deck } from "../../../zone/Deck";
import { Discard } from "../../../zone/Discard";
import { EnergyDeck } from "../../../zone/EnergyDeck";
import { Energy } from "../../../zone/Energy";
import { Hand } from "../../../zone/Hand";
import { Live } from "../../../zone/Live";
import { Member } from "../../../zone/Member";
import { SuccessLive } from "../../../zone/SuccessLive";

// zoneKey（唯一のゾーン識別子）と zoneKind（ゾーン種別）の型をインポートする。
// ../model/zonesLayout で定義されたユニオン型を使用し、辞書のキーを型安全にする。
import type { ZoneKey, ZoneKind } from "../model/zonesLayout";

/**
 * ZoneKind（枠の種類）→ 中身を返す関数 の対応表
 *
 * zoneKey は「ゾーン識別子」を受け取り、必要に応じて data 属性などに載せます。
 */
export const zoneRenderers: Record<ZoneKind, (zoneKey: ZoneKey) => React.ReactNode> = {
  // デッキは zoneKey だけを渡し、内部で状態を参照させます
  deck: (zoneKey) => <Deck zoneKey={zoneKey} />,
  // 以降のゾーンは zoneKey を属性に渡してトレースしやすくします
  discard: (zoneKey) => <Discard zoneKey={zoneKey} />,
  energyDeck: (zoneKey) => <EnergyDeck zoneKey={zoneKey} />,
  energy: (zoneKey) => <Energy zoneKey={zoneKey} />,
  hand: (zoneKey) => <Hand zoneKey={zoneKey} />,
  live: (zoneKey) => <Live zoneKey={zoneKey} />,
  member: (zoneKey) => <Member zoneKey={zoneKey} />,
  successLive: (zoneKey) => <SuccessLive zoneKey={zoneKey} />,
};
