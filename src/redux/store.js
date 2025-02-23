import { configureStore } from '@reduxjs/toolkit'
import { plantsApi } from './features/plantsApi'
import { favoritesApi } from './features/favoritesApi'

export const store = configureStore({
  reducer: {
    [plantsApi.reducerPath]: plantsApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(plantsApi.middleware)
      .concat(favoritesApi.middleware)
})