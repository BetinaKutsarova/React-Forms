import { configureStore } from '@reduxjs/toolkit'
import { plantsApi } from './features/plantsApi'

export const store = configureStore({
  reducer: {
    [plantsApi.reducerPath]: plantsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(plantsApi.middleware)
})