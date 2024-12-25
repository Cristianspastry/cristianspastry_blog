import { Recipe } from "@/core/entities/Recipe";
import { IRecipeRepository } from "@/core/interfaces/recipe/IRecipeRepository";




export class GetRecipeBySlugUseCase {

    constructor(private recipeRepository: IRecipeRepository) {}

    execute(slug: string): Promise<Recipe | null> {
        return this.recipeRepository.getBySlug(slug);
    }
    
}