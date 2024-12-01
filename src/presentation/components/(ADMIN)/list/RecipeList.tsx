"use client";
import { Recipe } from '@/core/domain/entities/Recipe';
import { GetAllRecipeUseCase } from '@/core/useCases/recipes/GetAllRecipeUseCase';
import { FirebaseRecipeRepository } from '@/infrastructure/repositories/FirebaseRecipeRepository';
import { AdminRoutes } from '@/routes/Routes';
import Link from 'next/link';
import React, {useEffect, useState } from 'react';

const RecipeList = () => {
   // get all recipes

  const [recipes, setRecipes] = useState< Recipe[] >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getAllRecipeUseCase = new GetAllRecipeUseCase(new FirebaseRecipeRepository());
    getAllRecipeUseCase.execute().then((recipes) => {
      setRecipes(recipes);
      setLoading(false);
    });
  }, []);

  const deleteRecipe = (id?: string ) => {
    alert(`Elimina Ricetta ${id}`);
  };

  if (loading) {
    return <p>Caricamento delle ricette...</p>;
  }

  if (recipes.length === 0) {
    return <p>Nessuna ricetta trovata. Aggiungine una nuova!</p>;
  }

  return (
    <ul className="space-y-4">
      {recipes.map((recipe) => (
        <li
          key={recipe.id}
          className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">{recipe.title}</span>
            <div className="space-x-2">
            <Link href={AdminRoutes.Recipes.subLinks.recipeDetails + recipe.id} className="text-orange-500 hover:text-orange-600 font-medium transition-all">
                Visualizza
              </Link>
              <Link href={AdminRoutes.Recipes.subLinks.editRecipe + recipe.id} className="text-green-500 hover:text-green-600 font-medium transition-all">
                Modifica
              </Link>
              <button
                className="text-red-500 hover:text-red-600 font-medium transition-all"
                onClick={ () => deleteRecipe(recipe.id)}
              >
                Elimina
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
