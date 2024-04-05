import styles from "./ChangeMovie.module.scss";
import { Link, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import Form from "../Form/Form";
// import { addDoc, collection, updateDoc } from "@firebase/firestore";
// import { db } from "../../firebase/firebase";
// import { useDispatch, useSelector } from "react-redux";
// import { addMovie, updateMovie } from "../../actions";

export default function ChangeMovie({ isNewFilm, }) {
  // const { movieId } = useParams();
  // const id = Number( movieId );
  // const [ movies, setMovies ] = useState( [] );
  // const MoviesCollectionRef = collection( db, "movies" );
  // const MovieRef = collection( db, "movies", movieId );
  // // const { movies } = useSelector( (state) => state.movies );
  // // const movie = movies.find( item => item.id === id );
  // // const dispatch = useDispatch();
  // const [ isSuccess, setSuccess ] = useState( false );
  // const [ formFields, setFormFields ] = useState( [] );
  // const { register, handleSubmit, formState: { errors, } } = useForm( {
  //   mode: "onTouched",
  // } );
  //
  // useEffect( () => {
  //   setFormFields( [
  //     {
  //       type: "text",
  //       name: "name",
  //       placeholder: "Ирония судьбы",
  //       label: "Название фильма",
  //       required: true,
  //       defaultValue: !isNewFilm ? movie?.name : null,
  //     },
  //     {
  //       type: "text",
  //       name: "genre",
  //       placeholder: "Comedy",
  //       label: "Жанр",
  //       required: true,
  //       defaultValue: !isNewFilm ? movie?.genre : null,
  //     },
  //     {
  //       type: "text",
  //       name: "description",
  //       placeholder: "Традиционный фильм для всей семьи на новый год",
  //       label: "Описание",
  //       required: true,
  //       defaultValue: !isNewFilm ? movie?.description : null,
  //     },
  //     {
  //       type: "text",
  //       name: "actors",
  //       placeholder: "Андрей Мягков, Барбара Брыльска, Юрий Яковлев",
  //       label: "Актеры",
  //       required: true,
  //       defaultValue: !isNewFilm ? movie?.actors.join() : null,
  //     },
  //
  //   ] );
  // }, [ isNewFilm, movie ] );

  const onSubmit = async(data) => {
    if( isNewFilm ) {
      const movieData = {
        id: new Date().getTime(),
        name: data.name,
        genre: data.genre,
        description: data.description,
        actors: data.actors.split( "," ),
        poster: "/images/poster_any.png",
      };

      // const CreateMovie = async() => {
      // await addDoc( MoviesCollectionRef, movieData );
      // window.location.reload();
      console.log( "ok" );
      // };
      // CreateMovie();
      // dispatch( addMovie( movieData ) );
      // setSuccess( true );
      // setTimeout( () => {
      //   setSuccess( false );
      // }, 2000 );

    } else {
      const movieData = {
        name: data.name,
        genre: data.genre,
        description: data.description,
        actors: data.actors.split( "," ),
      };
      console.log( "change" );
      try {
        // await updateDoc( MovieRef, movieData );

      } catch( err ) {
        console.log( err.message );
      }

      // dispatch( updateMovie( id, movieData ) );
      // setSuccess( true );
      // setTimeout( () => {
      //   setSuccess( false );
      // }, 2000 );
    }
  };


  return (
    <section className={ styles[ "add-movie" ] }>
      {
        isNewFilm ? <h2 className={ `title ${ styles[ "add-movie__title" ] }` }>Добавить новый фильм</h2>
          :
          <h2
            className={ `title ${ styles[ "add-movie__title" ] }` }
          >Изменить фильм</h2>
      }
      <Link to="/" className={ `link ${ styles[ "add-movie__link" ] }` }>Вернуться к списку фильмов</Link>
      {/*<Form*/}
      {/*  formFields={ formFields }*/}
      {/*  register={ register }*/}
      {/*  errors={ errors }*/}
      {/*  handleSubmit={ handleSubmit }*/}
      {/*  onSubmit={ onSubmit }*/}
      {/*  btnText="Отправить"*/}

      {/*/>*/}
      {
        // isNewFilm ?
        //   isSuccess &&
        //   <>
        //     <p>Фильм успешно добавлен</p>
        //     <p className={ styles[ "add-movie__comment" ] }>(Ищите его в конце списка)</p>
        //   </>
        //   :
        //   isSuccess && <p>Фильм успешно изменен</p>
      }
    </section>
  );
}