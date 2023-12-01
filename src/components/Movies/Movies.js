import styles from "./Movies.module.scss";
import { useEffect, } from "react";
import MovieCard from "../MovieCard/MovieCard";
import SearchForm from "../SearchForm/SearchForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../../actions";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import Button from "../Button/Button";
import { REQUEST_STATUS } from "../../constants/constants";

export default function Movies() {
  const { movies } = useSelector( (state) => state.movies );
  const isLoading = useSelector( (state) => state.movies.request.status === REQUEST_STATUS.LOADING );
  const error = useSelector( (state) => state.movies.request.error );
  const dispatch = useDispatch();

  const requestMovies =async()=>{
    dispatch( getAllMovies() );
  }

  useEffect( () => {
    requestMovies()
  }, [  ] );

  return (
    <section className={ styles.movies }>
      <h1 className="hidden">Тестовое задание на вакансию Frontend разработчик</h1>
      <h2 className={ `title ${ styles.movies__title }` }>Коллекция фильмов</h2>
      <SearchForm />
      <Link to="/movie/add" className={ `link ${ styles[ "movies__link" ] }` }>
        Добавить новый фильм
      </Link>
      {
        isLoading ? (
          <Loading />
        ) :
          !!error ? (
          <>
            <p className="error">Ошибка загрузки: {error} </p>
            <Button  text="Перезагрузить" func={requestMovies}/>
          </>
        ) : (
          <ul className={ styles[ "movies__list" ] }>
            {
              movies.map( movie => <MovieCard movie={ movie } key={ movie.id } /> )
            }
          </ul>
        )
      }
    </section>
  );
}
