import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  tagTypes: ["posts"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => {
        console.log("Running");
        return `pokemon/${name}`;
      },
      providesTags: ["posts"],
    }),
    addPkemon: builder.mutation({
      query: (name) => {
        return `pokemon/${name}`;
      },
      invalidatesTags: ["posts"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery, useAddPkemonMutation } = pokemonApi;
