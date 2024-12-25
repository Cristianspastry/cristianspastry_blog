import { Recipe } from '@/core/entities/Recipe';
import { RootState } from '../../store';

export const selectRecipes = (state: RootState): Recipe[] => {
  return state.recipes.recipes ?? []; // Cambiato da 'items' a 'recipes'
};

export const selectIsLoading = (state: RootState): boolean => {
  return state.recipes.status === 'loading';
};

export const selectError = (state: RootState): string | null => {
  return state.recipes.error;
};