import * as React from "react";
import {
  useAddPostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  usePessimisticGetMutation,
  useUpdatePostMutation,
} from "./store/posts";
import {
  useAddPkemonMutation,
  useGetPokemonByNameQuery,
} from "./store/services";
// import { useGetPokemonByNameQuery } from './services/pokemon'

export default function App(): JSX.Element {
  // Using a query hook automatically fetches data and returns query values
  // const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");
  // const [addOne, { data: data2, isLoading: isLoading2 }] =
  //   useAddPkemonMutation();
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  ///New Tags
  // const { data, isLoading, error } = useGetPostsQuery();
  const [addOne, { isLoading: loadingAdd }] = useAddPostMutation();
  const { data, error, isLoading } = useGetPostQuery("1");
  const [update] = useUpdatePostMutation();

  // const {data:} =usePessimisticGetQuery()
  const [updateThis] = usePessimisticGetMutation();

  return (
    <div className="App">
      {/* <button onClick={() => addOne("bulbasaur")}>Add One</button>
      {isLoading2 && "loading add"}
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null} */}
      {/* <button onClick={() => addOne({ title: "lolo" })}>Add One</button> */}
      <button onClick={() => update({ id: "1", title: "lolo" })}>
        Updated One
      </button>
      <button onClick={() => updateThis("10")}>
        Updated the post with the on of id of 10 (Pessimistic update)
      </button>
      {loadingAdd && "loading add"}
      {/* {isLoadingId && "loading ID"} */}
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.title}</h3>

          {/* <h3>{data.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} /> */}
        </>
      ) : null}
    </div>
  );
}
