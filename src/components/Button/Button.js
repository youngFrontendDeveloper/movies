import styles from "./Button.module.scss"

export default function Button({text, btnClass, func}){
  return(
    <button className={`${styles.button} ${styles[btnClass]}`} onClick={func}>
      {text}
    </button>
  )
}