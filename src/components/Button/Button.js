import styles from "./Button.module.scss";

export default function Button({ text, btnClass, func, progress, }) {

  return (
    <button
      className={ `${ styles.button } ${ styles[ btnClass ] }` }
      onClick={ func }
      disabled={ progress !== null && progress < 100 }

    >
      { text }
    </button>
  );
}