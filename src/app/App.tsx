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

// グリッド生成関数とカードサイズ計算関数をインポートする（../common/layout の createGrid / createCardSize）。
// 盤面を rows×cols の均等グリッドとして扱う計算と、向きごとのカード幅高さ計算を外部モジュールに委譲し、返却されたヘルパーをここで利用する。
import { createGrid, createCardSize } from "../common/layout";

// ゾーンの中心座標とサイズをアンカーポイントから計算する関数をインポートする（../board/layout/zone/zoneFromPoints）。
// 位置計算の詳細を分離し、App では算出された RectDef を枠コンポーネントに渡すのみとする。
import { zoneFromPoints } from "../board/layout/zone/zoneFromPoints";

// ボタンの中心座標とサイズをアンカーポイントから計算する関数をインポートする（../board/layout/button/buttonFromPoints）。
// ボタン配置ロジックを専用モジュールに委譲し、ここでは戻り値を ButtonFrame に渡す。
import { buttonFromPoints } from "../board/layout/button/buttonFromPoints";

// 盤面に配置するゾーンの定義配列をインポートする（../board/layout/zone/render/zones）。
// 各ゾーンのアンカーやラベル、コンテンツをまとめたデータをここで消費し、map で描画する。
import { zones } from "../board/layout/zone/render/zones";

// ボタン定義生成関数をインポートする（../board/layout/button/render/buttons の createButtons）。
// ボタン配置と見た目を生成する処理を外部に分離、App では actions を注入して得られた配列を描画する。
import { createButtons } from "../board/layout/button/render/buttons";

// ゾーンキー生成ヘルパーをインポートする（../board/layout/zone/model/zonesLayout の makeZoneKey）。
// ゾーン名から一貫したキーを作る処理をここに委譲し、状態参照や比較で使用する。
import { makeZoneKey } from "../board/layout/zone/model/zonesLayout";

// ボタン動作をまとめて生成する関数をインポートする（../board/button/actions/createButtonActions）。
// クリック時の処理組み立てを外部化し、App では依存関数を注入するだけで済むようにしている。
import { createButtonActions } from "../board/button/actions/createButtonActions";

// ファイル選択ダイアログを開く関数をインポートする（../board/button/actions/openJsonFile の openTextFile）。
// ブラウザ API を直接扱う処理を専用モジュールに閉じ込め、App では結果の文字列を受け取ってパースする。
import { openTextFile } from "../board/button/actions/openJsonFile";

// デッキ JSON をパースする関数をインポートする（../board/button/actions/parseDeckJson）。
// JSON 解析とバリデーションを専用モジュールに任せ、App では戻り値の deckName と countsByCardNumber を受け取り状態更新に使う。
import { parseDeckJson } from "../board/button/actions/parseDeckJson";

// ラベル定義配列をインポートする（../board/layout/label/render/labels）。
// ラベルの配置情報とコンテンツをデータ化しているため、App では map で描画するだけに留める。
import { labels } from "../board/layout/label/render/labels";

// ラベル枠コンポーネントをインポートする（../board/layout/label/ui/LabelFrame）。
// ラベルの見た目と位置決めを担当する UI コンポーネントを使用し、App から中心座標などを渡す。
import { LabelFrame } from "../board/layout/label/ui/LabelFrame";

