// src/core/interfaces/IRecipeRepository.ts
import { PaginationOptions, Recipe, RecipeFilters, RecipeSortOption } from '../../entities/Recipe';

export interface IRecipeRepository {
    save(recipe: Recipe): Promise<void>;
    update(id: string, recipe: Recipe): Promise<void>;
    getById(id: string): Promise<Recipe | null>;
    getBySlug(slug: string): Promise<Recipe | null>; // Corretto tipo di ritorno
    getFilteredRecipes(filters: RecipeFilters, sort: RecipeSortOption, pagination: PaginationOptions): Promise<{
        recipes: Recipe[];
        totalCount: number;
    }>;
    getAll(): Promise<Recipe[]>;
    delete(id: string): Promise<void>;
}
