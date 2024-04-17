import styles from "./MovieCard.module.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import StarIcon from "../StarIcon/StarIcon";
import Button from "../Button/Button";
import { useDeleteMovieMutation } from "../../services/moviesApi";


export default function MovieCard({ movie }) {
  const [ deleteMovie ] = useDeleteMovieMutation();

  const handleDelete = async() => {
    if( window.confirm( `Вы действительно хотите удалить фильм ${ movie.name }?` ) ) {
      const res = await deleteMovie( movie.id );

      if( res.data === "ok" ) {
        toast.info( `Фильм ${ movie.name } успешно удален` );
      }
    }
  };

  const handleClick = () => {
    toast.info( "Вы можете изменять только свои фильмы" );
  };

  return (
    <>
      {
        <li className={ styles.movie } id={ movie.id } key={ movie.id }>
          <div className={ styles[ "movie__img-block" ] }>
            <Link to={ `/movie/${ movie.id }` } className="link">
              <img src={ movie.poster } className={ styles.movie__img } alt={ movie.name } />
            </Link>
          </div>
          <div className={ styles[ "movie__text-block" ] }>
            <h3 className={ styles.movie__title }><span
              className={ styles.movie__span }
            >Название: </span> { movie.name }
            </h3>
            <p className={ styles.movie__description }><span
              className={ styles.movie__span }
            >Описание:</span> { movie.description }</p>
            <p>
              <span className={ styles.movie__span }>Рейтинг: </span>
              { movie.rating } <StarIcon />
            </p>

            <div className={ styles[ "movie__btn-wrap" ] }>
              { movie.canDelete ?
                <>
                  <Link to={ `/movie/change/${ movie.id }` } className={ styles[ "movie__change" ] }>Изменить</Link>
                  <Button btnClass="btn--bg-red" func={ handleDelete } text="Удалить" canDelete={ movie.canDelete } />
                </>
                :
                <>
                  <Button btnClass="btn--bg-green" text="Изменить" func={ handleClick } />
                  <Button btnClass="btn--bg-red" text="Удалить" func={ handleClick } />
                </>
              }
            </div>
          </div>
        </li>
      }
    </>
  );
}