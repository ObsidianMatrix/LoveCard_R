// ファイル全体の責務: アプリケーションのルートコンポーネントとして、盤面レイアウト・状態管理・ボタン/ラベル/ゾーン描画を統合する。
// ここでは UI 構造を組み立て、具体的なレイアウト計算や描画は各専用モジュールに委譲する。状態管理は useReducer と Context で全体に配布する。

// React ライブラリをインポートする。JSX を解釈するために必要であり、React.useReducer などのフックを使用するため名前空間として読み込む。
import React from "react";

// 盤面全体の土台となる Stage コンポーネントをインポートする（../board/stage/Stage）。
// 画面の基準位置を提供し、子要素を重ねて配置する役割を担うため、このファイルでレイアウトの最上位に配置する。
import { Stage } from "../board/stage/Stage";

// 一般的なゾーン表示用の枠コンポーネントをインポートする（../board/layout/zone/ui/zoneFrame）。
// 各ゾーンのタイトルや枠装飾を表示し、配置された content を包む責務を外部に委譲している。
import { ZoneFrame } from "../board/layout/zone/ui/zoneFrame";

// デッキ専用の見た目を持つゾーン枠コンポーネントをインポートする（../board/layout/zone/ui/DeckZoneFrame）。
// デッキ枚数表示など特別な UI を提供するため、deck のときだけこちらを利用する。
import { DeckZoneFrame } from "../board/layout/zone/ui/DeckZoneFrame";

// ボタン枠コンポーネントをインポートする（../board/layout/button/ui/buttonFrame）。
// ボタンのクリック領域と見た目を統一する役割を持ち、App から渡された onClick を実行する。
import { ButtonFrame } from "../board/layout/button/ui/buttonFrame";

// ラベル枠コンポーネントをインポートする（../board/layout/label/ui/LabelFrame）。
// ラベルの見た目と位置決めを担当する UI コンポーネントを使用し、App から中心座標などを渡す。
import { LabelFrame } from "../board/layout/label/ui/LabelFrame";

// グリッド生成関数とカードサイズ計算関数をインポートする（../common/layout の createGrid / createCardSize）。
// 盤面を rows×cols の均等グリッドとして扱う計算と、向きごとのカード幅高さ計算を外部モジュールに委譲し、返却されたヘルパーをここで利用する。
import { createGrid, createCardSize } from "../common/layout";

// 組み立て済みのゾーン/ボタン/ラベル配列を生成するユーティリティをインポートする（../elements/common）。
// 座標計算を elements/common 側で完結させ、App は rect 付きの配列を描画するだけに責務を縮小するため、この新しい入口を利用する。
import { assembleButtons, assembleLabels, assembleZones, makeZoneKey } from "../elements/common";

// ファイル選択ダイアログを開く関数をインポートする（../board/button/actions/openJsonFile の openTextFile）。
// ブラウザ API を直接扱う処理を専用モジュールに閉じ込め、App では結果の文字列を受け取ってパースする。
import { openTextFile } from "../board/button/actions/openJsonFile";

// デッキ JSON をパースする関数をインポートする（../board/button/actions/parseDeckJson）。
// JSON 解析とバリデーションを専用モジュールに任せ、App では戻り値の deckName と countsByCardNumber を受け取り状態更新に使う。
import { parseDeckJson } from "../board/button/actions/parseDeckJson";

// ゲーム初期状態生成・reducer・Context・セレクターをまとめてインポートする（../common/state）。
// 状態初期化ロジックと状態遷移、Context 配布、ゾーン内カード取得をそれぞれ専用モジュールに委譲し、App は useReducer と描画の統合に集中する。
import { createInitialGameState, gameReducer, GameStateProvider, selectCardIdsInZone } from "../common/state";

// デッキゾーンの表示コンポーネントをインポートする（../board/zone/Deck）。
// ゾーン内のカード表示責務を Deck コンポーネントに委譲し、App は zoneKey を渡すのみとする。
import { Deck } from "../board/zone/Deck";

