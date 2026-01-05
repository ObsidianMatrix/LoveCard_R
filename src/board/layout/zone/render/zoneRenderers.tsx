import React from "react";

import { Deck } from "../../../zone/Deck";
import { Discard } from "../../../zone/Discard";
import { EnergyDeck } from "../../../zone/EnergyDeck";
import { Energy } from "../../../zone/Energy";
import { Hand } from "../../../zone/Hand";
import { Live } from "../../../zone/Live";
import { Member } from "../../../zone/Member";
import { SuccessLive } from "../../../zone/SuccessLive";

import type { ZoneKey, ZoneKind } from "../model/zonesLayout";

/**
 * ZoneKind（枠の種類）→ 中身を返す関数 の対応表
 *
 * zoneKey は「ゾーン識別子」を受け取り、必要に応じて data 属性などに載せます。
 */
export const zoneRenderers: Record<ZoneKind, (zoneKey: ZoneKey) => React.ReactNode> = {
  // デッキは App 側で実データを渡すため、ここでは空配列を渡して雛形だけ用意します
  deck: () => <Deck cards={[]} />,
  // 以降のゾーンは zoneKey を属性に渡してトレースしやすくします
  discard: (zoneKey) => <Discard zoneKey={zoneKey} />,
  energyDeck: (zoneKey) => <EnergyDeck zoneKey={zoneKey} />,
  energy: (zoneKey) => <Energy zoneKey={zoneKey} />,
  hand: (zoneKey) => <Hand zoneKey={zoneKey} />,
  live: (zoneKey) => <Live zoneKey={zoneKey} />,
  member: (zoneKey) => <Member zoneKey={zoneKey} />,
  successLive: (zoneKey) => <SuccessLive zoneKey={zoneKey} />,
};
