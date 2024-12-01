import { Recipe } from '@/core/domain/entities/Recipe';
import { RecipeRepository } from '@/core/domain/repositories/RecipeRepository';

export class SaveRecipeUseCase {
  constructor(private recipeRepository: RecipeRepository) {}

  async execute(recipe: Recipe): Promise<void> {
    if (recipe.id) {
      await this.recipeRepository.update(recipe.id, recipe);
    } else {
      await this.recipeRepository.save(recipe);
    }
  }
}

