import { useState, useCallback, useEffect } from 'react';
import { useForm,SubmitHandler } from 'react-hook-form';
import { CATEGORIES, DIFFICULTY, TIME_UNITY } from '@/core/common/utils/Constants';
import { Recipe } from '@/types/Recipe';
import { SaveRecipeUseCase } from '@/core/useCases/recipes/SaveRecipeUseCase';
import { FirebaseRecipeRepository } from '@/infrastructure/repositories/FirebaseRecipeRepository';


type Ingredient = {
  quantity: string;
  unit: string;
  name: string;
};

type IngredientGroup = {
  name: string;
  ingredients: Ingredient[];
};

export type RecipeFormData = {
  id?: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  description: string;
  difficulty: string;
  prepTime: { value: number; unit: string };
  cookingTime: { value: number; unit: string };
  moldSize: string;
  portions: number;
  cost: number;
  steps: string[];
  tips: string;
  conservation: string;
  date: string;
  ingredients?: Ingredient[] | IngredientGroup[];
};


 const generateSlug = (slug: string|undefined) => {
    // Mappa di caratteri accentati ai loro equivalenti non accentati
    const accentMap: { [key: string]: string } = {
      'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a',
      'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
      'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
      'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
      'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
      'ý': 'y', 'ÿ': 'y',
      'ñ': 'n',
      'ç': 'c'
    };
  
    // Normalizza il testo sostituendo i caratteri accentati
    const normalizedText = slug?.toLowerCase().split('').map(char => {
      return accentMap[char] || char;
    }).join('');
  
    // Sostituisce spazi con trattini e rimuove caratteri non desiderati
    return normalizedText!
      .replace(/\s+/g, '-')           // sostituisce spazi con trattini
      .replace(/[^a-z0-9-]/g, '')     // rimuove caratteri non alfanumerici eccetto trattini
      .replace(/-+/g, '-')            // rimuove trattini multipli consecutivi
      .replace(/^-|-$/g, '');         // rimuove trattini all'inizio e alla fine
  };

export const useRecipeForm = (existingRecipe?: RecipeFormData) => {
  const [useSimpleIngredientList, setUseSimpleIngredientList] = useState(true);
  const [simpleIngredients, setSimpleIngredients] = useState<Ingredient[]>([{ quantity: '', unit: '', name: '' }]);
  const [ingredientGroups, setIngredientGroups] = useState<IngredientGroup[]>([{ name: '', ingredients: [{ quantity: '', unit: '', name: '' }] }]);
  const [steps, setSteps] = useState<string[]>(['']);

  const form = useForm<RecipeFormData>({
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
      cost: 0,
      steps: [''],
      tips: '',
      conservation: '',
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

  // Genera lo slug dal titolo
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'title') {
        const slug = generateSlug(value?.title);
        form.setValue('slug', slug);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit: SubmitHandler<Recipe> = async (data) => {
    const recipeRepository = new FirebaseRecipeRepository();
    const saveRecipeUseCase = new SaveRecipeUseCase(recipeRepository);
    try {
      const recipeData = {
        ...data,
        ingredients: useSimpleIngredientList ? simpleIngredients : ingredientGroups,
        steps: steps,
      };

      await saveRecipeUseCase.execute(recipeData);
      alert(existingRecipe ? 'Ricetta aggiornata con successo!' : 'Nuova ricetta aggiunta con successo!');
    } catch (error) {
      console.error('Errore durante il salvataggio della ricetta:', error);
      alert('Si è verificato un errore durante il salvataggio della ricetta. Riprova.');
    }
  };
  return {
    ...form,
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
    onSubmit,
  };
};

