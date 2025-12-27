import React from "react";

import { Deck } from "../Deck";
import { Discard } from "../Discard";
import { EnergyDeck } from "../EnergyDeck";
import { Energy } from "../Energy";
import { Hand } from "../Hand";
import { Live } from "../Live";
import { Member } from "../Member";
import { SuccessLive } from "../SuccessLive";

import type { ZoneKind } from "./zonesLayout";

/**
 * ZoneKind（枠の種類）→ 中身を返す関数 の対応表
 *
 * zoneKey は「識別子として渡すだけ」なので string で十分です。
 */
export const zoneRenderers: Record<ZoneKind, (zoneKey: string) => React.ReactNode> = {
  deck: (zoneKey) => <Deck zoneKey={zoneKey} />,
  discard: (zoneKey) => <Discard zoneKey={zoneKey} />,
  energyDeck: (zoneKey) => <EnergyDeck zoneKey={zoneKey} />,
  energy: (zoneKey) => <Energy zoneKey={zoneKey} />,
  hand: (zoneKey) => <Hand zoneKey={zoneKey} />,
  live: (zoneKey) => <Live zoneKey={zoneKey} />,
  member: (zoneKey) => <Member zoneKey={zoneKey} />,
  successLive: (zoneKey) => <SuccessLive zoneKey={zoneKey} />,
};
