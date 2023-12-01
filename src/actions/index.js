import { moviesUrl } from "../constants/constants";

export const getMoviesLoading = () => ( {
  type: "REQUEST_MOVIES_LOADING",
} );

export const getMoviesSuccess = (movies) => ( {
  type: "GET_MOVIES",
  payload: movies,
} );

export const addMovieSuccess = (movie) => {
  return {
    type: "ADD_MOVIE",
    payload: {
      "id": movie.id,
      "name": movie.name,
      "genre": movie.genre,
      "description": movie.description,
      "actors": movie.actors,
      "poster": movie.poster,
      "rating": movie.rating,
    }
  };
};

export const updateMovieSuccess = (id, movie) => {

  return {
    type: "UPDATE_MOVIE",
    payload: {
      name: movie.name,
      genre: movie.genre,
      description: movie.description,
      actors: movie.actors
    }
  };
};

export const deleteMoviesSuccess = (id) => {
  return {
    type: "DELETE_MOVIE",
    payload: id,
  };
};

export const searchMovie = (movies) => {
  return {
    type: "SEARCH_MOVIE",
    payload: movies,
  };
}

export const getMoviesFailure = (err) => ( {
  type: "REQUEST_MOVIES_FAILURE",
  payload: err,
} );

export const getAllMovies = () => async(dispatch) => {
  dispatch( getMoviesLoading() );

  try {
    const response = await fetch( moviesUrl );

    if( !response.ok ) {
      throw new Error( "При обращении к серверу возникла ошибка" );
    }

    const result = await response.json();

    dispatch( getMoviesSuccess( result ) );
  } catch( err ) {
    console.warn( err );
    dispatch( getMoviesFailure( err.message ) );
  }
};

export const addMovie = (data) => async(dispatch) => {
  dispatch( getMoviesLoading() );

  try {
    const response = await fetch( `${ moviesUrl }`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify( {
        id: data.id,
        name: data.name,
        genre: data.genre,
        description: data.description,
        actors: data.actors,
        poster: data.poster,
        rating: 0,
      } )
    } );

    if( !response.ok ) {
      throw new Error( "Произошла ошибка. Фильм не добавлен" );
    }

    const result = await response.json();

    dispatch( addMovieSuccess( result ) );

  } catch( err ) {
    console.log( err );
    dispatch( getMoviesFailure( err.message ) );
  }
};

export const updateMovie = (id, data) => async(dispatch) => {
  dispatch( getMoviesLoading() );

  try {
    const response = await fetch( `${ moviesUrl }/${ id }`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify( {
        name: data.name,
        genre: data.genre,
        description: data.description,
        actors: data.actors,
      } )
    } );

    if( !response.ok ) {
      throw new Error( "Произошла ошибка. Не удалось обновить фильм" );
    }

    const result = await response.json();

    dispatch( updateMovieSuccess( id, result ) );
  } catch( err ) {
    console.log( err );
    dispatch( getMoviesFailure( err.message ) );
  }
};

export const deleteMovie = (id) => async(dispatch) => {
  dispatch( getMoviesLoading() );

  try {
    const response = await fetch( `${ moviesUrl }/${ id }`, {
      method: "DELETE"
    } );

    if( !response.ok ) {
      throw new Error( "Произошла ошибка. Фильм не удален" );
    }

    const result = await response.json();
    console.log( result );
    dispatch( deleteMoviesSuccess( id ) );
  } catch( err ) {
  }
};