// ラベルの位置とサイズをアンカーから計算する関数をインポートする（../board/layout/label/labelFromPoints）。
// 具体的な計算処理を外部化し、ここでは算出した RectDef を枠に渡す。
import { labelFromPoints } from "../board/layout/label/labelFromPoints";

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

  // createButtonActions（../board/button/actions/createButtonActions）を呼び出し、ボタンごとのクリック処理を組み立てる。
  // 引数には各ボタンの動作をアロー関数で渡す。戻り値は ButtonActions 辞書で、createButtons に注入する。
  const actions = createButtonActions({
    // onBack: 戻るボタンの処理。無引数アロー関数で console.log を実行する。クリック時に呼ばれ、"action: back" を出力する。
    onBack: () => {
      console.log("action: back");
    },
    // onPhase: フェーズ進行ボタンの処理。無引数アロー関数で "action: phase" をログに出す。
    onPhase: () => {
      console.log("action: phase");
    },

    // onImport: インポートボタンの処理。非同期アロー関数として宣言し、ファイル読み込みから状態更新まで行う。
    // async により Promise を返し、内部で await を使用できる。
    onImport: async () => {
      // openTextFile（../board/button/actions/openJsonFile）を呼び出し、JSON 拡張子のみ受け付けるファイル選択ダイアログを開く。
      // 引数 accept に ".json,application/json" を渡すことで許可する MIME/拡張子を指定する。戻り値は選択したファイルの文字列か null。
      const text = await openTextFile({ accept: ".json,application/json" });
      // if 文で text が falsy（null）の場合にログを出し、return で早期終了する。条件分岐は JavaScript の基本構文で、選択キャンセル時の処理を分ける。
      if (!text) {
        console.log("import: cancelled");
        return;
      }

      try {
        // parseDeckJson（../board/button/actions/parseDeckJson）を呼び出し、
        // JSON 文字列を解析して deckName と countsByCardNumber を取得する。
        // 戻り値は { deckName: string, countsByCardNumber: Record<string, number> } であり、直後の dispatch に利用する。
        const { deckName, countsByCardNumber } = parseDeckJson(text);

        // dispatch（useReducer が返す状態更新関数）を呼び出し、"IMPORT_DECK" アクションを送出する。
        // payload にパース結果を渡し、reducer 内で state を更新させる。オブジェクトリテラルは type と payload を持つ。
        dispatch({
          type: "IMPORT_DECK",
          payload: { deckName, countsByCardNumber },
        });

        // Object.values で countsByCardNumber の値配列を取得し、reduce（Array.prototype.reduce）で合計枚数を算出する。
        // reduce のコールバック (a, b) => a + b は累積加算を行い、初期値 0 を指定しないため最初の要素が初期値となる。
        // この合計を total としてログに出す。
        console.log("import: ok", {
          deckName,
          total: Object.values(countsByCardNumber).reduce((a, b) => a + b, 0),
        });
      } catch (e) {
        // try/catch 構文で例外処理を行う。parse や dispatch 中にエラーが発生した場合、catch ブロックでログ出力と alert を行う。
        console.error("import: failed", e);
        alert("デッキJSONの読み込みに失敗しました");
      }
    },

    // onInitialize: 初期化ボタンの処理。現在はログ出力のみで、将来的に dispatch を追加するためのプレースホルダー。
    onInitialize: () => {
      console.log("action: initialize");
      // 次の段階で、ここで「6枚ドロー」などを dispatch します。
    },

    // onStatistics: 統計ボタンの処理。state と deckZoneKey をクロージャとして参照し、デッキ名とデッキ枚数をログ出力する。
    onStatistics: () => {
      console.log("action: statistics");
      console.log("deckName:", state.deckName);
      console.log("deckCount:", state.zones[deckZoneKey].length);
    },
  });

  // createButtons（../board/layout/button/render/buttons）を呼び出し、ボタンの見た目とクリック処理を合成した配列を取得する。
  // actions 辞書を引数に渡し、戻り値の ButtonDef 配列を後続の map で描画する。
  const buttons = createButtons(actions);

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

        {/* zones 配列（../board/layout/zone/render/zones）の各要素を map（Array.prototype.map）で JSX に変換する。
            map のコールバックはアロー関数 (z) => {...} で、外側の grid や sizeByOrientation をクロージャとして参照する。
            React では配列をそのままレンダリング可能で、各要素に key を付与することで差分計算を安定させる。 */}
        {zones.map((z) => {
          // zoneFromPoints（../board/layout/zone/zoneFromPoints）を呼び出し、ゾーンのアンカーポイントから RectDef を計算する。
          // 引数 orientation: ゾーンの向き、points: アンカー配列、centerXOf/centerYOf: グリッド座標計算関数、stepX/stepY: 増分、sizeByOrientation: 向きごとのカードサイズ。
          // 戻り値 rect には centerX/centerY/width/height が入り、ZoneFrame/DeckZoneFrame の props に渡す。
          const rect = zoneFromPoints({
            orientation: z.orientation,
            points: z.anchors,
            centerXOf: grid.centerXOf,
            centerYOf: grid.centerYOf,
            stepX: grid.stepX,
            stepY: grid.stepY,
            sizeByOrientation,
          });

          // deck ゾーンのみ DeckZoneFrame を使って特別な見た目で描画する条件分岐。
          // if 文で z.zoneKey と deckZoneKey を比較し、一致時のみ DeckZoneFrame を返す。
          if (z.zoneKey === deckZoneKey) {
            return (
              // DeckZoneFrame（../board/layout/zone/ui/DeckZoneFrame）にゾーンの座標・サイズ・ラベル・カード枚数を渡して描画する。
              // key prop にはゾーンのユニークキー z.zoneKey を指定し、React のリストレンダリング要件を満たす。
              <DeckZoneFrame
                key={z.zoneKey}
                title={z.label}
                centerX={rect.centerX}
                centerY={rect.centerY}
                width={rect.width}
                height={rect.height}
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
              centerX={rect.centerX}
              centerY={rect.centerY}
              width={rect.width}
              height={rect.height}
              variant={z.variant}
            >
              {/* z.content（zones 定義内で設定された ReactNode）を children として描画し、ゾーン固有の表示を行う。 */}
              {z.content}
            </ZoneFrame>
          );
        })}

        {/* buttons 配列（createButtons の戻り値）を map で展開し、ButtonFrame を生成する。
            map のコールバック (b) => {...} は各ボタンのレイアウトやクリック処理をクロージャで参照しつつ JSX を返す。 */}
        {buttons.map((b) => {
          // buttonFromPoints（../board/layout/button/buttonFromPoints）を呼び出し、ボタンの位置とサイズを計算する。
          // 引数 orientation: ボタンの向き、points: アンカー、centerXOf/centerYOf: 座標計算関数、stepY: 縦方向増分、sizeByOrientation: カードサイズ辞書、heightRatio: 高さ比率、slot: 縦位置。
          // 戻り値 rect には centerX/centerY/width/height が含まれ、ButtonFrame へ渡す。
          const rect = buttonFromPoints({
            orientation: b.orientation,
            points: b.anchors,
            centerXOf: grid.centerXOf,
            centerYOf: grid.centerYOf,
            stepY: grid.stepY,
            sizeByOrientation,
            heightRatio: 0.25,
            slot: b.slot,
          });
          // ButtonFrame（../board/layout/button/ui/buttonFrame）を返し、計算した座標・サイズとクリック処理を渡す。
          // key はテンプレート文字列 `${b.buttonKey}:${b.slot}` でボタンキーとスロットを組み合わせ、一意性を確保する。
          return (
            <ButtonFrame
              key={`${b.buttonKey}:${b.slot}`}
              centerX={rect.centerX}
              centerY={rect.centerY}
              width={rect.width}
              height={rect.height}
              onClick={b.onClick}
            >
              {/* b.content は createButtons で生成されたボタン表示用 ReactNode を保持しており、ここで描画する。 */}
              {b.content}
            </ButtonFrame>
          );
        })}

        {/* labels 配列（../board/layout/label/render/labels）を map で展開し、ラベルの枠と内容を描画する。 */}
        {labels.map((l) => {
          // labelFromPoints（../board/layout/label/labelFromPoints）を呼び出し、ラベルの位置とサイズをアンカーから計算する。
          // 引数には orientation, anchors, centerXOf, centerYOf, stepX, stepY, sizeByOrientation, slot（段の指定）, heightRatio（高さ比率）, laneHeightRatio（列内の段間隔比率）を渡す。
          // 戻り値 rect を LabelFrame の props に利用する。
          const rect = labelFromPoints({
            orientation: l.orientation,
            points: l.anchors,
            centerXOf: grid.centerXOf,
            centerYOf: grid.centerYOf,
            stepX: grid.stepX,
            stepY: grid.stepY,
            sizeByOrientation,
            slot: l.slot,
            heightRatio: 1 / 6,
            laneHeightRatio: 0.25,
          });

          // LabelFrame（../board/layout/label/ui/LabelFrame）でラベル枠を描画する。zIndex を 10 に設定し、前面に表示する。
          return (
            <LabelFrame
              key={l.labelKey}
              centerX={rect.centerX}
              centerY={rect.centerY}
              width={rect.width}
              height={rect.height}
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
