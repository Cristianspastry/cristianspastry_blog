
"use client";

import RecipeCard from '@/components/card/recipeCard';
import { Ricetta } from '@/model/ricetta';
import { fetchRecipes } from '@/utils/service';
import React, { useEffect, useState } from 'react'

type Props = {
  recipes : Ricetta[];
}

const LastRecipesSections = ({recipes}: Props) => {
    
  return (
    <>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mostra le ultime ricette */}
          {recipes.map((recipe : Ricetta) => (
            <>
            <RecipeCard key={recipe.id} recipe={recipe} />
            <RecipeCard key={recipe.id} recipe={recipe} />
            </>
          ))}
        </section>
    </>
  )
}

export default LastRecipesSections