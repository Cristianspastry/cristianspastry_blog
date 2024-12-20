'use client'

import { useState, useEffect } from 'react'

import RecipeCard from '../Card/RecipeCard'
import { Recipe } from '@/core/domain/entities/Recipe'

interface RecipeGridProps {
  recipes: Recipe[]
  activeCategory: string
}

export default function RecipeGrid({ recipes, activeCategory }: RecipeGridProps) {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes)

  useEffect(() => {
    if (activeCategory === 'Tutte') {
      setFilteredRecipes(recipes)
    } else {
      setFilteredRecipes(recipes.filter(recipe => recipe.category === activeCategory))
    }
  }, [activeCategory, recipes])

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredRecipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}

