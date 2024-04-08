import styles from "./ChangeMovie.module.scss";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { database, storage } from "../../firebase/farebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import { toast } from "react-toastify";
import { useAddMovieMutation, useGetSingleMovieQuery, useUpdateMovieMutation } from "../../services/moviesApi";
import { skipToken } from "@reduxjs/toolkit/query";

const initialState = {
  id: new Date().getTime(),
  name: "",
  genre: "",
  description: "",
  actors: [],
  poster: "",
};
export default function ChangeMovie({ isNewFilm, }) {
  const { movieId } = useParams();
  const { data: movie } = useGetSingleMovieQuery( movieId ? movieId : skipToken );
  const [ fileName, setFileName ] = useState( "" );
  const [ file, setFile ] = useState( null );
  const [ progress, setProgress ] = useState( null );
  const [ formFields, setFormFields ] = useState( [] );
  const { register, handleSubmit, formState: { errors, } } = useForm( {
    mode: "onTouched",
  } );
  const [ addMovie ] = useAddMovieMutation();
  const [ updateMovie ] = useUpdateMovieMutation();
  const navigate = useNavigate();

  console.log( fileName );

  useEffect( () => {
    setFormFields( [
      {
        type: "text",
        name: "name",
        placeholder: "Ирония судьбы",
        label: "Название фильма",
        required: true,
        defaultValue: !isNewFilm ? movie?.name : null,
      },
      {
        type: "text",
        name: "genre",
        placeholder: "Comedy",
        label: "Жанр",
        required: true,
        defaultValue: !isNewFilm ? movie?.genre : null,
      },
      {
        type: "text",
        name: "description",
        placeholder: "Традиционный фильм для всей семьи на новый год",
        label: "Описание",
        required: true,
        defaultValue: !isNewFilm ? movie?.description : null,
      },
      {
        type: "text",
        name: "actors",
        placeholder: "Андрей Мягков, Барбара Брыльска, Юрий Яковлев",
        label: "Актеры",
        required: true,
        defaultValue: !isNewFilm ? movie?.actors.join() : null,
      },
      {
        type: "file",
        name: "file",
        placeholder: "Андрей Мягков, Барбара Брыльска, Юрий Яковлев",
        label: "Загрузите изображение",
        required: true,
      },

    ] );
  }, [ isNewFilm,
    movie
  ] );

  useEffect( () => {
    const uploadFile = () => {
      const storageRef = ref( storage, `/images/${ file.name }` );
      const uploadTask = uploadBytesResumable( storageRef, file, );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
          console.log( "Upload is " + progress + "% done" );
          setProgress( progress );
          switch( snapshot.state ) {
            case "paused":
              console.log( "Upload is paused" );
              break;
            case "running":
              console.log( "Upload is running" );
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log( error );
        },
        () => {
          getDownloadURL( uploadTask.snapshot.ref ).then( (downloadURL) => {
            console.log( downloadURL );
            toast.success( "Изображение успешно загружено!" );
            setFileName( downloadURL );
          } );
        }
      );
    };
    file && uploadFile();
  }, [ file, ] );

  const handleChangeImage = async(e) => {

    if( !e.target.files && !e.target.files[ 0 ] ) {
      return;
    }

    // Проверяем размер файла
    if( e.target.files[ 0 ]?.size > 5242880 ) {
      const size = ( e.target.files[ 0 ].size / 1048576 ).toFixed( 2 );
      toast.error( `Размер файла ${ size }Мб превышает 5Мб. Выберите другой файл` );
      e.target.value = "";
      setFile( null );
      return;
    }

    // Проверяем тип файла
    if( !e.target.files[ 0 ]?.type.match( /image.*/ ) && !e.target.files[ 0 ]?.name.toLowerCase().includes( ".heic" ) ) {
      toast.error( "Файл должен быть изображением" );
      e.target.value = "";
      setFile( null );
      return;
    }
    setFile( e.target.files[ 0 ] );
  };


  const onSubmit = async(data) => {
    if( isNewFilm ) {
      const movieData = {
        name: data.name,
        genre: data.genre,
        description: data.description,
        actors: data.actors.split( "," ),
        rating: 0,
        poster: fileName,
      };

      try {
        await addMovie( movieData );
        toast.success( "Новый фильм успешно создан" );
        navigate( "/" );
      } catch( e ) {
        console.error( "Error adding document: ", e );
      }

    } else {
      const movieData = {
        name: data.name,
        genre: data.genre,
        description: data.description,
        actors: data.actors.split( "," ),
        poster: fileName,
      };

      try {
        await updateMovie( { id: movieId, data: movieData } );
        toast.success( "Фильм успешно изменен" );
        navigate( "/" );

      } catch( err ) {
        console.log( err.message );
      }
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
      <Form
        formFields={ formFields }
        register={ register }
        errors={ errors }
        handleSubmit={ handleSubmit }
        onSubmit={ onSubmit }
        btnText="Отправить"
        progress={ progress }
        handleChangeImage={ handleChangeImage }
      />
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