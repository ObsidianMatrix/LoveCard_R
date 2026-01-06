// ファイル責務: 各ゾーンフォルダで定義した ZoneDef 配列を連結し、App から参照する最終的な zones/zoneKeys を公開する。
// また、キー生成ユーティリティや型もここから再エクスポートし、利用側が参照元を統一できるようにする。

// JavaScript の仕様として、ZoneDef 型を import する。zones 配列の型注釈に用いるため src/board/elements/zones/_shared/types から取得する。
import type { ZoneDef } from "./types";
// 自作のデッキゾーン定義配列をインポートする。src/board/elements/zones/deck が返す deckZones を結合対象として利用する。
import { deckZones } from "../deck";
// 自作の捨て札ゾーン定義配列をインポートする。src/board/elements/zones/discard の discardZones を結合する。
import { discardZones } from "../discard";
// 自作のエネルギーデッキゾーン定義配列をインポートする。src/board/elements/zones/energyDeck の energyDeckZones を結合する。
import { energyDeckZones } from "../energyDeck";
// 自作のライブゾーン定義配列をインポートする。src/board/elements/zones/live の liveZones を結合する。
import { liveZones } from "../live";
// 自作のメンバーゾーン定義配列をインポートする。src/board/elements/zones/member の memberZones を結合する。
import { memberZones } from "../member";
// 自作の成功ライブゾーン定義配列をインポートする。src/board/elements/zones/successLive の successLiveZones を結合する。
import { successLiveZones } from "../successLive";
// 自作のエネルギーゾーン定義配列をインポートする。src/board/elements/zones/energy の energyZones を結合する。
import { energyZones } from "../energy";
// 自作の手札ゾーン定義配列をインポートする。src/board/elements/zones/hand の handZones を結合する。
import { handZones } from "../hand";
// JavaScript の仕様として、キー生成ユーティリティと型を再エクスポートするために import する。makeZoneKey/normalizeZoneSlot/zoneKeyFromLayout などを src/board/elements/zones/_shared/types から取得する。
import {
  makeZoneKey,
  makeZoneLabel,
  normalizeZoneSlot,
  zoneKeyFromLayout,
  type ZoneKey,
  type ZoneKind,
  type ZoneSlot,
  type ZoneLayout,
  type ZoneRenderer,
} from "./types";

// zones は各ゾーン配列を定義順に連結した最終形。App ではこの配列を map するだけで全ゾーンを描画できる。
export const zones: ZoneDef[] = [
  ...deckZones,
  ...discardZones,
  ...energyDeckZones,
  ...liveZones,
  ...memberZones,
  ...successLiveZones,
  ...energyZones,
  ...handZones,
];

// zoneKeys は zones 配列から zoneKey だけを抜き出した一覧。状態初期化などで全ゾーンのキーを取得する際に利用する。
export const zoneKeys = zones.map((z) => z.zoneKey);

// 再エクスポート: 他のモジュールがキー生成や型を参照しやすいように、このファイルからまとめて提供する。
export {
  makeZoneKey,
  makeZoneLabel,
  normalizeZoneSlot,
  zoneKeyFromLayout,
  type ZoneKey,
  type ZoneKind,
  type ZoneSlot,
  type ZoneLayout,
  type ZoneRenderer,
  type ZoneDef,
};
