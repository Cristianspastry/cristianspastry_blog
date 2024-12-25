'use client';

import { useState, useEffect } from 'react';
import RecipeCard from '../Card/RecipeCard';
import { Recipe } from '@/core/entities/Recipe';

interface RecipeGridProps {
  recipes: Recipe[];
  activeCategory: string;
}

export default function RecipeGrid({ recipes, activeCategory }: RecipeGridProps) {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

  useEffect(() => {
    const validRecipes = Array.isArray(recipes) ? recipes : [];
    
    if (activeCategory === 'Tutte') {
      setFilteredRecipes(validRecipes);
    } else {
      setFilteredRecipes(
        validRecipes.filter(recipe => recipe.category === activeCategory)
      );
    }
  }, [activeCategory, recipes]);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredRecipes.map((recipe) => (
        <RecipeCard key={recipe.id ?? recipe.slug} recipe={recipe} />
      ))}
    </div>
  );
}