

// src/infrastructure/controllers/RecipeController.ts

import { GetAllRecipeUseCase } from "@/core/use-cases/recipes/GetAllRecipeUseCase";
import { FirebaseRecipeRepository } from "@/infrastructure/database/recipe/FirebaseRecipeRepository";
import { AppDispatch } from "../state/store";
import { setError, setRecipes } from "../state/slices/recipe/recipeSlice";

export class RecipeController {
    private getAllRecipesUseCase:  GetAllRecipeUseCase;

    constructor() {
        const recipeRepository = new FirebaseRecipeRepository();
        this.getAllRecipesUseCase = new GetAllRecipeUseCase(recipeRepository);
    }

    async fetchRecipes(dispatch: AppDispatch): Promise<void> {
        try {
            const recipes = await this.getAllRecipesUseCase.execute();
            dispatch(setRecipes(recipes));
        } catch (error) {
            dispatch(setError('Failed to fetch recipes'+ error));
        }
    }
}
