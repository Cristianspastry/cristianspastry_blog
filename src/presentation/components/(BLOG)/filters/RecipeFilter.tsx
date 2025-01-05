'use client'

import { CATEGORIES } from '@/shared/constants/Constants'
import { useState } from 'react'


interface RecipeFilterProps {
  onCategoryChange: (category: string) => void
}

export default function RecipeFilter({ onCategoryChange }: RecipeFilterProps) {
  const [activeCategory, setActiveCategory] = useState('Tutte')

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    onCategoryChange(category)
  }

  return (
    <div className="flex justify-center gap-4 flex-wrap">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-4 py-2 rounded-full border ${
            activeCategory === category
              ? 'bg-[#002B5B] text-white'
              : 'bg-white text-[#002B5B] hover:bg-[#002B5B] hover:text-white'
          } transition-colors`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

