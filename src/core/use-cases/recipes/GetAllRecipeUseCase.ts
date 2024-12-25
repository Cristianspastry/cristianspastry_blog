// src/core/use-cases/GetAllRecipes.ts

import { Recipe } from "@/core/entities/Recipe";
import { IRecipeRepository } from "@/core/interfaces/recipe/IRecipeRepository";


export class GetAllRecipeUseCase {
    constructor(private recipeRepository: IRecipeRepository) {}

    async execute(): Promise<Recipe[]> {
        return await this.recipeRepository.getAll();
    }
}


