import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, doc, getDoc, getDocs, addDoc, deleteDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { database } from "../firebase/farebase";
import { toast } from "react-toastify";


export const moviesApi = createApi( {
  reducerPath: "moviesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: [ "Movie" ],  // Обновление страницы
  endpoints: (builder) => ( {
    getMovies: builder.query( {
      async queryFn() {
        try {
          const moviesRef = collection( database, "movies" );
          const querySnaphot = await getDocs( moviesRef );
          let movies = [];
          querySnaphot?.forEach( (doc) => {
            movies.push( { id: doc.id, ...doc.data() } );
          } );
          return { data: movies };
        } catch( err ) {
          return { error: err };
        }
      },
      providesTags: [ "Movie" ],   // Обновление страницы
    } ),

    addMovie: builder.mutation( {
      async queryFn(data) {
        try {
          await addDoc( collection( database, "movies" ), {
            ...data,
            // timestamp: serverTimestamp()
          } );
          return { data: "ok" };
        } catch( err ) {
          return {
            error: err
          };
        }
      },
      invalidatesTags: [ "Movie" ], // Обновление страницы
    } ),

    updateMovie: builder.mutation( {
      async queryFn({ id, data }) {
        try {
          await updateDoc( doc( database, "movies", id ), {
            ...data,
            // timestamp: serverTimestamp()
          } );
          return { data: "ok" };
        } catch( err ) {
          return {
            error: err
          };
        }
      },
      invalidatesTags: [ "Movie" ], // Обновление страницы
    } ),

    deleteMovie: builder.mutation( {
      async queryFn(id) {
        try {
          await deleteDoc( doc( database, "movies", id ) );
          return { data: "ok" };
        } catch( err ) {
          return { error: err };
        }
      },
      invalidatesTags: [ "Movie" ],  // Обновление страницы
    } ),

    getSingleMovie: builder.query( {
      async queryFn(id) {
        try {
          const docRef = doc( database, "movies", id );
          const snapshot = await getDoc( docRef );
          return { data: snapshot.data() };
        } catch( err ) {
          return { error: err };
        }
      },
      providesTags: [ "Movie" ],
    } ),
  } ),
} );

export const {
  useGetMoviesQuery,
  useGetSingleMovieQuery,
  useAddMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation
} = moviesApi;