import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const plantsApi = createApi({
  reducerPath: 'plantsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/',
    prepareHeaders: (headers) => {
        headers.set('Authorization', `Bearer ${import.meta.env.VITE_TREFLE_API_KEY}`)
        return headers
    },
    // fetchFn: async (...args) => {
    //   await new Promise(resolve => setTimeout(resolve, 3000)); // loads too fast, this is to see the loader:D
    //   return fetch(...args);
    // }
  }),
  endpoints: (builder) => ({
    getPlants: builder.query({
      query: (page = 1) => `plants?page=${page}`, // &per_page=desiredNumber or it defaults to 20
      suspense: true
    }),
    getPlantsBySearch: builder.query({
      query: (searchTerm) => `plants/search?q=${searchTerm}`,
      suspense: true
    }),
    getPlantDetails: builder.query({
      query: (id) => `plants/${id}`,
      suspense: true
    })
  })
})

export const { 
  useGetPlantsQuery, 
  useGetPlantsBySearchQuery, 
  useGetPlantDetailsQuery 
} = plantsApi