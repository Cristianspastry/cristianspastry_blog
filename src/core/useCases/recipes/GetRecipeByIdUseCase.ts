import { Recipe } from "@/core/domain/entities/Recipe";
import { RecipeRepository } from "@/core/domain/repositories/RecipeRepository";





export class GetRecipeByIdUseCase {
    public constructor(
        private recipeRepository: RecipeRepository
    ) {}

    execute(id: string): Promise<Recipe | null> {
        return this.recipeRepository.getById(id);
    }
    
}