import { COST, Ingredient, Recipe } from '@/core/entities/Recipe';
import { useEffect } from 'react';
import { useForm,} from 'react-hook-form';
import generateSlug from '@/shared/utils/generateSlug';
import { useRouter } from 'next/navigation';
import { AdminRoutes } from '@/routes/Routes';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { addIngredient, addIngredientGroup, addStep, addTip, removeIngredient, removeIngredientGroup, removeStep, removeTip, resetForm, SaveRecipe, setUseSimpleIngredientList, updateIngredient, updateIngredientGroupName, updateStep, updateTip } from '../state/slices/recipe/recipeSlice';

export const useRecipeForm = (existingRecipe?: Recipe | null) => {
  const loading = useAppSelector(state => state.recipes.status === 'loading');
  const error = useAppSelector(state => state.recipes.error);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    useSimpleIngredientList,
    simpleIngredients,
    ingredientGroups,
    steps,
    tips
  } = useAppSelector(state => state.recipes.form);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Recipe>({
    defaultValues: existingRecipe || {
      id: '',
      title: '',
      category: '',
      conservation: '',
      image: '',
      description: '',
      difficulty: '',
      prepTime: { value: 0, unit: 'min' },
      cookingTime: { value: 0, unit: 'min' },
      moldSize: '',
      portions: 0,
      cost: COST.BASSO,
      isFeatured: false,
      isPopular: false,
      isRecent: false,
      isSpecial: false,
      slug: '',
      ingredients: [{ quantity: '', unit: '', name: '' }],
      steps: [''],
      tips: ['']
    },
  });

  useEffect(() => {
    if (existingRecipe) {
      if (Array.isArray(existingRecipe.ingredients) && existingRecipe.ingredients.length > 0) {
        dispatch(setUseSimpleIngredientList(!('name' in existingRecipe.ingredients[0])));
      }
    }
  }, [existingRecipe, dispatch]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        const slug = generateSlug(value.title || '');
        setValue('slug', slug);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const onSubmit = async (data: Recipe) => {
    try {
      // Ensure date is set if not present
      const recipeWithDate = {
        ...data,
        date: data.date || new Date()
      };
      
      const resultAction = await dispatch(SaveRecipe(recipeWithDate));
      
      if (SaveRecipe.fulfilled.match(resultAction)) {
        alert('Salvato con successo!');
        router.push(AdminRoutes.Home.link);
      } else if (SaveRecipe.rejected.match(resultAction)) {
        throw new Error(resultAction.error.message || 'Errore sconosciuto durante il salvataggio');
      }
    } catch (error) {
      console.error('Errore nel salvataggio:', error);
      alert(`Errore nel salvataggio: ${error instanceof Error ? error.message : 'Errore sconosciuto'}`);
    }
    resetForm();
  };

  return {
  form: { register, handleSubmit, formState: { errors }, setValue },
  useSimpleIngredientList,
  setUseSimpleIngredientList: (value: boolean) => dispatch(setUseSimpleIngredientList(value)),
  simpleIngredients,
  ingredientGroups,
  addIngredient: (groupIndex?: number) => dispatch(addIngredient(groupIndex)),
  removeIngredient: (groupIndex: number, ingredientIndex: number) => 
    dispatch(removeIngredient({ groupIndex, ingredientIndex })),
  addIngredientGroup: () => dispatch(addIngredientGroup()),
  removeIngredientGroup: (groupIndex: number) => dispatch(removeIngredientGroup(groupIndex)),
  handleIngredientChange: (groupIndex: number, ingredientIndex: number, field: keyof Ingredient, value: string) =>
    dispatch(updateIngredient({ groupIndex, ingredientIndex, field, value })),
  updateIngredientGroupName: (groupIndex: number, name: string) =>
    dispatch(updateIngredientGroupName({ groupIndex, name })),
  steps,
  addStep: () => dispatch(addStep()),
  removeStep: (index: number) => dispatch(removeStep(index)),
  updateStep: (index: number, value: string) => dispatch(updateStep({ index, value })),
  tips,
  addTip: () => dispatch(addTip()),
  removeTip: (index: number) => dispatch(removeTip(index)),
  updateTip: (index: number, value: string) => dispatch(updateTip({ index, value })),
  onSubmit: handleSubmit(onSubmit),
  loading,
  error
};
};

