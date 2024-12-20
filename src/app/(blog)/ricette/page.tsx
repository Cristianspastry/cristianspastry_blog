'use client'

import { useState, useEffect } from "react"
import { Recipe } from "@/core/domain/entities/Recipe"
import RecipeFilter from "@/presentation/components/(BLOG)/filters/RecipeFilter"
import RecipeGrid from "@/presentation/components/(BLOG)/grid/RecipeGrid"
import { FirebaseRecipeRepository } from "@/infrastructure/repositories/FirebaseRecipeRepository"
import { GetAllRecipeUseCase } from "@/core/useCases/recipes/GetAllRecipeUseCase"
import { metadata,  } from "./metadata"

export { metadata };

/**
 * Pagina delle ricette
 *
 * Questa pagina mostra l'elenco di tutte le ricette presenti nel database.
 * La pagina include un filtro per selezionare le ricette per categoria e
 * una griglia che mostra le ricette in base alla selezione.
 *
 * L'elenco delle ricette viene recuperato dal database all'avvio della
 * pagina. Se l'operazione di recupero fallisce, viene mostrato un messaggio
 * di errore.
 *
 * @returns {JSX.Element} La pagina delle ricette
 */

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [activeCategory, setActiveCategory] = useState('Tutte')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipeRepository = new FirebaseRecipeRepository()
        const getAllRecipeUseCase = new GetAllRecipeUseCase(recipeRepository)
        const fetchedRecipes = await getAllRecipeUseCase.execute()
        setRecipes(fetchedRecipes)
      } catch (error) {
        console.error("Failed to fetch recipes:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  if (isLoading) {
    return <div className="container mx-auto py-8">Caricamento ricette...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <RecipeFilter onCategoryChange={handleCategoryChange} />
        <RecipeGrid recipes={recipes} activeCategory={activeCategory} />
      </div>
    </div>
  )
}
