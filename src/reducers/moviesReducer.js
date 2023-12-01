import { REQUEST_STATUS } from "../constants/constants";

const initialState = {
  movies: [],
  foundMovies: [],
  request: {
    status: REQUEST_STATUS.IDLE,
    error: "",
  },
};

const moviesReducer = (state = initialState, action) => {
  switch( action.type ) {

    case "REQUEST_MOVIES_LOADING":
      return {
        ...state,
        request: {
          ...state.request,
          status: REQUEST_STATUS.LOADING,
        }
      };

    case "GET_MOVIES":
      return {
        ...state,
        movies: action.payload,
        request: {
          error: "",
          status: REQUEST_STATUS.SUCCESS,
        },
      };

    case "SEARCH_MOVIE":
      return {
        ...state,
        foundMovies: action.payload,
        request: {
          error: "",
          status: REQUEST_STATUS.SUCCESS,
        },
      };

    case "ADD_MOVIE":
      return {
        ...state,
        movies: [ ...state.movies, action.payload ],
        request: {
          error: "",
          status: REQUEST_STATUS.SUCCESS,
        },
      };

    case "UPDATE_MOVIE":
      return {
        ...state,
        movies: [ ...state.movies, action.payload ],
        request: {
          error: "",
          status: REQUEST_STATUS.SUCCESS,
        },
      };

    case "DELETE_MOVIE":
      return {
        ...state,
        movies: state.movies.filter( movie => movie.id !== action.payload ),
        request: {
          error: "",
          status: REQUEST_STATUS.SUCCESS,
        },
      };

    case "REQUEST_MOVIES_FAILURE":
      return {
        ...state,
        request: {
          error: action.payload,
          status: REQUEST_STATUS.FAILURE,
        },
      };

    default:
      return state;
  }
};

export default moviesReducer;