import type { ButtonKey } from "./buttons";

/**
 * buttonKey → 操作（クリック処理）を返す
 * 表示とは分けておくと、値や状態管理を差し替えやすい
 */
export const buttonActions: Record<ButtonKey, () => void> = {
  back: () => {
    console.log("action: back");
  },
  phase: () => {
    console.log("action: phase");
  },
  import: () => {
    console.log("action: import");
  },
  initialize: () => {
    console.log("action: initialize");
  },
  statistics: () => {
    console.log("action: statistics");
  },
};
