import { FirebaseRecipeRepository } from "@/infrastructure/database/recipe/FirebaseRecipeRepository";
import { GetAllRecipeUseCase } from "@/core/use-cases/recipes/GetAllRecipeUseCase";
import { GetRecipeBySlugUseCase } from "@/core/use-cases/recipes/GetRecipeBySlug";
import { SaveRecipeUseCase } from "./SaveRecipeUseCase";
import { Recipe } from "@/core/entities/Recipe";
import { GetRecipeByIdUseCase } from "./GetRecipeByIdUseCase";

const repository = new FirebaseRecipeRepository();

export const getAllRecipes = async () => {
  const getAllRecipeUseCase = new GetAllRecipeUseCase(repository);
  return await getAllRecipeUseCase.execute();
};

export const getRecipeBySlug = async (slug: string) => {
  const getRecipeBySlugUseCase = new GetRecipeBySlugUseCase(repository);
  return await getRecipeBySlugUseCase.execute(slug);
};

export const saveRecipe = async (recipe: Recipe) => {
  const saveRecipeUseCase = new SaveRecipeUseCase(repository);
  return await saveRecipeUseCase.execute(recipe);
};

export const getRecipeById = async (id: string) => {
  const getRecipeByIdUseCase = new GetRecipeByIdUseCase(repository);
  return await getRecipeByIdUseCase.execute(id);
};
