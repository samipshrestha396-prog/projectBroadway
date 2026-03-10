import { ORDER_URL } from "../constants";
import apiSlice from "./apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (data) => ({
        url:`${ORDER_URL}/add`,
        method: "POST",
        body: data,
      }),
    }),
    getOrderById:builder.query({
      query:(id)=>({
        url:`${ORDER_URL}/${id}`
      })
    })
  }),
});

export const {usePlaceOrderMutation,useGetOrderByIdQuery}= orderApiSlice;