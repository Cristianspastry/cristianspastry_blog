import React from 'react'
import { INGREDIENTS, QUANTITY_TYPE } from '@/shared/utils/Constants'
import { Recipe } from '@/types/Recipe'

interface RecipeIngredientSectionProps {
  recipe?: Recipe
  setRecipe: React.Dispatch<React.SetStateAction<Recipe>>
  errors?: Partial<Record<keyof Recipe, string>>
}

export default function RecipeIngredientSection({ 
  recipe, 
  setRecipe, 
  errors 
}: RecipeIngredientSectionProps) {
  // Toggle between simple and grouped ingredient list
  const toggleIngredientListType = () => {
    setRecipe(prev => ({
      ...prev,
      useSimpleIngredientList: !prev.useSimpleIngredientList,
      // Reset ingredients when switching
      ingredients: !prev.useSimpleIngredientList 
        ? [] 
        : [{ items: [{ quantity: 0, unit: '', name: '' }] }]
    }));
  };

  // Add a new ingredient group
  const addIngredientGroup = () => {
    setRecipe(prev => ({
      ...prev,
      ingredients: [
        ...prev.ingredients, 
        { 
          groupTitle: `Gruppo ${prev.ingredients.length + 1}`, 
          items: [{ quantity: 0, unit: '', name: '' }] 
        }
      ]
    }));
  };

  // Remove an ingredient group
  const removeIngredientGroup = (groupIndex: number) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, index) => index !== groupIndex)
    }));
  };

  // Add an ingredient to a specific group
  const addIngredient = (groupIndex?: number) => {
    setRecipe(prev => {
      const newIngredients = [...prev.ingredients];
      
      // For simple ingredient list
      if (groupIndex === undefined) {
        newIngredients[0].items.push({ quantity: 0, unit: '', name: '' });
      } else {
        // For grouped ingredients
        newIngredients[groupIndex].items.push({ quantity: 0, unit: '', name: '' });
      }
      
      return { ...prev, ingredients: newIngredients };
    });
  };

  // Remove an ingredient from a specific group
  const removeIngredient = (groupIndex: number, ingredientIndex: number) => {
    setRecipe(prev => {
      const newIngredients = [...prev.ingredients];
      newIngredients[groupIndex].items.splice(ingredientIndex, 1);
      return { ...prev, ingredients: newIngredients };
    });
  };

  // Update a specific ingredient
  const updateIngredient = (
    groupIndex: number, 
    ingredientIndex: number, 
    field: keyof Recipe['ingredients'][number]['items'][number], 
    value: string | number
  ) => {
    setRecipe(prev => {
      // Create a deep copy of ingredients
      const newIngredients = prev.ingredients.map(group => ({
        ...group,
        items: group.items.map(item => ({...item}))
      }));
  
      // Type-safe update
      if (field === 'quantity') {
        newIngredients[groupIndex].items[ingredientIndex].quantity = 
          typeof value === 'string' ? parseFloat(value) : value;
      } else {
        newIngredients[groupIndex].items[ingredientIndex][field] = value as string;
      }
  
      return { ...prev, ingredients: newIngredients };
    });
  };
  // Update group title
  const updateGroupTitle = (groupIndex: number, title: string) => {
    setRecipe(prev => {
      const newIngredients = [...prev.ingredients];
      newIngredients[groupIndex].groupTitle = title;
      return { ...prev, ingredients: newIngredients };
    });
  };

  return (
    <div className="mb-4">
      {/* Checkbox to toggle ingredient list type */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={!recipe.useSimpleIngredientList}
            onChange={toggleIngredientListType}
            className="mr-2"
          />
          Usa gruppi di ingredienti
        </label>
      </div>

      {/* Simple Ingredient List */}
      {recipe.useSimpleIngredientList ? (
        <div className="mb-4">
          <h3 className="font-bold mb-2">Ingredienti</h3>
          {recipe.ingredients[0]?.items.map((ingredient, ingredientIndex) => (
            <div key={ingredientIndex} className="flex mb-2 items-center space-x-2">
              <input
                type="number"
                value={ingredient.quantity}
                onChange={(e) => updateIngredient(0, ingredientIndex, 'quantity', e.target.value)}
                className="p-2 border rounded w-1/4"
                placeholder="Quantità"
              />
              <select
                value={ingredient.unit}
                onChange={(e) => updateIngredient(0, ingredientIndex, 'unit', e.target.value)}
                className="p-2 border rounded w-1/4"
              >
                <option value="">Unità</option>
                {QUANTITY_TYPE.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
              <select
                value={ingredient.name}
                onChange={(e) => updateIngredient(0, ingredientIndex, 'name', e.target.value)}
                className="p-2 border rounded flex-grow"
              >
                <option value="">Seleziona Ingrediente</option>
                {Object.entries(INGREDIENTS).map(([categoria, lista]) => (
                  <optgroup key={categoria} label={categoria.replace(/([A-Z])/g, " $1").trim()}>
                    {lista.map((ingrediente, index) => (
                      <option key={`${categoria}-${index}`} value={ingrediente}>
                        {ingrediente}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <button 
                type="button" 
                onClick={() => removeIngredient(0, ingredientIndex)} 
                className="p-2 bg-red-500 text-white rounded"
              >
                Rimuovi
              </button>
            </div>
          ))}
          <button 
            type="button" 
            onClick={() => addIngredient()} 
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Aggiungi ingrediente
          </button>
        </div>
      ) : (
        // Grouped Ingredient List
        <div className="mb-4">
          <h3 className="font-bold mb-2">Gruppi di Ingredienti</h3>
          {recipe.ingredients.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-4 p-4 border rounded">
              <div className="flex items-center mb-2 space-x-2">
                <input
                  type="text"
                  value={group.groupTitle || ''}
                  onChange={(e) => updateGroupTitle(groupIndex, e.target.value)}
                  className="p-2 border rounded flex-grow"
                  placeholder="Nome del gruppo (opzionale)"
                />
                <button 
                  type="button" 
                  onClick={() => removeIngredientGroup(groupIndex)} 
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Rimuovi gruppo
                </button>
              </div>
              
              {group.items.map((ingredient, ingredientIndex) => (
                <div key={ingredientIndex} className="flex mb-2 items-center space-x-2">
                  <input
                    type="number"
                    value={ingredient.quantity}
                    onChange={(e) => updateIngredient(groupIndex, ingredientIndex, 'quantity', e.target.value)}
                    className="p-2 border rounded w-1/4"
                    placeholder="Quantità"
                  />
                  <select
                    value={ingredient.unit}
                    onChange={(e) => updateIngredient(groupIndex, ingredientIndex, 'unit', e.target.value)}
                    className="p-2 border rounded w-1/4"
                  >
                    <option value="">Unità</option>
                    {QUANTITY_TYPE.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                  <select
                    value={ingredient.name}
                    onChange={(e) => updateIngredient(groupIndex, ingredientIndex, 'name', e.target.value)}
                    className="p-2 border rounded flex-grow"
                  >
                    <option value="">Seleziona Ingrediente</option>
                    {Object.entries(INGREDIENTS).map(([categoria, lista]) => (
                      <optgroup key={categoria} label={categoria.replace(/([A-Z])/g, " $1").trim()}>
                        {lista.map((ingrediente, index) => (
                          <option key={`${categoria}-${index}`} value={ingrediente}>
                            {ingrediente}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <button 
                    type="button" 
                    onClick={() => removeIngredient(groupIndex, ingredientIndex)} 
                    className="p-2 bg-red-500 text-white rounded"
                  >
                    Rimuovi
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => addIngredient(groupIndex)} 
                className="mt-2 p-2 bg-blue-500 text-white rounded"
              >
                Aggiungi ingrediente
              </button>
            </div>
          ))}
          
          <button 
            type="button" 
            onClick={addIngredientGroup} 
            className="mt-2 p-2 bg-green-500 text-white rounded"
          >
            Aggiungi gruppo di ingredienti
          </button>
        </div>
      )}

      {/* Error handling */}
      {errors?.ingredients && (
        <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
      )}
    </div>
  );
}