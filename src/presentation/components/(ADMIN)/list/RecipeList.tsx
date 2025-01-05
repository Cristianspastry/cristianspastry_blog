"use client";
import { Recipe } from '@/core/entities/Recipe';
import { AdminRoutes, BlogRoutes } from '@/routes/Routes';
import Link from 'next/link';
//import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../loader';
import { AppDispatch, RootState } from '@/presentation/state/store';
import { deleteRecipe, fetchRecipes } from '@/presentation/state/slices/recipe/recipeSlice';

const RecipeList = () => {
  const dispatch = useDispatch<AppDispatch>();
  //const router = useRouter();
  const { recipes, status } = useSelector((state: RootState) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleDeleteRecipe = async (id?: string) => {
    const result = confirm(`Sei sicuro di voler eliminare la ricetta ${id}?`);
    if (result) {
      await dispatch(deleteRecipe(id!));
      dispatch(fetchRecipes()); // Ricarica i dati
      alert(`Ricetta ${id} eliminata`);
    } else {
      alert(`Ricetta ${id} non eliminata`);
    }
  };

  if (status === "loading") {
    return <Loader />;
  }

  if (recipes.length === 0) {
    return <p>Nessuna ricetta trovata. Aggiungine una nuova!</p>;
  }

  return (
    <ul className="space-y-4">
      {recipes.map((recipe : Recipe) => (
        <li
          key={recipe.id}
          className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">{recipe.title}</span>
            <span className="font-medium text-gray-700">{recipe.slug}</span>
            
            <div className="space-x-2">
              <Link href={BlogRoutes.Recipes.subLinks + recipe.slug} className="text-orange-500 hover:text-orange-600 font-medium transition-all">
                Visualizza
              </Link>
              <Link href={AdminRoutes.Recipes.subLinks.editRecipe + recipe.id} className="text-green-500 hover:text-green-600 font-medium transition-all">
                Modifica
              </Link>
              <button
                className="text-red-500 hover:text-red-600 font-medium transition-all"
                onClick={() => handleDeleteRecipe(recipe.id)}
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