"use client"

import { Ingredient, IngredientGroup, Recipe } from '@/core/entities/Recipe';
import { DeleteRecipeByidUseCase } from '@/core/use-cases/recipes/DeleteRecipeByidUseCase';
import { FirebaseRecipeRepository } from '@/infrastructure/database/recipe/FirebaseRecipeRepository';
import { useRouter } from 'next/navigation';
import React, {  useState } from 'react'



function isIngredientGroup(item: Ingredient | IngredientGroup): item is IngredientGroup {
    return 'ingredients' in item;
}

const RecipeDetailsContainsCard = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const recipeRepository = new FirebaseRecipeRepository();
    const deleteRecipeByidUseCase = new DeleteRecipeByidUseCase(recipeRepository);

    const handleEdit = () => {
        router.push(`/admin/recipes/edit/${'params'}`)
    }

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                await deleteRecipeByidUseCase.execute("s");
                router.push('/admin/recipes')
            } catch (err) {
                setError('Error deleting recipe')
                console.error(err)
            }
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-lg font-semibold">Details</h3>
                        <p><strong>Category:</strong> {recipe.category}</p>
                        <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                        <p><strong>Preparation Time:</strong> {recipe.prepTime.value} {recipe.prepTime.unit}</p>
                        <p><strong>Cooking Time:</strong> {recipe.cookingTime.value} {recipe.cookingTime.unit}</p>
                        <p><strong>Portions:</strong> {recipe.portions}</p>
                        <p><strong>Cost:</strong> €{recipe.cost}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Description</h3>
                        <p>{recipe.description}</p>
                    </div>
                </div>

                <hr className="my-4 border-t border-gray-300" />

                <div>
                    <h3 className="text-lg font-semibold">Ingredients</h3>
                    {Array.isArray(recipe.ingredients) && recipe.ingredients.map((item, index) => (
                        <div key={index}>
                            {isIngredientGroup(item) ? (
                                <div>
                                    <h4 className="font-medium">{item.name}</h4>
                                    <ul className="list-disc list-inside">
                                        {item.ingredients.map((ingredient, idx) => (
                                            <li key={idx}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p>{item.quantity} {item.unit} {item.name}</p>
                            )}
                        </div>
                    ))}
                </div>

                <hr className="my-4 border-t border-gray-300" />

                <div>
                    <h3 className="text-lg font-semibold">Steps</h3>
                    <ol className="list-decimal list-inside">
                        {recipe.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                </div>

                <hr className="my-4 border-t border-gray-300" />

                <div>
                    <h3 className="text-lg font-semibold">Tips</h3>
                    <ul className="list-disc list-inside">
                        {recipe.tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                </div>

                <hr className="my-4 border-t border-gray-300" />

                <div>
                    <h3 className="text-lg font-semibold">Additional Information</h3>
                    <p><strong>Mold Size:</strong> {recipe.moldSize}</p>
                    <p><strong>Conservation:</strong> {recipe.conservation}</p>
                    <p><strong>Date:</strong> {recipe.date?.toString()}</p>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={handleEdit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Edit Recipe
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete Recipe
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RecipeDetailsContainsCard;