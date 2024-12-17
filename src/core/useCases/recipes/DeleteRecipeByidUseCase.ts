import { RecipeRepository } from "@/core/domain/repositories/RecipeRepository";



export class DeleteRecipeByidUseCase {
    constructor(private recipeRepository: RecipeRepository) {}

    execute(id: string): Promise<void> {
        return this.recipeRepository.delete(id);
    }
}