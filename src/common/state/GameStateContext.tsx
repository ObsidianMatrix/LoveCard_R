// React Context でゲーム状態を共有するための仕組みをまとめたファイルです。
// React の useContext/Provider を使うための import。JSX を扱うため React 名前空間を明示し、このファイルで Context を宣言する。
import React from "react";
// React/TypeScript の import 構文で GameState 型を取得する。コンテキスト値に正しい状態形を渡すため src/common/state/GameState から参照する。
import type { GameState } from "./GameState";
// React/TypeScript の import 構文で GameAction 型を取得する。dispatch が受け取るアクションの型安全性を確保するため src/common/state/actions から参照する。
import type { GameAction } from "./actions";

// コンテキストがどんな情報を持つかを表す型です。
type GameStateContextValue = {
  // 現在のゲーム全体の状態を保持します。
  state: GameState;
  // 状態を更新するための dispatch 関数を保持します。
  dispatch: React.Dispatch<GameAction>;
};

// 実際のコンテキストを作成します。初期値は undefined にして未提供を判定します。
const GameStateContext = React.createContext<GameStateContextValue | undefined>(undefined);

type GameStateProviderProps = {
  // ゲーム状態そのものを受け取ります。
  state: GameState;
  // reducer に渡す dispatch を受け取ります。
  dispatch: React.Dispatch<GameAction>;
  // 配下に表示する子要素を受け取ります。
  children: React.ReactNode;
};

// App などで状態を丸ごと配下に配布するラッパーコンポーネントです。
export function GameStateProvider(props: GameStateProviderProps) {
  // props から値を分けて、コンテキストに渡しやすくします。
  const { state, dispatch, children } = props;

  return <GameStateContext.Provider value={{ state, dispatch }}>{children}</GameStateContext.Provider>;
}

// コンテキストから状態と dispatch を取得するための専用フックです。
export function useGameState() {
  // 実際にコンテキストの中身を取り出します。
  const context = React.useContext(GameStateContext);

  // Provider が無いときに気づけるように例外を投げます。
  if (!context) {
    throw new Error("GameStateProvider がツリーに存在しません");
  }

  // 状態と dispatch をそのまま返却します。
  return context;
}
