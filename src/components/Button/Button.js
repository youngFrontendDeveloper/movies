import styles from "./Button.module.scss";

export default function Button({ text, btnClass, func, progress, canDelete }) {

  return (
    <button
      className={ `${ styles.button } ${ styles[ btnClass ] }` }
      onClick={ func }
      disabled={ progress !== null && progress < 100 }
      // disabled={ canDelete }

    >
      { text }
    </button>
  );
}