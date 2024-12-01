"use server";
import RecipeList from '@/presentation/components/(ADMIN)/list/RecipeList';
import { AdminRoutes } from '@/routes/Routes';
import Link from 'next/link';
import React from 'react';

const RecipesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Titolo della pagina */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestione Ricette</h1>

        {/* Sezione di azioni */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">Gestisci le ricette del tuo sito: aggiungi, modifica o visualizza quelle esistenti.</p>
          <Link
            href={AdminRoutes.Recipes.subLinks.addRecipe}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-sm transition-all"
          >
            + Aggiungi Ricetta
          </Link>
        </div>

        {/* Lista placeholder (può essere sostituita con dati dinamici) */}
        <RecipeList />

      </div>
    </div>
  );
};

export default RecipesPage;
