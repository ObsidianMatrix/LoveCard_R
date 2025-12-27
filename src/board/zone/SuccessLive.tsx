import styles from "../ui/text.module.css";

type SuccessLiveProps = {
  /**
   * この枠を一意に表すキー（例: "SuccessLive:right"）
   * 将来、カード状態を引くときに使います。
   */
  zoneKey: string;

  // 将来 cards: Card[] を追加予定
};

// メンバー領域の中身だけを担当します。
export function SuccessLive(props: SuccessLiveProps) {
  return (
    <div data-zone-key={props.zoneKey} className={styles.text}>
      ライブ成功
      <br />
      エリア
    </div>
  );
}