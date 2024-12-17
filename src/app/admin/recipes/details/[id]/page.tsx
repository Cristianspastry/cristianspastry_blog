'use client'
import RecipeDetailsContainsCard from '@/presentation/components/(ADMIN)/card/recipeDetailsContainsCard';
import React,{use} from 'react';

type Props = {
  params: {
    id: Promise<{ id: string }>;
  };
};

export default function AdminRecipeDetail({ params }: Props) {
const id = use(params.id);
  if (!id) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dettagli Ricetta</h1>
          <p className="text-gray-600">Ricetta non trovata</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dettagli Ricetta</h1>
        <RecipeDetailsContainsCard />
      </div>
    </div>
  );

}

