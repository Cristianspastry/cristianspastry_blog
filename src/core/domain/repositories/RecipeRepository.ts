import { PaginationOptions, Recipe, RecipeFilters, RecipeSortOption } from '../entities/Recipe';

export interface RecipeRepository {
  save(recipe: Recipe): Promise<void>;
  update(id: string, recipe: Recipe): Promise<void>;
  getById(id: string): Promise<Recipe | null>;
  getBySlug(slug: Promise<string | null>): Promise<Recipe | null>;
  getFilteredRecipes(filters: RecipeFilters, sort: RecipeSortOption, pagination: PaginationOptions): Promise<{
    recipes: Recipe[];
    totalCount: number;
  }>;
  getAll(): Promise<Recipe[]>;
  delete(id: string): Promise<void>;
  
}

