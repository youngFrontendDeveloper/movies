import styles from "./Close.module.scss"


export default function Close({onClick, width, height, clickClass}){
  return (
    <span className={`${styles["close"]} ${clickClass}`}>
      <img
        onClick={onClick}
        src="/images/close.svg"
        alt="Закрыть окно"
        width={width}
        height={height}
        className={styles["close__icon"]}
      />
    </span>
  )
}