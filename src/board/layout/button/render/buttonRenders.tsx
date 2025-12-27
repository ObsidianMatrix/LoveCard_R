import React from "react";
import { Back } from "../../../button/Back";
import { Phase } from "../../../button/Phase";
import { Initialize } from "../../../button/Initialize";
import { Import } from "../../../button/Import";
import { Statistics } from "../../../button/Statistics";
import type { ButtonKey } from "./buttons";

/**
 * buttonKey → 見た目（表示だけ）を返す
 * Zone の zoneRenderers と同じ役割
 */
export const buttonRenderers: Record<ButtonKey, (buttonKey: ButtonKey) => React.ReactNode> = {
  back: (buttonKey) => <Back buttonKey={buttonKey} />,
  phase: (buttonKey) => <Phase buttonKey={buttonKey} />,
  initialize: (buttonKey) => <Initialize buttonKey={buttonKey} />,
  import: (buttonKey) => <Import buttonKey={buttonKey} />,
  statistics: (buttonKey) => <Statistics buttonKey={buttonKey} />,
};
