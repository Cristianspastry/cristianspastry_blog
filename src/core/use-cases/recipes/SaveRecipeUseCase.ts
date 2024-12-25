import { Recipe } from '@/core/entities/Recipe';
import { IRecipeRepository } from '@/core/interfaces/recipe/IRecipeRepository';

export class SaveRecipeUseCase {
  constructor(private recipeRepository: IRecipeRepository) {}

  async execute(recipe: Recipe): Promise<void> {
    if (recipe.id) {
      await this.recipeRepository.update(recipe.id, recipe);
    } else {
      await this.recipeRepository.save(recipe);
    }
  }
}

