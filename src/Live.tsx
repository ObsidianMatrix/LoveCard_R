import styles from "./ZoneText.module.css";

type LiveProps = {
  /**
   * この枠を一意に表すキー（例: "live:left"）
   * 将来、カード状態を引くときに使います。
   */
  zoneKey: string;

  // 将来 cards: Card[] を追加予定
};

// ライブ領域の中身だけを担当します。
export function Live(props: LiveProps) {
  return (
    <div data-zone-key={props.zoneKey} className={styles.text}>
      ライブ
      <br />
      エリア
    </div>
  );
}
