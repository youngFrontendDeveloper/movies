import styles from "./Movies.module.scss";

import { Link } from "react-router-dom";
import {  collection, getDocs } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { database } from "../../firebase/farebase";
import MovieCard from "../MovieCard/MovieCard";
import SearchForm from "../SearchForm/SearchForm";
import Loading from "../Loading/Loading";
import Button from "../Button/Button";
import { useEffect, useState } from "react";


export default function Movies() {
  const [value, setValue]= useState()

  useEffect(() => {
   async function f(){
     const querySnapshot = await getDocs(collection(database, "movies"));
     setValue(querySnapshot)
   }
   f()
  }, []);

  return (
    <section className={ styles.movies }>
      <h1 className="hidden">
        Тестовое задание на вакансию Frontend разработчик
      </h1>
      <h2 className={ `title ${ styles.movies__title }` }>Коллекция фильмов</h2>
      <SearchForm />
      <Link to="/movie/add" className={ `link ${ styles[ "movies__link" ] }` }>
        Добавить новый фильм
      </Link>
      {
        // loading ? (
        //   <Loading />
        // ) : !!error ? (
        //   <>
        //     <p className="error">Ошибка загрузки: {error} </p>
        //     <Button text="Перезагрузить"
        //             // func={requestMovies}
        //     />
        //   </>
        // ) : (
        <ul className={ styles[ "movies__list" ] }>
          {value?.docs.map((doc) => (
            <MovieCard movie={doc.data()} key={doc.id} />
          ))}
        </ul>
        // )
      }
    </section>
  );
}
