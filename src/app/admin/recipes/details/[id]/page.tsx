"use client";

import React, { Suspense } from 'react';
import { use } from 'react';
import Image from 'next/image';
import { Recipe } from '@/core/domain/entities/Recipe';
import { GetRecipeByIdUseCase } from '@/core/useCases/recipes/GetRecipeByIdUseCase';
import { FirebaseRecipeRepository } from '@/infrastructure/repositories/FirebaseRecipeRepository';

// Loader Component
const RecipeLoader = () => (
  <div className="flex justify-center items-center min-h-screen">
    <p className="text-xl">Caricamento ricetta...</p>
  </div>
);

// Wrapper Component to Handle Data Fetching
const RecipeDetailsContent = ({ id }: { id: string }) => {
  const recipe = use(fetchRecipe(id));

  if (!recipe) {
    return <p>Ricetta non trovata</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="relative aspect-square">
          <Image
            src={recipe.image || '/placeholder.jpg'}
            alt={recipe.title || 'Recipe Image'}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        {/* Recipe Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-gray-600 mb-4">{recipe.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <strong>Difficoltà:</strong> {recipe.difficulty}
            </div>
            <div>
              <strong>Porzioni:</strong> {recipe.portions}
            </div>
            <div>
              <strong>Preparazione:</strong> {recipe.prepTime.value} {recipe.prepTime.unit}
            </div>
            <div>
              <strong>Cottura:</strong> {recipe.cookingTime.value} {recipe.cookingTime.unit}
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Ingredienti</h2>
            <ul className="list-disc pl-5">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Preparation Steps */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Preparazione</h2>
            <ol className="list-decimal pl-5">
              {recipe.steps.map((step, index) => (
                <li key={index} className="mb-2">{step}</li>
              ))}
            </ol>
          </div>

          {/* Tips Section */}
          {recipe.tips && recipe.tips.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Consigli</h2>
              <ul className="list-disc pl-5">
                {recipe.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Conservation */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Conservazione</h2>
            <p>{recipe.conservation}</p>
          </div>

          {/* Data Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Data</h2>
            <p>{recipe.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fetch Recipe Function (moved outside of component)
const fetchRecipe = async (id: string): Promise<Recipe | null> => {
  const recipeRepository = new FirebaseRecipeRepository();
  const getRecipeByIdUseCase = new GetRecipeByIdUseCase(recipeRepository);
  return await getRecipeByIdUseCase.execute(id);
};

// Page Component with Suspense
const RecipeDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<RecipeLoader />}>
      <RecipeDetailsContent id={params.id} />
    </Suspense>
  );
};

export default RecipeDetailsPage;