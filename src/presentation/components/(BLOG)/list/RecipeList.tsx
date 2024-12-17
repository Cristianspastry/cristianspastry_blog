'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Recipe } from '@/core/domain/entities/Recipe'
import RecipeCard from '../Card/RecipeCard'
import Pagination from '../pagination/Pagination'

interface RecipeListProps {
  initialRecipes: Recipe[]
  totalRecipes: number
  page: number
  limit: number
}

export default function RecipeList({ initialRecipes, totalRecipes, page, limit }: RecipeListProps) {
  const [recipes, setRecipes] = useState(initialRecipes)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    setRecipes(initialRecipes)
  }, [initialRecipes])

  const handlePageChange = (newPage: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.set('page', newPage.toString())
    const search = current.toString()
    const query = search ? `?${search}` : ''
    router.push(`/ricette${query}`)
  }

  if (recipes.length === 0) {
    return <p className="text-center text-gray-500">Nessuna ricetta trovata.</p>
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalItems={totalRecipes}
        itemsPerPage={limit}
        onPageChange={handlePageChange}
      />
    </>
  )
}

