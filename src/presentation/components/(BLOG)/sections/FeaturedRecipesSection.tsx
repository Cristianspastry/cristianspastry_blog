"use client"

import { Recipe } from '@/core/domain/entities/Recipe'
import FeaturedRecipeSlider from '../carousel/FeaturedCarouselSlider'

interface FeaturedRecipeProps {
  recipes: Recipe[]
}

export default function FeaturedRecipeSection({ recipes }: FeaturedRecipeProps) {
  return (
    <div className='mt-8' >
      <FeaturedRecipeSlider recipes={recipes} />
    </div>  
  )
}

