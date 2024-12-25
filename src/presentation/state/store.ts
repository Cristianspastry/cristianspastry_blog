import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './slices/recipe/recipeSlice';
import tipReducer from './slices/tip/tipSlice';

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    tips : tipReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.date'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

