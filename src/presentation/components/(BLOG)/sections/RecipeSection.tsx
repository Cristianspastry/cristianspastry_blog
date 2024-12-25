"use client";

import { useState, useCallback, useEffect } from 'react';
import { Recipe } from "@/core/entities/Recipe";
import RecipeCard from "../Card/RecipeCard";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RecipeSectionProps {
  sectionTitle: string;
  recipes: Recipe[];
}

const RecipeSection: React.FC<RecipeSectionProps> = ({ sectionTitle, recipes }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    slidesToScroll: 1, 
    align: 'start',
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
      '(min-width: 1280px)': { slidesToScroll: 4 }
    }
  });
  
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="w-full px-4 md:px-6">
      <h2 id='section-recipes' className="text-3xl font-bold mb-8 text-gray-800">
        {sectionTitle}
      </h2>
      
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -mx-4">
            {recipes.length === 0 ? (
              <p className="text-gray-600">Nessuna ricetta trovata.</p>
            ) : (
              recipes.map((recipe: Recipe) => (
                <div 
                  key={recipe.id} 
                  className="flex-[0_0_100%] min-w-0 px-4 sm:flex-[0_0_calc(50%-2rem)] md:flex-[0_0_calc(33.333%-2rem)] lg:flex-[0_0_calc(25%-2rem)]"
                >
                  <RecipeCard recipe={recipe} />
                </div>
              ))
            )}
          </div>
        </div>

        <button
          className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md transition-opacity ${
            canScrollPrev ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={scrollPrev}
          aria-label="Precedente"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md transition-opacity ${
            canScrollNext ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={scrollNext}
          aria-label="Successivo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default RecipeSection;

