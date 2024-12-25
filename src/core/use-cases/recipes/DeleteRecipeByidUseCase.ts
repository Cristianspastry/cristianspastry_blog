import { IRecipeRepository } from "@/core/interfaces/recipe/IRecipeRepository";



export class DeleteRecipeByidUseCase {
    constructor(private recipeRepository: IRecipeRepository) {}

    execute(id: string): Promise<void> {
        return this.recipeRepository.delete(id);
    }
}