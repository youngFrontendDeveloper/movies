import styles from './SearchForm.module.scss';
import { useState } from 'react';
// import { searchMovie } from '../../actions';
// import { useDispatch, useSelector } from 'react-redux';
import FoundResult from '../FoundResult/FoundResult';
import Button from '../Button/Button';
import { useForm } from 'react-hook-form';

export default function SearchForm() {
  // const { movies } = useSelector((state) => state.movies);
  // const [nothingFound, setNothingFound] = useState(false);
  // const [isShowResults, setShowResults] = useState(false);
  // const dispatch = useDispatch();
  // const { foundMovies } = useSelector((state) => state.movies);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  const isShowResults = false;
  const foundMovies = [];
  const nothingFound = false;


  const onSubmit = async () => {
    // setShowResults(true);
    // const result = movies.filter((item) => {
    //   const value = getValues().search;
    //   return (
    //     item.name.toLowerCase().includes(value.toLowerCase()) ||
    //     item.description.toLowerCase().includes(value.toLowerCase()) ||
    //     item.genre.toLowerCase().includes(value.toLowerCase())
    //   );
    // });
    //
    // if (result.length === 0) {
    //   setNothingFound(true);
    //   dispatch(searchMovie(result));
    //   setValue('search', '');
    //   return;
    // }
    // console.log(result);
    // dispatch(searchMovie(result));
    //
    // setValue('search', '');
    console.log("submit");
  };

  return (
    <div className={styles['search-form__wrapper']}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['search-form']}>
        <div className={styles['search-form__item']}>
          <label htmlFor="name" className={styles['search-form__label']}>
            Поиск по названию или описанию фильма:
          </label>
          <input
            id="name"
            name="search"
            type="text"
            className={styles['search-form__input']}
            placeholder="Комедия"
            {...register('search', {
              required: 'Пожалуйста, введите не менее 3-x символов',
              minLength: {
                value: 3,
                message: 'Должно быть не менее 3-x символов',
              },
            })}
          />
        </div>
        {errors.search && (
          <p className={styles['search-form--error']}>
            {errors.search.message}
          </p>
        )}
        <Button text="Искать" />
      </form>
      {isShowResults && (
        <FoundResult foundMovies={foundMovies} nothingFound={nothingFound} />
      )}
    </div>
  );
}
