import styles from "./MoviePage.module.scss";
import { Link, useParams } from "react-router-dom";
import { useGetSingleMovieQuery } from "../../services/moviesApi";
import Loading from "../Loading/Loading";


export default function MoviePage() {
  const { movieId } = useParams();
  const { data: movie, isLoading, isError, error } = useGetSingleMovieQuery( movieId );

  return (
    <section>
      {
        isLoading ? (
          <>
            <Link to="/" className={ `link ${ styles[ "movie-page__link" ] }` }>Вернуться к списку фильмов</Link>
            <Loading />
          </>
        ) : isError ? (
          <>
            <Link to="/" className={ `link ${ styles[ "movie-page__link" ] }` }>Вернуться к списку фильмов</Link>
            <p> Ошибка загрузки: { error }</p>
          </>
        ) : (
          <>
            <h1 className={ styles[ "movie-page__main-title" ] }>{ movie?.name }</h1>
            <Link to="/" className={ `link ${ styles[ "movie-page__link" ] }` }>Вернуться к списку фильмов</Link>

            <div className={ styles[ "movie-page" ] } id={ movie?.id }>
              <div className={ styles[ "movie-page__img-block" ] }>
                <img src={ movie?.poster } className={ styles[ "movie-page__img" ] } alt={ movie?.name } />
              </div>
              <div className={ styles[ "movie-page__text-block" ] }>
                <h3 className={ styles[ "movie-page__title" ] }>
                  <span className={ styles[ "movie-page__span" ] }>Название: </span>
                  { movie?.name }
                </h3>
                <p className={ styles[ "movie-page__text" ] }>
                  <span className={ styles[ "movie-page__span" ] }>Описание: </span>
                  { movie?.description }
                </p>
                <p className={ styles[ "movie-page__text" ] }>
                  <span className={ styles[ "movie-page__span" ] }>Жанр: </span>
                  { movie?.genre }
                </p>
                <p className={ styles[ "movie-page__text" ] }>
                  <span className={ styles[ "movie-page__span" ] }>Актеры: </span>
                  { movie?.actors.map( item => `${ item }, ` ) }
                </p>
                <p className={ `${ styles[ "movie-page__text" ] }` }>
                  <span className={ styles[ "movie-page__span" ] }>Рейтинг: </span>
                  { movie?.rating }
                </p>

              </div>
            </div>
          </>
        )
      }

    </section>
  );
}