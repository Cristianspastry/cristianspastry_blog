'use client'
import { useEffect } from 'react'
import { use } from 'react'
import { useAppDispatch, useAppSelector } from '@/presentation/state/hooks'
import { fetchRecipeById } from '@/presentation/state/slices/recipe/recipeSlice'
import { RecipeForm } from '@/presentation/components/(ADMIN)/form/RecipeForm'
import Loader from '@/presentation/components/loader'

export default function EditRecipe({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const dispatch = useAppDispatch()
  const { currentRecipe, status, error } = useAppSelector(state => state.recipes)

  useEffect(() => {
    dispatch(fetchRecipeById(id))
  }, [dispatch, id])

  // Debug
  console.log('Status:', status);
  console.log('Current Recipe:', currentRecipe);

  // Non mostrare il form finché la ricetta non è completamente caricata
  if (status === 'loading' || !currentRecipe) return <Loader />
  if (status === 'failed') return <div>Error: {error}</div>

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Modifica Ricetta</h1>
        <RecipeForm existingRecipe={currentRecipe} />
      </div>
    </div>
  )
}