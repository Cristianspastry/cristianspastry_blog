
"use client";

import RecipeCard from '@/components/card/recipeCard';
import { Ricetta } from '@/model/ricetta';
import { fetchRecipes } from '@/utils/service';
import React, { useEffect, useState } from 'react'

type Props = {
  recipes : Ricetta[];
}

const LastRecipesSections = (props: Props) => {
    
  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mostra le ultime ricette */}
          {props.recipes.map((recipe : Ricetta) => (
            <>
            <RecipeCard key={recipe.id} recipe={recipe} />
            <RecipeCard key={recipe.id} recipe={recipe} />
            </>
          ))}
        </div>
    </>
  )
}

export default LastRecipesSections