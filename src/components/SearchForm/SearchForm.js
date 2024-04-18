import styles from "./SearchForm.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { collection, query, where, getDocs, or } from "firebase/firestore";
import FoundResult from "../FoundResult/FoundResult";
import Button from "../Button/Button";
import { database } from "../../firebase/farebase";


export default function SearchForm() {
  const [ foundMovies, setFoundMovies ] = useState( [] );
  const [ isShowResults, setShowResults ] = useState( false );
  const [ isNothingFound, setNothingFound ] = useState( false );
  const moviesRef = collection( database, "movies" );
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm( {
    mode: "onTouched",
  } );

  const onSubmit = async() => {
    const q = query(
      moviesRef,
      or( where( "name", "==", getValues().search ),
        where( "description", "==", getValues().search ),
        where( "genre", "==", getValues().search ),
        where( "actors", "array-contains", getValues().search ),
      )
    );

    const querySnapshot = await getDocs( q );
    const arr = [];
    querySnapshot.forEach( (doc) => {
      arr.push( { id: doc.id, ...doc.data() } );
      // console.log( doc.id, " => ", doc.data() );
    } );

    if( arr.length > 0 ) {
      setFoundMovies( [ ...arr ] );
    } else {
      setNothingFound( true );
    }

    setValue( "search", "" );
    setShowResults( true );
  };

  return (
    <div className={ styles[ "search-form__wrapper" ] }>
      <form onSubmit={ handleSubmit( onSubmit ) } className={ styles[ "search-form" ] }>
        <div className={ styles[ "search-form__item" ] }>
          <label htmlFor="name" className={ styles[ "search-form__label" ] }>
            Поиск по <span className={ styles[ "search-form__bold" ] }>точному и полному</span> названию, описанию,
            жанру, или актерам фильма:
          </label>
          <input
            id="name"
            name="search"
            type="text"
            className={ styles[ "search-form__input" ] }
            placeholder="Комедия"
            onChange={ (e) => {
              setValue( "search", e.target.value );
            } }
            { ...register( "search", {
              required: "Пожалуйста, введите не менее 3-x символов",
              minLength: {
                value: 3,
                message: "Должно быть не менее 3-x символов",
              },
            } ) }
          />
        </div>
        { errors.search && (
          <p className={ styles[ "search-form--error" ] }>
            { errors.search.message }
          </p>
        ) }
        <Button text="Искать" />
      </form>
      { isShowResults && (
        <FoundResult foundMovies={ foundMovies } isNothingFound={ isNothingFound } />
      ) }
    </div>
  );
}
