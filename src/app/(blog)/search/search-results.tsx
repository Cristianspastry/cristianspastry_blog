"use client";
import { useEffect } from 'react';
import RecipeCard from '@/presentation/components/(BLOG)/Card/RecipeCard';
import { useAppDispatch, useAppSelector } from '@/presentation/state/hooks';
import { searchRecipes } from '@/presentation/state/slices/recipe/recipeSlice';

export default function SearchResults({ searchTerm }: { searchTerm: string }) {
  const dispatch = useAppDispatch();
  const { results, status, error } = useAppSelector((state) => state.recipes.search);

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchRecipes(searchTerm));
    }
  }, [dispatch, searchTerm]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p>Loading results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center p-4">
        <p>No recipes found matching &quot;{searchTerm}&quot;</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}