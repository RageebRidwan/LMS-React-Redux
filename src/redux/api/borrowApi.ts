import { baseApi } from "./baseApi";

export const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation({
      query: (data: { book: string; quantity: number; dueDate: string }) => ({
        url: "/borrow",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Book", "Borrow"],
    }),
    getBorrowSummary: builder.query({
      query: () => "/borrow",
      providesTags: ["Borrow"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
