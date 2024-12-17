"use client"
import { Recipe } from '@/core/domain/entities/Recipe';
import { useCallback, useEffect, useState } from 'react';
import { useForm, SubmitHandler,} from 'react-hook-form';
import { Ingredient, IngredientGroup } from '@/core/domain/entities/Recipe';
import { CATEGORIES,DIFFICULTY, TIME_UNITY } from '@/core/common/utils/Constants';
import { SaveRecipeUseCase } from '@/core/useCases/recipes/SaveRecipeUseCase';
import { FirebaseRecipeRepository } from '@/infrastructure/repositories/FirebaseRecipeRepository';
import generateSlug from '@/core/common/utils/generateSlug';
import { AdminRoutes } from '@/routes/Routes';
import { useRouter } from 'next/navigation';


export const useRecipeForm = (existingRecipe?: Recipe | null) => {
  const [useSimpleIngredientList, setUseSimpleIngredientList] = useState(true);
  const [simpleIngredients, setSimpleIngredients] = useState<Ingredient[]>([{ quantity: '', unit: '', name: '' }]);
  const [ingredientGroups, setIngredientGroups] = useState<IngredientGroup[]>([{ name: '', ingredients: [{ quantity: '', unit: '', name: '' }] }]);
  const [steps, setSteps] = useState<string[]>(['']);
  const [tips, setTips] = useState<string[]>(['']); // New state for tips
  const router = useRouter();

  const form = useForm<Recipe>({
    defaultValues: existingRecipe || {
      title: '',
      slug: '',
      category: CATEGORIES[0],
      image: '',
      description: '',
      difficulty: DIFFICULTY[0],
      prepTime: { value: 0, unit: TIME_UNITY[0] },
      cookingTime: { value: 0, unit: TIME_UNITY[0] },
      moldSize: '',
      portions: 1,
      cost: 'Basso',
      steps: [''],
      tips: [''], // Initialize with an empty tip
      conservation: '',
      isFeatured: false,
      isPopular: false,
      isRecent: false,
      isSpecial: false,
      date: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    if (existingRecipe) {
      if (Array.isArray(existingRecipe.ingredients) && existingRecipe.ingredients.length > 0) {
        if ('name' in existingRecipe.ingredients[0]) {
          setUseSimpleIngredientList(false);
          setIngredientGroups(existingRecipe.ingredients as IngredientGroup[]);
        } else {
          setUseSimpleIngredientList(true);
          setSimpleIngredients(existingRecipe.ingredients as Ingredient[]);
        }
      }
      setSteps(existingRecipe.steps || ['']);
      setTips(existingRecipe.tips || ['']); // Set tips from existing recipe
    }
  }, [existingRecipe]);

  useEffect(() => {
    if (existingRecipe) {
      if (Array.isArray(existingRecipe.ingredients) && existingRecipe.ingredients.length > 0) {
        if ('name' in existingRecipe.ingredients[0]) {
          setUseSimpleIngredientList(false);
          setIngredientGroups(existingRecipe.ingredients as IngredientGroup[]);
        } else {
          setUseSimpleIngredientList(true);
          setSimpleIngredients(existingRecipe.ingredients as Ingredient[]);
        }
      }
      setSteps(existingRecipe.steps || ['']);
      setTips(existingRecipe.tips || ['']); // Set tips from existing recipe
    }
  }, [existingRecipe]);

  const addIngredient = useCallback((groupIndex?: number) => {
    if (groupIndex !== undefined) {
      setIngredientGroups(prev => {
        const newGroups = [...prev];
        newGroups[groupIndex].ingredients.push({ quantity: '', unit: '', name: '' });
        return newGroups;
      });
    } else {
      setSimpleIngredients(prev => [...prev, { quantity: '', unit: '', name: '' }]);
    }
  }, []);

  const removeIngredient = useCallback((groupIndex: number, ingredientIndex: number) => {
    if (groupIndex === 0 && useSimpleIngredientList) {
      setSimpleIngredients(prev => prev.filter((_, index) => index !== ingredientIndex));
    } else {
      setIngredientGroups(prev => {
        const newGroups = [...prev];
        newGroups[groupIndex].ingredients = newGroups[groupIndex].ingredients.filter((_, index) => index !== ingredientIndex);
        return newGroups;
      });
    }
  }, [useSimpleIngredientList]);

  const addIngredientGroup = useCallback(() => {
    setIngredientGroups(prev => [...prev, { name: '', ingredients: [{ quantity: '', unit: '', name: '' }] }]);
  }, []);

  const removeIngredientGroup = useCallback((groupIndex: number) => {
    setIngredientGroups(prev => prev.filter((_, index) => index !== groupIndex));
  }, []);

  const handleIngredientChange = useCallback((groupIndex: number, ingredientIndex: number, field: keyof Ingredient, value: string) => {
    if (groupIndex === 0 && useSimpleIngredientList) {
      setSimpleIngredients(prev => {
        const newIngredients = [...prev];
        newIngredients[ingredientIndex] = { ...newIngredients[ingredientIndex], [field]: value };
        return newIngredients;
      });
    } else {
      setIngredientGroups(prev => {
        const newGroups = [...prev];
        newGroups[groupIndex].ingredients[ingredientIndex] = { ...newGroups[groupIndex].ingredients[ingredientIndex], [field]: value };
        return newGroups;
      });
    }
  }, [useSimpleIngredientList]);

  const updateIngredientGroupName = useCallback((groupIndex: number, newName: string) => {
    setIngredientGroups(prev => {
      const newGroups = [...prev];
      newGroups[groupIndex].name = newName;
      return newGroups;
    });
  }, []);

  const addStep = useCallback(() => {
    setSteps(prev => [...prev, '']);
  }, []);

  const removeStep = useCallback((index: number) => {
    setSteps(prev => prev.filter((_, i) => i !== index));
  }, []);

  const updateStep = useCallback((index: number, value: string) => {
    setSteps(prev => {
      const newSteps = [...prev];
      newSteps[index] = value;
      return newSteps;
    });
  }, []);

  const addTip = useCallback(() => {
    setTips(prev => {
      const newTips = [...prev, ''];
      form.setValue('tips', newTips);
      return newTips;
    });
  }, [form]);

  const removeTip = useCallback((index: number) => {
    setTips(prev => {
      const newTips = prev.filter((_, i) => i !== index);
      form.setValue('tips', newTips);
      return newTips;
    });
  }, [form]);

  const updateTip = useCallback((index: number, value: string) => {
    setTips(prev => {
      const newTips = [...prev];
      newTips[index] = value;
      form.setValue('tips', newTips);
      return newTips;
    });
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'title') {
        const slug = generateSlug(value.title || '');
        form.setValue('slug', slug);
      }
      if (name === 'tips') {
        setTips((value.tips || []).filter((tip): tip is string => typeof tip === 'string'));
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const resetForm = useCallback(() => {
    form.reset();
    setSimpleIngredients([{ quantity: '', unit: '', name: '' }]);
    setIngredientGroups([{ name: '', ingredients: [{ quantity: '', unit: '', name: '' }] }]);
    setSteps(['']);
    setTips(['']);
    setUseSimpleIngredientList(true);
  }, [form]);

  const onSubmit: SubmitHandler<Recipe> = async (data) => {
    const firebaseRecipeRepository = new FirebaseRecipeRepository();
    const saveRecipeUseCase = new SaveRecipeUseCase(firebaseRecipeRepository);
    try {
      const recipeData = {
        ...data,
        ingredients: useSimpleIngredientList ? simpleIngredients : ingredientGroups,
        steps: steps,
        tips: (data.tips || []).filter((tip): tip is string => typeof tip === 'string'),
      };
      console.log('Salvataggio ricetta:', recipeData);
      await saveRecipeUseCase.execute(recipeData);
      alert(existingRecipe ? 'Ricetta aggiornata con successo!' : 'Nuova ricetta aggiunta con successo!');
      router.push(AdminRoutes.Recipes.link)
    } catch (error) {
      console.error('Errore durante il salvataggio della ricetta:', error);
      alert('Si è verificato un errore durante il salvataggio della ricetta. Riprova.');
    }

    resetForm();
  };



  return {
    form,
    useSimpleIngredientList,
    setUseSimpleIngredientList,
    simpleIngredients,
    ingredientGroups,
    addIngredient,
    removeIngredient,
    addIngredientGroup,
    removeIngredientGroup,
    handleIngredientChange,
    updateIngredientGroupName,
    steps,
    addStep,
    removeStep,
    updateStep,
    tips, // Expose tips state
    addTip, // Expose addTip function
    removeTip, // Expose removeTip function
    updateTip, // Expose updateTip function
    onSubmit: form.handleSubmit(onSubmit),
 
  };
};

