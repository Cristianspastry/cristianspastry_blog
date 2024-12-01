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
    cost: number;
    steps: string[];
    tips: string[];
    conservation: string;
    date: string;
    ingredients: Ingredient[] | IngredientGroup[];
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
  
  