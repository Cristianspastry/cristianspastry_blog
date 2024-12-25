import { Timestamp } from 'firebase/firestore';
import { Recipe } from '@/core/entities/Recipe';

export class RecipeMapper {
  static toDomain(data: Record<string, unknown>): Recipe {
    let date: Date | undefined;
    if (data.date) {
      if (data.date instanceof Timestamp) {
        date = data.date.toDate();
      } else if (typeof data.date === 'string') {
        date = new Date(data.date);
      }
    }

    return {
      id: data.id as string,
      title: data.title as string,
      slug: data.slug as string,
      category: data.category as string,
      image: data.image as string,
      description: data.description as string,
      difficulty: data.difficulty as string,
      prepTime: data.prepTime as { value: number; unit: string },
      cookingTime: data.cookingTime as { value: number; unit: string },
      moldSize: data.moldSize as string,
      portions: data.portions as number,
      cost: data.cost as Recipe['cost'],
      steps: data.steps as string[],
      tips: data.tips as string[],
      conservation: data.conservation as string,
      date,
      isFeatured: data.isFeatured as boolean,
      isPopular: data.isPopular as boolean,
      isRecent: data.isRecent as boolean,
      isSpecial: data.isSpecial as boolean,
      ingredients: data.ingredients as Recipe['ingredients'],
    };
  }

  static toFirestore(recipe: Recipe): { [key: string]: unknown } {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = recipe;
    return {
      ...rest,
      date: recipe.date instanceof Date 
        ? recipe.date.toISOString()
        : recipe.date || new Date().toISOString(),
    };
  }

  static toPersistence(recipe: Recipe): { [key: string]: unknown } {
    return this.toFirestore(recipe);
  }
}