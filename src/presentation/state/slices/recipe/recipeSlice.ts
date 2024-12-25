import { createSlice, createAsyncThunk, PayloadAction,} from "@reduxjs/toolkit";
import { Ingredient, IngredientGroup, Recipe } from "@/core/entities/Recipe";
import { getAllRecipes, getRecipeById, getRecipeBySlug, saveRecipe } from "@/core/use-cases/recipes";
import { serializeDates } from "@/shared/utils/serializeDates";

export const fetchRecipes = createAsyncThunk("recipes/fetchAll", async () => {
  const recipes = await getAllRecipes();
  return serializeDates(recipes);
});

export const fetchRecipeBySlug = createAsyncThunk(
  "recipes/fetchBySlug",
  async (slug: string) => {
    const recipe = await getRecipeBySlug(slug);
    return serializeDates(recipe);
  }
);

export const SaveRecipe = createAsyncThunk<Recipe, Recipe>(
  "recipes/save",
  async (recipe: Recipe, { rejectWithValue }) => {
    try {
      const savedRecipe = await saveRecipe(recipe);
      return savedRecipe as unknown as Recipe; // Restituisci sempre un Recipe
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Errore durante il salvataggio');
    }
  }
);

export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchById',
  async (id: string) => {
    console.log('Fetching recipe with ID:', id);
    const response = await getRecipeById(id);
    if (!response) throw new Error('Recipe not found');
    console.log('Fetched recipe:', response);
    return serializeDates(response  as unknown as Recipe);
  }
);

export const searchRecipes = createAsyncThunk(
  'recipes/search',
  async (searchTerm: string) => {
    const recipes = await getAllRecipes();
    return recipes.filter((recipe) => 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.slug.toLowerCase().includes(searchTerm.toLowerCase())
    ).map((recipe) => serializeDates(recipe));
  }
);

interface RecipeFormState {
  useSimpleIngredientList: boolean;
  simpleIngredients: Ingredient[];
  ingredientGroups: IngredientGroup[];
  steps: string[];
  tips: string[];
}

interface RecipeState {
  recipes: Recipe[];
  currentRecipe: Recipe | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  form: RecipeFormState;
  search: {
    results: Recipe[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
}

const initialState: RecipeState = {
  recipes: [],
  currentRecipe: null,
  status: "idle",
  error: null,
  form: {
    useSimpleIngredientList: true,
    simpleIngredients: [{ quantity: '', unit: '', name: '' }],
    ingredientGroups: [{ name: '', ingredients: [{ quantity: '', unit: '', name: '' }] }],
    steps: [''],
    tips: ['']
  },
  search: {
    results: [],
    status: "idle",
    error: null
  }
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setUseSimpleIngredientList: (state, action: PayloadAction<boolean>) => {
      state.form.useSimpleIngredientList = action.payload;
    },
    addIngredient: (state, action: PayloadAction<number | undefined>) => {
      const groupIndex = action.payload;
      if (groupIndex !== undefined) {
        state.form.ingredientGroups[groupIndex].ingredients.push({ quantity: '', unit: '', name: '' });
      } else {
        state.form.simpleIngredients.push({ quantity: '', unit: '', name: '' });
      }
    },
    removeIngredient: (state, action: PayloadAction<{ groupIndex: number; ingredientIndex: number }>) => {
      const { groupIndex, ingredientIndex } = action.payload;
      if (groupIndex === 0 && state.form.useSimpleIngredientList) {
        state.form.simpleIngredients = state.form.simpleIngredients.filter((_, index) => index !== ingredientIndex);
      } else {
        state.form.ingredientGroups[groupIndex].ingredients = 
          state.form.ingredientGroups[groupIndex].ingredients.filter((_, index) => index !== ingredientIndex);
      }
    },
    updateIngredient: (state, action: PayloadAction<{
      groupIndex: number;
      ingredientIndex: number;
      field: keyof Ingredient;
      value: string;
    }>) => {
      const { groupIndex, ingredientIndex, field, value } = action.payload;
      if (groupIndex === 0 && state.form.useSimpleIngredientList) {
        state.form.simpleIngredients[ingredientIndex][field] = value;
      } else {
        state.form.ingredientGroups[groupIndex].ingredients[ingredientIndex][field] = value;
      }
    },
    addIngredientGroup: (state) => {
      state.form.ingredientGroups.push({ 
        name: '', 
        ingredients: [{ quantity: '', unit: '', name: '' }] 
      });
    },
    removeIngredientGroup: (state, action: PayloadAction<number>) => {
      state.form.ingredientGroups = state.form.ingredientGroups
        .filter((_, index) => index !== action.payload);
    },
    updateIngredientGroupName: (state, action: PayloadAction<{ 
      groupIndex: number; 
      name: string 
    }>) => {
      const { groupIndex, name } = action.payload;
      state.form.ingredientGroups[groupIndex].name = name;
    },
    addStep: (state) => {
      state.form.steps.push('');
    },
    removeStep: (state, action: PayloadAction<number>) => {
      state.form.steps = state.form.steps.filter((_, index) => index !== action.payload);
    },
    updateStep: (state, action: PayloadAction<{ index: number; value: string }>) => {
      const { index, value } = action.payload;
      state.form.steps[index] = value;
    },
    addTip: (state) => {
      state.form.tips.push('');
    },
    removeTip: (state, action: PayloadAction<number>) => {
      state.form.tips = state.form.tips.filter((_, index) => index !== action.payload);
    },
    updateTip: (state, action: PayloadAction<{ index: number; value: string }>) => {
      const { index, value } = action.payload;
      state.form.tips[index] = value;
    },
    resetForm: (state) => {
      state.form = initialState.form;
    }
  },
  extraReducers: (builder) => {
    // Existing cases...
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch recipes";
      })

      .addCase(fetchRecipeBySlug.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipeBySlug.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentRecipe = action.payload;
      })
      .addCase(fetchRecipeBySlug.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch recipe";
      })

      .addCase(SaveRecipe.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(SaveRecipe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentRecipe = action.payload;
        state.error = null;
      })
      .addCase(SaveRecipe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string || "Errore durante il salvataggio";
        console.error("SaveRecipe rejected:", action.payload);
      })

      .addCase(fetchRecipeById.pending, (state) => {
        state.status = 'loading';
        state.currentRecipe = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentRecipe = action.payload; // Imposta la ricetta
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch recipe';
      })

      .addCase(searchRecipes.pending, (state) => {
        state.search.status = "loading";
        state.search.error = null;
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.search.status = "succeeded";
        state.search.results = action.payload;
        state.search.error = null;
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.search.status = "failed";
        state.search.error = action.error.message || "Failed to search recipes";
      });
  
      
  }
});

export const {
  setUseSimpleIngredientList,
  addIngredient,
  removeIngredient,
  updateIngredient,
  addIngredientGroup,
  removeIngredientGroup,
  updateIngredientGroupName,
  addStep,
  removeStep,
  updateStep,
  addTip,
  removeTip,
  updateTip,
  resetForm
} = recipeSlice.actions;

export default recipeSlice.reducer;
