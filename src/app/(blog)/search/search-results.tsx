import { Recipe } from '@/core/domain/entities/Recipe';
import { FirebaseRecipeRepository } from '@/infrastructure/repositories/FirebaseRecipeRepository';
import { GetAllRecipeUseCase } from '@/core/useCases/recipes/GetAllRecipeUseCase';
import RecipeCard from '@/presentation/components/(BLOG)/Card/RecipeCard';

async function searchRecipes(searchTerm: string): Promise<Recipe[]> {
    const recipeRecipesitory = new FirebaseRecipeRepository();
    const getAllRecipesUseCase = new GetAllRecipeUseCase(recipeRecipesitory);
    const recipes = await getAllRecipesUseCase.execute();
    return recipes.filter((recipe) => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()));

}

export default async function SearchResults({ searchTerm }: { searchTerm: string }) {
  const recipes = await searchRecipes(searchTerm);

  if (recipes.length === 0) {
    return <p className="text-lg text-gray-600">Nessun risultato trovato per {searchTerm}.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

