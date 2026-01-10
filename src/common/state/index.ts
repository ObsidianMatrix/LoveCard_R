// ファイル責務: 状態管理モジュールのエントリーポイントとして、型・Context・reducer・セレクターをまとめて再エクスポートする。
// React/TypeScript の export 構文で散在する state 関連の機能を統一し、利用側の import 経路を簡潔にする。
// GameState とカード関連の型を再エクスポートする。盤面状態の構造定義を src/common/state/GameState から公開し、UI とロジック間で共有する。
export type { GameState, CardId, Card } from "./GameState";
// GameAction と ImportDeckPayload を再エクスポートする。dispatch が受け取るアクション仕様を src/common/state/actions から提供する。
export type { GameAction, ImportDeckPayload } from "./actions";
// ゲーム状態の初期化関数を再エクスポートする。初回レンダリングやリセットで使う createInitialGameState を src/common/state/createInitialGameState から提供する。
export { createInitialGameState } from "./createInitialGameState";
// reducer 本体を再エクスポートする。状態遷移を司る gameReducer を src/common/state/reducer から公開し、useReducer で利用できるようにする。
export { gameReducer } from "./reducer";
// Context プロバイダとカスタムフックを再エクスポートする。GameStateProvider/useGameState を src/common/state/GameStateContext から公開し、状態をツリーへ配布する。
export { GameStateProvider, useGameState } from "./GameStateContext";
// セレクターを再エクスポートする。状態からゾーン内カードを取り出す selectCardIdsInZone/selectCardsInZone を src/common/state/selectors から提供する。
export { selectCardIdsInZone, selectCardsInZone } from "./selectors";
// ID 生成ヘルパーを再エクスポートする。カード固有IDを作る createId を src/common/state/id から公開し、state 更新ロジックで再利用する。
export { createId } from "./id";
