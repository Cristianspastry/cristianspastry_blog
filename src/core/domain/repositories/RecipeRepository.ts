import { Recipe } from '../entities/Recipe';

export interface RecipeRepository {
  save(recipe: Recipe): Promise<void>;
  update(id: string, recipe: Recipe): Promise<void>;
  getById(id: string): Promise<Recipe | null>;
  getBySlug(slug: string): Promise<Recipe | null>;
  getAll(): Promise<Recipe[]>;
  delete(id: string): Promise<void>;
}

