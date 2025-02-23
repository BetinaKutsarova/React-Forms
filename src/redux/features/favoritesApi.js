import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const favoritesApi = createApi({
  reducerPath: 'favoritesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Favorite'],
  endpoints: (builder) => ({
    getFavorites: builder.query({
      query: () => '/favorites',
      providesTags: ['Favorite']
    }),
    addFavorite: builder.mutation({
      query: (plant) => ({
        url: '/favorites',
        method: 'POST',
        body: plant
      }),
      invalidatesTags: ['Favorite']
    }),
    removeFavorite: builder.mutation({
      query: (id) => ({
        url: `/favorites/${String(id)}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Favorite']
    })
  })
})

export const {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation
} = favoritesApi