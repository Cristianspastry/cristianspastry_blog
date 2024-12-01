import { Recipe } from "@/core/domain/entities/Recipe";
import { RecipeRepository } from "@/core/domain/repositories/RecipeRepository";


export class GetAllRecipeUseCase {
    constructor(private recipeRepository: RecipeRepository) {}

    async execute(): Promise<Recipe[]> {
        return await this.recipeRepository.getAll();
    }
}