import { Recipe } from "@/core/domain/entities/Recipe";
import { RecipeRepository } from "@/core/domain/repositories/RecipeRepository";




export class GetRecipeBySlugUseCase {

    constructor(private recipeRepository: RecipeRepository) {}

    execute(slug: Promise<string | null>): Promise<Recipe | null> {
        return this.recipeRepository.getBySlug(slug);
    }
    
}