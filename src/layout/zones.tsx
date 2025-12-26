import React from "react";

import { Deck } from "../Deck";
import { Discard } from "../Discard";
import { EnergyDeck } from "../EnergyDeck";
import { LiveSuccess } from "../LiveSuccess";

import type { GridPoint, Orientation } from "./types";

/**
 * 盤面に置く枠の定義
 *
 * points:
 *   - 1点 → カード1枚分の枠
 *   - 複数点 → min〜max の範囲を囲む1つの枠
 *
 * orientation:
 *   - 枠の種類側が「縦/横」を決める
 */
export type ZoneDef = {
  id: string;
  title: string;
  orientation: Orientation;
  points: GridPoint[];
  variant: "dashed" | "solid";
  content: React.ReactNode;
};

/**
 * zones は「配置表」なので、計算ロジックは一切持たせません
 */
export const zones: ZoneDef[] = [
  {
    id: "deck",
    title: "deck",
    orientation: "portrait",
    points: [{ row: 0, col: 0 }],
    variant: "dashed",
    content: <Deck />,
  },

  {
    id: "discard-1",
    title: "discard",
    orientation: "portrait",
    points: [{ row: 1, col: 0 }],
    variant: "solid",
    content: <Discard />,
  },
  {
    id: "discard-2",
    title: "discard",
    orientation: "portrait",
    points: [{ row: 2, col: 0 }],
    variant: "solid",
    content: <Discard />,
  },

    {
    id: "discard-3",
    title: "discard",
    orientation: "landscape",
    points: [{ row: 0, col: 1 }],
    variant: "solid",
    content: <Discard />,
  },
    {
    id: "discard-3",
    title: "discard",
    orientation: "landscape",
    points: [{ row: 0, col: 2 }],
    variant: "solid",
    content: <Discard />,
  },
      {
    id: "discard-3",
    title: "discard",
    orientation: "landscape",
    points: [{ row: 0, col: 3 }],
    variant: "solid",
    content: <Discard />,
  },

      {
    id: "discard-3",
    title: "discard",
    orientation: "portrait",
    points: [{ row: 1, col: 1 }],
    variant: "solid",
    content: <Discard />,
  },
    {
    id: "discard-3",
    title: "discard",
    orientation: "portrait",
    points: [{ row: 1, col: 2 }],
    variant: "solid",
    content: <Discard />,
  },
      {
    id: "discard-3",
    title: "discard",
    orientation: "portrait",
    points: [{ row: 1, col: 3 }],
    variant: "solid",
    content: <Discard />,
  },
  {
    id: "energy-range",
    title: "energy",
    orientation: "landscape",
    points: [
      { row: 0, col: 4 },
      { row: 1, col: 4 },
    ],
    variant: "solid",
    content: <EnergyDeck />,
  },

  // (0,1)〜(0,4) を囲む横長の energy 枠
  {
    id: "discard-3",
    title: "discard-3",
    orientation: "portrait",
    points: [
      { row: 2, col: 1 },
      { row: 2, col: 3 },
    ],
    variant: "solid",
    content: <EnergyDeck />,
  },

  // 縦方向の範囲例
  {
    id: "success",
    title: "success",
    orientation: "portrait",
    points: [
      { row: 3, col: 0 },
      { row: 3, col: 3 },
    ],
    variant: "dashed",
    content: <LiveSuccess />,
  },
];
