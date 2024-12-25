"use client";
import { Recipe } from '@/core/entities/Recipe';
import { DeleteRecipeByidUseCase } from '@/core/use-cases/recipes/DeleteRecipeByidUseCase';
import { GetAllRecipeUseCase } from '@/core/use-cases/recipes/GetAllRecipeUseCase';
import { FirebaseRecipeRepository } from '@/infrastructure/database/recipe/FirebaseRecipeRepository';
import { AdminRoutes } from '@/routes/Routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, {useEffect, useState } from 'react';
import Loader from '../../loader';

const RecipeList = () => {
   // get all recipes

  const [recipes, setRecipes] = useState< Recipe[] >([]);
  const [loading, setLoading] = useState(false);
  const recipeRepository = new FirebaseRecipeRepository();
  const getAllRecipeUseCase = new GetAllRecipeUseCase(recipeRepository);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    getAllRecipeUseCase.execute().then((recipes) => {
      setRecipes(recipes);
      setLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
  ]);

  const deleteRecipe = async (id?: string ) => {
    const recipeRepository = new FirebaseRecipeRepository();
    const deleteRecipeUseCase =  new DeleteRecipeByidUseCase(recipeRepository);
    const result = confirm(`Sei sicuro di voler eliminare la ricetta ${id}?`);
    if (result) {     
      deleteRecipeUseCase.execute(id!).then(() => {
        alert(`Ricetta ${id} eliminata`);
         router.refresh();
      });
    } else {
      alert(`Ricetta ${id} non eliminata`);
    }
  };

  if (loading) {
    return <Loader />;
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
