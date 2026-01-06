// ファイル責務: ボタン配置定義（buttonsLayout）と見た目レンダラー（buttonRenderers）、
// クリック処理（actions）を合成し、App でそのまま描画できる ButtonDef 配列を生成する。
// レンダリングロジックとクリックロジックを分離し、ここで両者を束ねることで UI 生成を簡潔にする。

// React 名前空間をインポートし、JSX/ReactNode を扱えるようにする。
import React from "react";

// Orientation 型をインポートする。ボタンの向きを表し、カードサイズ参照の基準となる。
import type { Orientation } from "../../grid/types";
// ボタン配置定義と関連型をインポートする。
// buttonsLayout は配置データ、ButtonLayout はその型、ButtonKey はボタン識別子のユニオン型。
import { buttonsLayout, type ButtonLayout, type ButtonKey } from "../model/buttonsLayout";

// ボタンの見た目を生成するレンダラー辞書をインポートする。
// buttonRenderers は ButtonKey を受けて ReactNode を返す関数群。
import { buttonRenderers } from "./buttonRenders";
// クリック処理の辞書型をインポートする。ButtonActions は buttonKey をキーにアクション関数を保持する。
import type { ButtonActions } from "../../../button/actions/buttonActions";

/**
 * slot の型は ButtonLayout 由来にします。
 */
export type ButtonSlot = ButtonLayout["slot"];

/**
 * アプリが使う最終形（ZoneDef と同じ立ち位置）
 */
export type ButtonDef = {
  buttonKey: ButtonKey;

  // デバッグ表示用（必要なら）
  label: string;

  // どっち向きのカードサイズで置くか
  orientation: Orientation;

  // 置く場所（中心点にするためのアンカー）
  anchors: { row: number; col: number }[];

  // 上/真ん中/下（同じセルに複数ボタンを置くため）
  slot: ButtonSlot;

  // 中身（ボタンの見た目）
  content: React.ReactNode;

  // クリックした時の処理
  onClick: () => void;
};

/**
 * label は機械的に作ります（Zone と同じノリ）
 */
function makeLabel(buttonKey: ButtonKey): string {
  return buttonKey;
}

/**
 * ButtonLayout から ButtonDef を作ります。
 * - label を作る
 * - content は buttonRenderers から作る（if を書かない）
 * - onClick は外から渡された actions から引く（表示と分ける）
 * - slot は layout からそのまま通す
 */
function materializeButton(layout: ButtonLayout, actions: ButtonActions): ButtonDef {
  // layout.buttonKey は literal なので ButtonKey として扱います
  const buttonKey: ButtonKey = layout.buttonKey as ButtonKey;

  return {
    buttonKey,
    label: makeLabel(buttonKey),
    orientation: layout.orientation,
    anchors: layout.anchors,

    // ★追加
    slot: layout.slot,

    content: buttonRenderers[buttonKey](buttonKey),
    onClick: actions[buttonKey],
  };
}

/**
 * ボタン定義を作ります（表示＋クリック処理を合成）
 *
 * - render 側は「見た目の作成」だけに寄せたい
 * - クリック処理は App など上位から注入したい
 */
export function createButtons(actions: ButtonActions): ButtonDef[] {
  return buttonsLayout.map((layout) => materializeButton(layout, actions));
}
