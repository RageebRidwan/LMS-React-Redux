import type { IBook } from "@/types";
import { baseApi } from "./baseApi";

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query<IBook[], void>({
      query: () => `/books`,
      providesTags: ["Book"],
    }),
    getBookById: builder.query<IBook, string>({
      query: (id) => `/books/${id}`,
      providesTags: ["Book"],
    }),
    createBook: builder.mutation<IBook, Partial<IBook>>({
      query: (data) => ({
        url: `/books`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation<IBook, { id: string | undefined} & Partial<IBook>>({
      query: ({ id, ...data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
