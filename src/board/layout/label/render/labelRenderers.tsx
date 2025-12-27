import React from "react";
import { Phase } from "../../../label/Phase";
import type { LabelKey } from "./labels";

// 仮：ここは後で状態管理（store）に差し替える想定
const currentPhaseTitle = "フェーズ進行：メイン";

export const labelRenderers: Record<LabelKey, (labelKey: LabelKey) => React.ReactNode> = {
  phaseLabel: (labelKey) => <Phase labelKey={labelKey} title={currentPhaseTitle} />,
};
