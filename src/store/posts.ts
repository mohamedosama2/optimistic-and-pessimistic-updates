import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
/////axios config
// const axiosBaseQuery =
//   (
//     { baseUrl }: { baseUrl: string } = { baseUrl: "" }
//   ): BaseQueryFn<
//     {
//       url: string;
//       method?: AxiosRequestConfig["method"];
//       data?: AxiosRequestConfig["data"];
//       headers?: AxiosRequestConfig["adapter"];
//     },
//     unknown,
//     unknown
//   > =>
//   async ({ url, method = "GET", data }) => {
//     try {
//       const result = await axios({ url: baseUrl + url, method, data });
//       return { data: result.data };
//     } catch (axiosError) {
//       let err = axiosError as AxiosError;
//       return {
//         error: { status: err.response?.status, data: err.response?.data },
//       };
//     }
//   };

export interface Post {
  id: string;
  userId: number;
  title: string;
  body: string;
}

type PostsResponse = Post[];

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    getPosts: build.query<PostsResponse, void>({
      query: () => "posts",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    addPost: build.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: `posts`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    getPost: build.query<Post, string>({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    updatePost: build.mutation<void, Pick<Post, "id"> & Partial<Post>>({
      query: ({ id, ...patch }) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        console.log("Updated");
        const patchResult = dispatch(
          postsApi.util.updateQueryData("getPost", id, (draft) => {
            draft.title = "lololollllllllll";
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      //   invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],///
    }),
    pessimisticGet: build.mutation({
      query: (id) => `posts/${id}`,
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPost } = await queryFulfilled;
          const patchResult = dispatch(
            postsApi.util.updateQueryData("getPost", "1", (draft) => {
              Object.assign(draft, updatedPost);
            })
          );
        } catch {}
      },
    }),
    deletePost: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Post", id }],
    }),
  }),
});

export const {
  useAddPostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useUpdatePostMutation,
  usePessimisticGetMutation,
} = postsApi;
