import { GetAllRecipeUseCase } from "@/core/useCases/recipes/GetAllRecipeUseCase";
import { FirebaseRecipeRepository } from "@/infrastructure/repositories/FirebaseRecipeRepository";
import FeaturedRecipeSection from "@/presentation/components/(BLOG)/sections/FeaturedRecipesSection";
import HeroSection from "@/presentation/components/(BLOG)/sections/HeroSection";
import RecipeSection from "@/presentation/components/(BLOG)/sections/RecipeSection";
import React from "react";


export default async function Home() {
  // Recupera le ricette tramite il caso d'uso
  const recipeRecipesitory = new FirebaseRecipeRepository();
  const getAllRecipesUseCase = new GetAllRecipeUseCase(recipeRecipesitory);
  const recipes = await getAllRecipesUseCase.execute();

  // Filtro per sezioni
//  const featuredRecipes = recipes.filter((recipe) => recipe.isFeatured);

  const popularRecipes = recipes.filter((recipe) => recipe.isPopular);
  const currentDate = new Date().getDay();
  const recentRecipes = recipes.filter((recipe) => {
    const recipeDate = new Date(recipe.date).getDay();
    const diffTime = currentDate - recipeDate; // differenza in millisecondi
    const diffDays = diffTime / (1000 * 3600 * 24); // differenza in giorni
    return diffDays <= 7; // Considera le ricette recenti se la data è nell'ultimo 7 giorni
  });
  const specialRecipes = recipes.filter((recipe) => recipe.isSpecial);

  return (
    <main className="flex flex-col min-h-screen bg-gray-100">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Recipes Section */}
        <FeaturedRecipeSection recipes={recipes} />

      {/* Content Sections */}
      <div className="container mx-auto px-6 py-16 space-y-16">
        {/* Recipe Sections */}
        <RecipeSection
          sectionTitle="Ricette Popolari"
          recipes={popularRecipes}
        />
        <RecipeSection
          sectionTitle="Ricette Recenti"
          recipes={recentRecipes}
        />
        <RecipeSection
          sectionTitle="Ricette Speciali"
          recipes={specialRecipes}
        />
      </div>
    </main>
  );
}

