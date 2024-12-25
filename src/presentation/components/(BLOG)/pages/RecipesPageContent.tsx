'use client';

// questo file fa riferimento a : src/app/(blog)/recipes/page.tsx

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import RecipeFilter from '@/presentation/components/(BLOG)/filters/RecipeFilter';
import RecipeGrid from '@/presentation/components/(BLOG)/grid/RecipeGrid';
import NoRecipesMessage from '@/presentation/components/(BLOG)/shared/NoRecipesMessage';
import RecipeLoader from '../loader/RecipeLoader';
import { AppDispatch } from '@/presentation/state/store';
import { fetchRecipes } from '@/presentation/state/slices/recipe/recipeSlice';
import { selectError, selectIsLoading, selectRecipes } from '@/presentation/state/slices/recipe/recipeSelectors';

export default function RecipesPageContent() {
  const dispatch = useDispatch<AppDispatch>();
  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [activeCategory, setActiveCategory] = useState("Tutte");

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  // Visualizza il loader durante il caricamento
  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <RecipeLoader />
      </div>
    );
  }

  // Visualizza il messaggio di errore se presente
  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Si è verificato un errore
          </h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => dispatch(fetchRecipes())}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Riprova
          </button>
        </div>
      </div>
    );
  }

  // Visualizza il messaggio se non ci sono ricette
  if (!recipes || recipes.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <NoRecipesMessage />
      </div>
    );
  }

  // Visualizza le ricette
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <RecipeFilter onCategoryChange={handleCategoryChange} />
        <RecipeGrid recipes={recipes} activeCategory={activeCategory} />
      </div>
    </div>
  );
}