// デッキゾーンのキーを定数化する。makeZoneKey("deck") を使い、状態やイアウトで一貫したキーを共有する。
// ここで作成しておくことで複数箇所で同じキーを参照でき、タイポ防止と変更箇所の集中管理を実現する。
const deckZoneKey = makeZoneKey("deck");

// App コンポーネント本体。React の関数コンポーネントとしてエクスポートし、main.tsx で描画されるルートとなる。
export default function App() {
  // createGrid（../common/layout）を呼び出してグリッド計算用オブジェクトを生成する。
  // 引数 rows:4, cols:5 は盤面を 4 行 5 列の分割で扱うことを指定し、戻り値には centerXOf/centerYOf などの座標計算関数が含まれる。
  const grid = createGrid({ rows: 4, cols: 5 });

  // createCardSize（../common/layout）を呼び出し、カードの縦横サイズ情報を取得する。
  // 戻り値の sizeByOrientation 関数を取り出し、向きごとに幅高さを取得できるようにする。
  const card = createCardSize();
  const sizeByOrientation = card.sizeByOrientation;

  // React.useReducer（React の標準フック）でゲーム状態と dispatch 関数を作成する。
  // 第1引数 gameReducer（../common/state）、
  // 第2引数は初期値 undefined、
  // 第3引数で初期化関数 createInitialGameState を渡し、初回レンダリング時に初期状態を構築する。
  const [state, dispatch] = React.useReducer(gameReducer, undefined, () => createInitialGameState());

  // assembleZones（../elements/common）を呼び出し、ゾーン定義に座標情報を合成した配列を取得する。
  // grid と sizeByOrientation を渡し、App 側は rect 付きのデータを受け取って描画するだけに責務を絞る。
  const zones = assembleZones({ grid, sizeByOrientation });

  // createButtons による依存注入と buttonFromPoints をまとめた assembleButtons（../elements/common）を呼び出す。
  // state/dispatch/openTextFile/parseDeckJson を渡し、grid/sizeByOrientation と併せてボタンの rect を計算済みで受け取る。
  const buttons = assembleButtons({
    grid,
    sizeByOrientation,
    deps: {
      state,
      dispatch,
      openTextFile,
      parseDeckJson,
    },
  });

  // assembleLabels（../elements/common）を呼び出し、ラベル定義に座標情報を付与した配列を取得する。
  // grid/sizeByOrientation を渡して labelFromPoints を内部適用し、App では LabelFrame への受け渡しだけで表示が完結するようにする。
  const labels = assembleLabels({ grid, sizeByOrientation });

  // selectCardIdsInZone（../common/state）で deck ゾーンに含まれるカード ID 配列を取得する。
  // 引数 state は現在のゲーム状態、deckZoneKey は "deck" ゾーンのキー。戻り値を deckCardIds として保持し、長さを計算する。
  const deckCardIds = selectCardIdsInZone(state, deckZoneKey);
  // 配列 length プロパティでデッキの総枚数を取得する。再利用するため deckCardCount として定数化し、UI 表示や DeckZoneFrame へ渡す。
  const deckCardCount = deckCardIds.length;

  // JSX を返す。GameStateProvider で全体をラップし、Stage 内にゾーン・ボタン・ラベルを配置する。
  return (
    // GameStateProvider（../common/state）に state と dispatch を渡し、Context を通じて子孫コンポーネントに提供する。
    <GameStateProvider state={state} dispatch={dispatch}>
      {/* Stage コンポーネントで盤面の土台を作る。children としてゾーンやボタンが配置され、絶対位置指定が Stage を基準とする。 */}
      <Stage>
        {/* 画面左上にデバッグ情報を表示する div。style プロパティにオブジェクトリテラルで CSS を設定し、position: absolute で固定表示する。 */}
        <div style={{ position: "absolute", top: 8, left: 8, fontSize: 12, color: "#666" }}>
          {/* <p> 要素で環境名や状態値を表示する。
          state.deckName ?? "-" は null 合体演算子で deckName が null/undefined の場合に "-" を表示する。 */}
          <p>Vite + React + TypeScript</p>
          <p>deckName: {state.deckName ?? "-"}</p>
          <p>deckCount: {deckCardCount}</p>
        </div>

        {/* zones 配列（assembleZones の戻り値）の各要素を map（Array.prototype.map）で JSX に変換する。
            zoneFromPoints で計算済みの rect を含むため、App 側は枠コンポーネントに値を渡すだけで描画が完結する。 */}
        {zones.map((z) => {
          // deck ゾーンのみ DeckZoneFrame を使って特別な見た目で描画する条件分岐。
          // if 文で z.zoneKey と deckZoneKey を比較し、一致時のみ DeckZoneFrame を返す。
          if (z.zoneKey === deckZoneKey) {
            return (
              // DeckZoneFrame（../board/layout/zone/ui/DeckZoneFrame）にゾーンの座標・サイズ・ラベル・カード枚数を渡して描画する。
              // key prop にはゾーンのユニークキー z.zoneKey を指定し、React のリストレンダリング要件を満たす。
              <DeckZoneFrame
                key={z.zoneKey}
                title={z.label}
                centerX={z.rect.centerX}
                centerY={z.rect.centerY}
                width={z.rect.width}
                height={z.rect.height}
                variant={z.variant}
                cardCount={deckCardCount}
              >
                {/* Deck コンポーネント（../board/zone/Deck）を子要素として配置し、zoneKey を渡して対象ゾーンのカードを表示させる。 */}
                <Deck zoneKey={z.zoneKey} />
              </DeckZoneFrame>
            );
          }

          // deck 以外のゾーンは共通の ZoneFrame で描画する。上記と同様に座標・サイズ・ラベルを props として渡し、content を children に渡す。
          return (
            <ZoneFrame
              key={z.zoneKey}
              title={z.label}
              centerX={z.rect.centerX}
              centerY={z.rect.centerY}
              width={z.rect.width}
              height={z.rect.height}
              variant={z.variant}
            >
              {/* z.content（zones 定義内で設定された ReactNode）を children として描画し、ゾーン固有の表示を行う。 */}
              {z.content}
            </ZoneFrame>
          );
        })}

        {/* buttons 配列（assembleButtons の戻り値）を map で展開し、ButtonFrame を生成する。
            buttonFromPoints で計算済みの rect を含むため、App では props を渡すだけでクリック領域と表示が描画される。 */}
        {buttons.map((b) => {
          // ButtonFrame（../board/layout/button/ui/buttonFrame）を返し、assembleButtons で付与済みの rect とクリック処理を渡す。
          // key はテンプレート文字列 `${b.buttonKey}:${b.slot}` でボタンキーとスロットを組み合わせ、一意性を確保する。
          return (
            <ButtonFrame
              key={`${b.buttonKey}:${b.slot}`}
              centerX={b.rect.centerX}
              centerY={b.rect.centerY}
              width={b.rect.width}
              height={b.rect.height}
              onClick={b.onClick}
            >
              {/* b.content は createButtons で生成されたボタン表示用 ReactNode を保持しており、ここで描画する。 */}
              {b.content}
            </ButtonFrame>
          );
        })}

        {/* labels 配列（assembleLabels の戻り値）を map で展開し、ラベルの枠と内容を描画する。 */}
        {labels.map((l) => {
          // LabelFrame（../board/layout/label/ui/LabelFrame）でラベル枠を描画する。zIndex を 10 に設定し、前面に表示する。
          return (
            <LabelFrame
              key={l.labelKey}
              centerX={l.rect.centerX}
              centerY={l.rect.centerY}
              width={l.rect.width}
              height={l.rect.height}
              zIndex={10}
            >
              {/* l.content はラベルの実際の表示内容（テキストやアイコン）で、children として描画される。 */}
              {l.content}
            </LabelFrame>
          );
        })}
      </Stage>
    </GameStateProvider>
  );
}
