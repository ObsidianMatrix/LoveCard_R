import React from "react";

import type { Orientation } from "../../grid/types";
import { buttonsLayout, type ButtonLayout } from "../model/buttonsLayout";

import { buttonRenderers } from "./buttonRenders";
import { buttonActions } from "../../../button/actions/buttonActions";

/**
 * ButtonLayout の buttonKey から union 型（"back" | ...）を作りたいので
 * ここでは ButtonKey を ButtonLayout 由来にします。
 */
export type ButtonKey = ButtonLayout["buttonKey"];

/**
 * slot の型も ButtonLayout 由来にする
 */
export type ButtonSlot = ButtonLayout["slot"];

/**
 * アプリが使う最終形（ZoneDef と同じ立ち位置）
 */
export type ButtonDef = {
  buttonKey: ButtonKey;

  // デバッグ表示用（必要なら）
  label: string;

  orientation: Orientation;
  anchors: ButtonLayout["anchors"];

  // ★追加：上/真ん中/下
  slot: ButtonSlot;

  // クリック・無効化
  disabled?: boolean;
  onClick?: () => void;

  // 中身（表示）は renderer が作る
  content: React.ReactNode;
};

/**
 * label は機械的に作る（Zone と同じノリ）
 */
function makeLabel(buttonKey: ButtonKey): string {
  return buttonKey;
}

/**
 * ButtonLayout から ButtonDef を作る
 * - label を作る
 * - content は buttonRenderers から作る（if を書かない）
 * - onClick は buttonActions から引く（表示と分ける）
 * - slot は layout からそのまま通す
 */
function materializeButton(layout: ButtonLayout): ButtonDef {
  const buttonKey: ButtonKey = layout.buttonKey;

  return {
    buttonKey,
    label: makeLabel(buttonKey),
    orientation: layout.orientation,
    anchors: layout.anchors,

    // ★追加
    slot: layout.slot,

    content: buttonRenderers[buttonKey](buttonKey),
    onClick: buttonActions[buttonKey],
  };
}

/**
 * 外に出すのは最終形（ButtonDef）
 */
export const buttons: ButtonDef[] = buttonsLayout.map(materializeButton);
