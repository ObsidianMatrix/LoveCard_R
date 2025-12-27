import React from "react";

import type { Orientation } from "../../grid/types";
import { labelsLayout, type LabelLayout } from "../model/labelsLayout";
import { labelRenderers } from "./labelRenderers";

export type LabelKey = LabelLayout["labelKey"];
export type LabelSlot = LabelLayout["slot"];

export type LabelDef = {
  labelKey: LabelKey;
  label: string;

  orientation: Orientation;
  anchors: LabelLayout["anchors"];
  slot: LabelSlot;

  content: React.ReactNode;
};

function makeLabel(labelKey: LabelKey): string {
  return labelKey;
}

function materializeLabel(layout: LabelLayout): LabelDef {
  const labelKey: LabelKey = layout.labelKey;

  return {
    labelKey,
    label: makeLabel(labelKey),
    orientation: layout.orientation,
    anchors: layout.anchors,
    slot: layout.slot,
    content: labelRenderers[labelKey](labelKey),
  };
}

export const labels: LabelDef[] = labelsLayout.map(materializeLabel);
