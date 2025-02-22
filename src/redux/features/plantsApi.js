import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const plantsApi = createApi({
  reducerPath: 'plantsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/',
    prepareHeaders: (headers) => {
        headers.set('Authorization', `Bearer ${import.meta.env.VITE_TREFLE_API_KEY}`)
        return headers
    },
  }),
  endpoints: (builder) => ({
    getPlants: builder.query({
      query: (page = 1) => `plants?page=${page}`
    }),
    getPlantsBySearch: builder.query({
      query: (searchTerm) => `plants/search?q=${searchTerm}`
    }),
    getPlantDetails: builder.query({
      query: (id) => `plants/${id}`
    })
  })
})

export const { 
  useGetPlantsQuery, 
  useGetPlantsBySearchQuery, 
  useGetPlantDetailsQuery 
} = plantsApi