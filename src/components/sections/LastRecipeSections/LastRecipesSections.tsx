
"use client";

import RecipeCard from '@/components/card/recipeCard';
import { Ricetta } from '@/model/ricetta';
import { fetchRecipes } from '@/utils/service';
import React, { useEffect, useState } from 'react'

type Props = {}

const LastRecipesSections = (props: Props) => {
    const [recipes, setRecipes] = useState<Ricetta[]>([]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const recipesData = await fetchRecipes();
        setRecipes(recipesData);
      } catch (error) {
        console.error('Errore nel recupero delle ricette:', error);
      }
    };
    getRecipes();
  }, []);
  return (
    <>
    <h1 className="text-3xl font-semibold text-left mb-8">Ultime Ricette</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mostra le ultime ricette */}
          {recipes.map((recipe) => (
            <>
            <RecipeCard key={recipe.id} recipe={recipe} />
            <RecipeCard key={recipe.id} recipe={recipe} />
            </>
          ))}
        </div>
    </>
  )
}

export default LastRecipesSections