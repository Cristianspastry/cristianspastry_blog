import { Recipe, RecipeFilters, RecipeSortOption, PaginationOptions } from '../../entities/Recipe';
import { RecipeRepository } from '../../domain/repositories/RecipeRepository';

export class GetFilteredRecipesUseCase {
  constructor(private recipeRepository: RecipeRepository) {}

  async execute(filters: RecipeFilters, sort: RecipeSortOption, pagination: PaginationOptions): Promise<{
    recipes: Recipe[];
    totalCount: number;
  }> {
    return this.recipeRepository.getFilteredRecipes(filters, sort, pagination);
  }
}

