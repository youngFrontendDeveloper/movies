import { Link, useParams } from "react-router-dom";
import styles from "./MoviePage.module.scss";
import { useCollectionOnce, useDocument } from "react-firebase-hooks/firestore";
import { useDocumentData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';



// import { useSelector } from "react-redux";
// import { REQUEST_STATUS } from "../../constants/constants";
// import Loading from "../Loading/Loading";

export default function MoviePage() {
  // const { movies } = useSelector( (state) => state.movies );
  // const isLoading = useSelector( (state) => state.movies.request.status === REQUEST_STATUS.LOADING );
  // const error = useSelector( (state) => state.movies.request.error );

  // const { movieId } = useParams();
  // const { movie, loading, error } = useDocumentData(
  //   firebase
  //     .firestore()
  //     .collection("movies")
  //     .doc(movieId)
  // );
  // const [movie, loading, error] = useCollectionOnce( );
  // const movie = movies.find( item => item.id === Number( movieId ) );
  // console.log(movie);
  return (
    <section>
      {
        // isLoading ? (
        //   <>
        //     <Link to="/" className={ `link ${ styles[ "movie-page__link" ] }` }>Вернуться к списку фильмов</Link>
        //     <Loading />
        //   </>
        // ) : error ? (
        //   <>
        //     <Link to="/" className={ `link ${ styles[ "movie-page__link" ] }` }>Вернуться к списку фильмов</Link>
        //     <p> Ошибка загрузки: { error }</p>
        //   </>
        // ) : (
          <>
            {/*<h1 className={ styles[ "movie-page__main-title" ] }>{ movie?.name }</h1>*/}
            {/*<Link to="/" className={ `link ${ styles[ "movie-page__link" ] }` }>Вернуться к списку фильмов</Link>*/}

            {/*<div className={ styles[ "movie-page" ] } id={ movie?.id }>*/}
            {/*  <div className={ styles[ "movie-page__img-block" ] }>*/}
            {/*    <img src={ movie?.poster } className={ styles[ "movie-page__img" ] } alt={ movie?.name } />*/}
            {/*  </div>*/}
            {/*  <div className={ styles[ "movie-page__text-block" ] }>*/}
            {/*    <h3 className={ styles[ "movie-page__title" ] }>*/}
            {/*      <span className={ styles[ "movie-page__span" ] }>Название: </span>*/}
            {/*      { movie?.name }*/}
            {/*    </h3>*/}
            {/*    <p className={ styles[ "movie-page__text" ] }>*/}
            {/*      <span className={ styles[ "movie-page__span" ] }>Описание: </span>*/}
            {/*      { movie?.description }*/}
            {/*    </p>*/}
            {/*    <p className={ styles[ "movie-page__text" ] }>*/}
            {/*      <span className={ styles[ "movie-page__span" ] }>Жанр: </span>*/}
            {/*      { movie?.genre }*/}
            {/*    </p>*/}
            {/*    <p className={ styles[ "movie-page__text" ] }>*/}
            {/*      <span className={ styles[ "movie-page__span" ] }>Актеры: </span>*/}
            {/*      { movie?.actors.map( item => `${ item }, ` ) }*/}
            {/*    </p>*/}
            {/*    <p className={ `${ styles[ "movie-page__text" ] }` }>*/}
            {/*      <span className={ styles[ "movie-page__span" ] }>Рейтинг: </span>*/}
            {/*      { movie?.rating }*/}
            {/*    </p>*/}

            {/*  </div>*/}
            {/*</div>*/}
          </>
        // )
      }


    </section>
  );
}