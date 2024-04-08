import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};


const moviesSlice = createSlice( {
  name: "movies",
  initialState,
  reducers: {
    setMovies(state, action) {
      state.movies = action.payload;
    },
    removeMovie(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    }
  },
} );

export const { setMovies, removeMovie } = moviesSlice.actions;
export default moviesSlice.reducer;