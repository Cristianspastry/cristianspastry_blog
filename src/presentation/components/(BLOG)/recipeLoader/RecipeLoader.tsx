'use client'

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/presentation/state/hooks';
import { fetchRecipes } from '@/presentation/state/slices/recipe/recipeSlice';
import FeaturedRecipeSection from '@/presentation/components/(BLOG)/sections/FeaturedRecipesSection';
import RecipeSection from '@/presentation/components/(BLOG)/sections/RecipeSection';

export default function RecipeLoader() {
  const dispatch = useAppDispatch();
  const { recipes, status, error } = useAppSelector(state => state.recipes);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRecipes());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Caricamento ricette...</div>;
  }

  if (status === 'failed') {
    return <div>Errore: {error}</div>;
  }

  const popularRecipes = recipes.filter((recipe) => recipe.isPopular);
  const currentDate = new Date().getTime();
  const recentRecipes = recipes.filter((recipe) => {
    const recipeDate = new Date(recipe.date).getTime();
    const diffTime = currentDate - recipeDate;
    const diffDays = diffTime / (1000 * 3600 * 24);
    return diffDays <= 7;
  });
  const specialRecipes = recipes.filter((recipe) => recipe.isSpecial);

  return (
    <>
      <FeaturedRecipeSection recipes={recipes} />
      <div className="container mx-auto px-6 py-16 space-y-16">
        <RecipeSection
          sectionTitle="Ricette Popolari"
          recipes={popularRecipes}
        />
        <RecipeSection
          sectionTitle="Ricette Recenti"
          recipes={recentRecipes}
        />
        <RecipeSection
          sectionTitle="Ricette Speciali"
          recipes={specialRecipes}
        />
      </div>
    </>
  );
}

