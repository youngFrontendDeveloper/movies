import styles from "./Loading.module.scss";

export default function Loading() {
  return (
    <div className={ styles[ "loading" ] }>
      <img src="/images/loading.svg" width={ 64 } height={ 64 } alt="Идет загрузка" />
    </div>
  );
}