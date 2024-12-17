import { Suspense } from 'react'
import { Metadata } from 'next'
import { FirebaseRecipeRepository } from '@/infrastructure/repositories/FirebaseRecipeRepository'
import { Recipe, RecipeSortOption } from '@/core/domain/entities/Recipe'
import { GetFilteredRecipesUseCase } from '@/core/useCases/recipes/GetFilteredRecipesUseCase'
import RecipeFilters from '@/presentation/components/(BLOG)/filters/RecipeFilters'
import RecipeSorter from '@/presentation/components/(BLOG)/sorter/RecipeSorter'
import RecipeList from '@/presentation/components/(ADMIN)/list/RecipeList'

export const metadata: Metadata = {
  title: 'Tutte le ricette | Cristian\'s Pastry',
  description: 'Esplora la nostra vasta collezione di ricette di pasticceria, dai classici alle creazioni innovative',
}

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page, 10) : 1
  const limit = 12 // Numero di ricette per pagina
  const difficulty = typeof searchParams.difficulty === 'string' ? searchParams.difficulty : undefined
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined
  const prepTime = typeof searchParams.prepTime === 'string' ? parseInt(searchParams.prepTime, 10) : undefined
  const sortBy = typeof searchParams.sort === 'string' ? searchParams.sort : 'newest'

  const recipeRepository = new FirebaseRecipeRepository()
  const getFilteredRecipesUseCase = new GetFilteredRecipesUseCase(recipeRepository)

  const sortOption: RecipeSortOption = {
    field: getSortField(sortBy),
    direction: getSortDirection(sortBy)
  }

  const { recipes, totalCount } = await getFilteredRecipesUseCase.execute(
    { difficulty, category, prepTime },
    sortOption,
    { page, limit }
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Tutte le nostre ricette</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4">
          <RecipeFilters />
        </aside>
        <main className="w-full lg:w-3/4">
          <div className="mb-6">
            <RecipeSorter />
          </div>
          <Suspense fallback={<div className="text-center">Caricamento ricette...</div>}>
            <RecipeList initialRecipes={recipes} totalRecipes={totalCount} page={page} limit={limit} />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

function getSortField(sortBy: string): keyof Recipe {
  switch (sortBy) {
    case 'oldest':
    case 'newest':
      return 'createdAt'
    case 'popular':
      return 'views'
    case 'difficulty_asc':
    case 'difficulty_desc':
      return 'difficulty'
    default:
      return 'createdAt'
  }
}

function getSortDirection(sortBy: string): 'asc' | 'desc' {
  switch (sortBy) {
    case 'oldest':
    case 'difficulty_asc':
      return 'asc'
    default:
      return 'desc'
  }
}

