import styles from "./SearchForm.module.scss";
import { useState } from "react";
import { searchMovie } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import FoundResult from "../FoundResult/FoundResult";
import Button from "../Button/Button";

export default function SearchForm() {
  const { movies } = useSelector( (state) => state.movies );
  const [ value, setValue ] = useState( "" );
  const [ nothingFound, setNothingFound ] = useState( false );
  const [ isShowResults, setShowResults ] = useState( false );
  const dispatch = useDispatch();
  const { foundMovies } = useSelector( state => state.movies );

  const handleSubmit = async(e) => {
    e.preventDefault();

    setShowResults( true );
    const result = movies.filter( item => {
      return item.name.toLowerCase().includes( value.toLowerCase() ) || item.description.toLowerCase().includes( value.toLowerCase() ) || item.genre.toLowerCase().includes( value.toLowerCase() );
    } );

    if( result.length === 0 ) {
      setNothingFound( true );
      return;
    }

    console.log( result );
    dispatch( searchMovie( result ) );

    setValue( "" );
  };

  return (
    <div className={ styles[ "search-form__wrapper" ] }>
      <form onSubmit={ handleSubmit } className={ styles[ "search-form" ] }>
        <div className={ styles[ "search-form__item" ] }>
          <label htmlFor="name" className={ styles[ "search-form__label" ] }>Поиск по названию, описанию, жанру
            фильма:</label>
          <input
            id="name" type="text" value={ value } onChange={ (e) => setValue( e.target.value ) } required={ true }
            className={ styles[ "search-form__input" ] }
            placeholder="Комедия"
          />
        </div>
        <Button text="Искать" />
      </form>
      {
        isShowResults && <FoundResult foundMovies={ foundMovies } nothingFound={ nothingFound } />
      }
    </div>
  );
}