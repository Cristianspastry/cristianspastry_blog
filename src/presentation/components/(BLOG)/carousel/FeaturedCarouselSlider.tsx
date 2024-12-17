"use client"

import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Recipe } from '@/core/domain/entities/Recipe'
import FeaturedRecipeCard from '../Card/FeaturedRecipeCard'

interface RecipeSectionProps {
  recipes: Recipe[]
}

export default function FeaturedRecipeSlider({ recipes }: RecipeSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const AUTO_PLAY_INTERVAL = 2000 // 5 secondi

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recipes.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + recipes.length) % recipes.length)
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null
    if (isAutoPlay) {
      intervalId = setInterval(() => {
        nextSlide()
      }, AUTO_PLAY_INTERVAL)
    }
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isAutoPlay, currentIndex])

  const handleMouseEnter = () => setIsAutoPlay(false)
  const handleMouseLeave = () => setIsAutoPlay(true)




  return (
    <section
      className="relative w-full max-w-6xl mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <FeaturedRecipeCard recipe={recipes[currentIndex]} />
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition-colors"
        aria-label="Previous recipe"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition-colors"
        aria-label="Next recipe"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      <button
        onClick={() => setIsAutoPlay(!isAutoPlay)}
        className="absolute top-4 right-4 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition-colors"
        aria-label={isAutoPlay ? "Disattiva scorrimento automatico" : "Attiva scorrimento automatico"}
      >
        {isAutoPlay ? "Auto ⏸" : "Auto ▶"}
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {recipes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
