'use client'

import { use } from 'react'
import { useEffect, useState } from 'react'
import { GetRecipeByIdUseCase } from "@/core/useCases/recipes/GetRecipeByIdUseCase"
import { FirebaseRecipeRepository } from "@/infrastructure/repositories/FirebaseRecipeRepository"
import { RecipeForm } from "@/presentation/components/(ADMIN)/recipeForm/RecipeForm"
import { Recipe } from '@/core/domain/entities/Recipe'
import Loader from '@/presentation/components/loader'

export default function EditRecipe({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params)
    const [existingRecipe, setExistingRecipe] = useState<Recipe | null>(null)

    useEffect(() => {
        const fetchRecipe = async () => {
            const getRecipeByIdUseCase = new GetRecipeByIdUseCase(new FirebaseRecipeRepository())
            const recipe = await getRecipeByIdUseCase.execute(id)
            setExistingRecipe(recipe)
        }

        fetchRecipe()
    }, [id])

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Modifica Ricetta</h1>
                {existingRecipe ? (
                    <RecipeForm existingRecipe={existingRecipe} />
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    )
}

