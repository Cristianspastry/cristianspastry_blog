export interface Recipe {
  id?: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  description: string;
  difficulty: string;
  prepTime: TimeValue;
  cookingTime: TimeValue;
  moldSize: string;
  portions: number;
  cost: COST;
  steps: string[];
  tips: string[];
  conservation: string;
  date: Date;
  isFeatured: boolean;
  isPopular: boolean;
  isRecent: boolean;
  isSpecial: boolean;
  ingredients: Ingredient[] | IngredientGroup[];
}

export enum COST {
  BASSO = "Basso",
  MEDIO = "Medio",
  ALTO = "Alto",
}

export interface TimeValue {
  value: number;
  unit: string;
}

export interface Ingredient {
  quantity: string;
  unit: string;
  name: string;
}

export interface IngredientGroup {
  name: string;
  ingredients: Ingredient[];
}

export type IngredientOrGroup = Ingredient | IngredientGroup;

export interface RecipeFilters {
  difficulty?: string;
  category?: string;
  prepTime?: number;
  cost?: COST;
  isPopular?: boolean;
  isRecent?: boolean;
  isSpecial?: boolean;
}

export type RecipeSortField = 'date' | 'title' | 'difficulty' | 'prepTime' | 'cookingTime' | 'portions' | 'cost';

export interface RecipeSortOption {
  field: RecipeSortField;
  direction: 'asc' | 'desc';
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

