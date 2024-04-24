"use client";
import LargeRecipeCard from '@/components/card/largeRecipeCard';
import SmallRecipeCard from '@/components/card/smallRecipeCard';
import { Ricetta } from '@/model/ricetta';
import { fetchRecipes } from '@/utils/service';
import React, { useEffect, useState } from 'react';



const FeaturedRecipesSection = () => {
const [recipes, setRecipes] = useState<Ricetta[]>();
recipes?.slice(0, 2);

    useEffect(() => {
        const getRecipes = async () => {
          try {
            const recipesData = await fetchRecipes();
            setRecipes(recipesData);
          } catch (error) {
            console.error('Errore nel recupero delle ricette:', error);
          }
        };
        getRecipes();
      }, []);


  return (
<div className="max-w-screen-lg mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Ricette in Evidenza</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card grande */}
        {/*<LargeRecipeCard largeCard={{
          imageUrl: recipes
          title: recipes[0].titolo,
          category: recipes[0].categoria,
          description: recipes[0].descrizione,
          preparationTime: recipes[0].tempoDiPreparazione.tempo + recipes[0].tempoDiPreparazione.tipoTempo,
        }} />*/}
        {/* Due card più piccole */}
        <div className="md:flex md:flex-col md:justify-between md:space-y-4">
          {/* Card più piccola 1 */}
          {/* <SmallRecipeCard smallCard={smallCard1} /> */}
          {/* Card più piccola 2 */}
          {/*<SmallRecipeCard smallCard={smallCard2} />*/}
        </div>
      </div>
    </div>
  );
};

export default FeaturedRecipesSection;
