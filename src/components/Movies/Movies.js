import styles from "./Movies.module.scss";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import SearchForm from "../SearchForm/SearchForm";
import Loading from "../Loading/Loading";
import Button from "../Button/Button";
import { useGetMoviesQuery } from "../../services/moviesApi";


export default function Movies() {
  const { data, isLoading, isError, error, getMovies } = useGetMoviesQuery();

  useEffect( () => {
    isError && toast.error( error );
  }, [ isError ] );

  const requestMovies = () => {
    getMovies();
  };

  return (
    <section className={ styles.movies }>
      <h1 className="hidden">
        Тестовое задание на вакансию Frontend разработчик
      </h1>
      <h2 className={ `title ${ styles.movies__title }` }>Лучшие комедии для всей семьи</h2>
      <SearchForm />
      <Link to="/movie/add" className={ `link ${ styles[ "movies__link" ] }` }>
        Добавить новый фильм
      </Link>
      {
        isLoading ? (
          <Loading />
        ) : isError ? (
          <>
            <p className="error">Ошибка загрузки: { error } </p>
            <Button
              text="Перезагрузить"
              func={ requestMovies }
            />
          </>
        ) : (
          <ul className={ styles[ "movies__list" ] }>
            { data?.map( (item) => (
              <MovieCard movie={ item } key={ item.id } />
            ) ) }
          </ul>
        )
      }
    </section>
  );
}
