import styles from "./UpdateMovie.module.scss"
import { useDispatch } from "react-redux";
import { useEffect, useState } from "@types/react";
import { useForm } from "react-hook-form";
import { updateMovie } from "../../actions";

export default function UpdateMovie(){
  const dispatch = useDispatch();
  const [isSuccess, setSuccess]=useState(false);
  const [ formFields, setFormFields ] = useState( [] );
  const { register, handleSubmit, setValue, getValues, formState: { errors, } } = useForm( {
    // resolver: yupResolver( schema ),
    mode: "onTouched",
  } );
  const [ error, setError ] = useState( {
    name: [],
    genre: [],
    description: [],
    actors: [],
    poster: [],

  } );
  const onError = (errors, e) => console.log( errors, e );

  useEffect( () => {
    setFormFields( [
      {
        type: "text",
        name: "name",
        placeholder: "Ирония судьбы",
        label: "Название фильма",
        required: true,
      },
      {
        type: "text",
        name: "genre",
        placeholder: "Comedy",
        label: "Жанр",
        required: true,
      },
      {
        type: "text",
        name: "description",
        placeholder: "Традиционный фильм для всей семьи на новый год",
        label: "Описание",
        required: true,
      },
      {
        type: "text",
        name: "actors",
        placeholder: "Андрей Мягков, Барбара Брыльска, Юрий Яковлев",
        label: "Актеры",
        required: true,
      },

    ] );
  }, [  ] );

  const onSubmit = async(data) => {

    const movieData = {
      
      name: data.name,
      genre: data.genre,
      description: data.description,
      actors: data.actors.split(","),
      poster: "/images/poster_any.png",
    };

    try {
      await updateMovie( id, movieData );
      setSuccess(true)
      setTimeout(()=>{
        setSuccess(false)
      },2000)
      // router.push( "/" );
      dispatch(updateMovie(movieData))

    } catch( err ) {
      console.error( err );
    }
  };

  return(

  )
}