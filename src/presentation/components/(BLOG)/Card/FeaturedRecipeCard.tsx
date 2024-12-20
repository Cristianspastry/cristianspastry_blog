import React from 'react'
import Image from 'next/image'
import { Recipe } from '@/core/domain/entities/Recipe'

interface RecipeCardProps {
  recipe: Recipe
}

export default function FeaturedRecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="relative aspect-[16/9]">
      <Image
        src={recipe.image || ''}
        alt={recipe.title}
        fill
        className="object-cover rounded-lg"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center text-white p-4">
        <div className="text-lg font-medium mb-4 font-playfair_display">{recipe.category}</div>
        <h2 className="text-4xl font-bold mb-6 font-playfair_display">{recipe.title}</h2>
      </div>
    </div>
  )
}

