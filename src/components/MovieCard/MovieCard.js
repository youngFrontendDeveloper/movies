import styles from "./MovieCard.module.scss";
import { Link } from "react-router-dom";
import StarIcon from "../StarIcon/StarIcon";
import Button from "../Button/Button";

// import { deleteMovie } from "../../actions";
// import { useDispatch, useSelector } from "react-redux";
// import { REQUEST_STATUS } from "../../constants/constants";
// import Loading from "../Loading/Loading";
// import { collection } from "firebase/firestore";
import { database } from "../../firebase/farebase";


export default function MovieCard({ movie }) {
  console.log(movie.id);
  // const isLoading = useSelector( (state) => state.movies.request.status === REQUEST_STATUS.LOADING );
  // const error = useSelector( (state) => state.movies.request.error );
  // const dispatch = useDispatch();

  const handleDelete = async() => {
    console.log("delete");
    await database.collection("movies").doc(movie.id).delete();

    // dispatch( deleteMovie( movie.id ) );
  };

  return (
    <>
      {
        // isLoading ? (
        //   <Loading />
        // ) : error ? (
        //   <>
        //     <p className="error">Ошибка загрузки: { error }</p>
        //   </>
        // ) : (
          <li className={ styles.movie } id={ movie.id } key={movie.id}>
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
                <Link to={ `/movie/change/${ movie.id }` } className={ styles[ "movie__change" ] }>Изменить</Link>
                <Button btnClass="btn--bg-red" func={ handleDelete } text="Удалить" />
              </div>

            </div>
          </li>
        // )
      }
    </>
  );
}