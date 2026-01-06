// ファイル責務: ボタンのレイアウト・見た目・動作を共通の型で表し、各ボタンフォルダが同じ契約で定義できるようにする。
// App で描画する最終的な ButtonDef もここで定義し、依存関係を注入してクリック処理を組み立てる基盤とする。

// JavaScript の仕様として、React 名前空間をインポートする。React.ReactNode や React.Dispatch 型を利用し、JSX 生成や dispatch 型の共通基盤とする。
import React from "react";
// JavaScript の仕様として、グリッド座標と向きの型をインポートする。ボタン配置がカードレイアウトと整合するよう、src/common/layout/grid/types から参照する。
import type { GridPoint, Orientation } from "../../../../common/layout/grid/types";
// JavaScript の仕様として、ボタンの縦方向スロット指定型をインポートする。buttonFromPoints（src/board/layout/button/buttonFromPoints）と合わせて段位置を共有する。
import type { ButtonSlot } from "../../../layout/button/buttonFromPoints";
// JavaScript の仕様として、ゲーム状態とアクション型をインポートする。click 時に dispatch で使うため src/common/state から GameState/GameAction を取得する。
import type { GameAction, GameState } from "../../../../common/state";

// ボタンクリックの戻り値型。Promise<void> も許容し、非同期処理（ファイル読込など）を行うボタンにも対応する。
export type ButtonAction = () => void | Promise<void>;

// ボタンの動作を組み立てる際に必要な依存物をまとめた型。
// state/dispatch は reducer 連携に、openTextFile/parseDeckJson は Import 処理に利用する。
export type ButtonActionDeps = {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  openTextFile: (options: { accept: string }) => Promise<string | null>;
  parseDeckJson: (text: string) => { deckName: string; countsByCardNumber: Record<string, number> };
};

// レイアウト定義の型。buttonKey は識別子、orientation/anchors/slot は配置計算に使用する。
export type ButtonLayout<TKey extends string = string> = {
  buttonKey: TKey;
  orientation: Orientation;
  anchors: GridPoint[];
  slot: ButtonSlot;
};

// 見た目を生成するレンダラーの型。buttonKey 文字列を受け取り ReactNode を返す。
export type ButtonRenderer = (buttonKey: string) => React.ReactNode;

// クリック処理を依存注入で生成するファクトリーの型。各ボタンフォルダで実装する。
export type ButtonActionFactory = (deps: ButtonActionDeps) => ButtonAction;

// レイアウト・見た目・動作を束ねた定義。_shared/index.ts で配列連結する単位とする。
export type ButtonDefinition<TKey extends string = string> = {
  layout: ButtonLayout<TKey>;
  render: ButtonRenderer;
  createAction: ButtonActionFactory;
};

// App が消費する最終的なボタン定義。content/onClick は materializeButton で生成する。
export type ButtonDef<TKey extends string = string> = {
  buttonKey: TKey;
  label: string;
  orientation: Orientation;
  anchors: GridPoint[];
  slot: ButtonSlot;
  content: React.ReactNode;
  onClick: ButtonAction;
};

// ボタンキーからラベル文字列を組み立てるヘルパー。現状はキーをそのまま返し、表示名変換の拡張余地を残す。
export function makeButtonLabel<TKey extends string>(buttonKey: TKey): string {
  return buttonKey;
}

// ButtonDefinition と依存物から ButtonDef を生成するヘルパー。
// レイアウト情報をそのまま通し、render と createAction を実行して content/onClick を確定させる。
export function materializeButton<TKey extends string>(definition: ButtonDefinition<TKey>, deps: ButtonActionDeps): ButtonDef<TKey> {
  const buttonKey = definition.layout.buttonKey;

  return {
    buttonKey,
    label: makeButtonLabel(buttonKey),
    orientation: definition.layout.orientation,
    anchors: definition.layout.anchors,
    slot: definition.layout.slot,
    content: definition.render(buttonKey),
    onClick: definition.createAction(deps),
  };
}
