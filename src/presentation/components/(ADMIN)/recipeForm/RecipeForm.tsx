import { CATEGORIES, DIFFICULTY, INGREDIENTS, QUANTITY_TYPE, TIME_UNITY } from '@/core/common/utils/Constants';
import { RecipeFormData, useRecipeForm } from '@/presentation/hook/useRecipeForm';
import React from 'react';

interface RecipeFormProps {
  existingRecipe?: RecipeFormData;
}

export const RecipeForm: React.FC<RecipeFormProps> = ({ existingRecipe }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
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
  } = useRecipeForm(existingRecipe);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Titolo */}
      <div>
        <label htmlFor="title" className="block font-medium">Titolo</label>
        <input
          {...register("title", { required: "Il titolo è obbligatorio" })}
          type="text"
          id="title"
          className="w-full p-2 border rounded"
        />
        {errors.title && <span className="text-red-500">{errors.title.message}</span>}
      </div>

      {/* Slug (readonly) */}
      <div>
        <label htmlFor="slug" className="block font-medium">Slug</label>
        <input
          {...register("slug")}
          type="text"
          id="slug"
          readOnly
          className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* Categoria */}
      <div>
        <label htmlFor="category" className="block font-medium">Categoria</label>
        <select
          {...register("category")}
          id="category"
          className="w-full p-2 border rounded"
        >
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Immagine */}
      <div>
        <label htmlFor="image" className="block font-medium">Immagine</label>
        <input
          {...register("image")}
          type="text"
          id="image"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Descrizione */}
      <div>
        <label htmlFor="description" className="block font-medium">Descrizione</label>
        <textarea
          {...register("description", { required: "La descrizione è obbligatoria" })}
          id="description"
          className="w-full p-2 border rounded"
        />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}
      </div>

      {/* Difficoltà */}
      <div>
        <label htmlFor="difficulty" className="block font-medium">Difficoltà</label>
        <select
          {...register("difficulty")}
          id="difficulty"
          className="w-full p-2 border rounded"
        >
          {DIFFICULTY.map((difficulty) => (
            <option key={difficulty} value={difficulty}>{difficulty}</option>
          ))}
        </select>
      </div>

      {/* Tempi di Preparazione */}
      <div>
        <label className="block font-medium">Tempo di Preparazione</label>
        <div className="flex space-x-2">
          <input
            {...register("prepTime.value", { required: true })}
            type="number"
            placeholder="Quantità"
            className="w-1/2 p-2 border rounded"
          />
          <select
            {...register("prepTime.unit")}
            className="w-1/2 p-2 border rounded"
          >
            {TIME_UNITY.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tempi di Cucina */}
      <div>
        <label className="block font-medium">Tempo di Cucina</label>
        <div className="flex space-x-2">
          <input
            {...register("cookingTime.value", { required: true })}
            type="number"
            placeholder="Quantità"
            className="w-1/2 p-2 border rounded"
          />
          <select
            {...register("cookingTime.unit")}
            className="w-1/2 p-2 border rounded"
          >
            {TIME_UNITY.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Dimensione Stampo */}
      <div>
        <label htmlFor="moldSize" className="block font-medium">Dimensione Stampo</label>
        <input
          {...register("moldSize")}
          type="text"
          id="moldSize"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Numero Porzioni */}
      <div>
        <label htmlFor="portions" className="block font-medium">Numero di Porzioni</label>
        <input
          {...register("portions", { required: true })}
          type="number"
          id="portions"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Costo */}
      <div>
        <label htmlFor="cost" className="block font-medium">Costo (€)</label>
        <input
          {...register("cost", { required: true })}
          type="number"
          id="cost"
          step="0.01"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Ingredienti */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={useSimpleIngredientList}
            onChange={() => setUseSimpleIngredientList(!useSimpleIngredientList)}
            className="mr-2"
          />
          Usa lista semplice di ingredienti
        </label>
      </div>

      {useSimpleIngredientList ? (
        <div className="mb-4">
          <h3 className="font-bold mb-2">Ingredienti</h3>
          {simpleIngredients.map((ingredient, index) => (
            <div key={index} className="flex mb-2 items-center">
              <input
                type="text"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(0, index, 'quantity', e.target.value)}
                className="p-2 border rounded mr-2 w-1/4"
                placeholder="Quantità"
              />
              <select
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(0, index, 'unit', e.target.value)}
                className="p-2 border rounded mr-2 w-1/4"
              >
                <option value="">Unità</option>
                {QUANTITY_TYPE.map(unit => <option key={unit} value={unit}>{unit}</option>)}
              </select>
              <select
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(0, index, 'name', e.target.value)}
                className="p-2 border rounded mr-2 w-1/4 flex-grow"
              >
                <option value="">Seleziona un ingrediente</option>
                {Object.entries(INGREDIENTS).map(([categoria, lista]) => (
                  <optgroup key={categoria} label={categoria}>
                    {lista.map((ingrediente, idx) => (
                      <option key={`${categoria}-${ingrediente}-${idx}`} value={ingrediente}>
                        {ingrediente}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeIngredient(0, index)}
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
        <div className="mb-4">
          <h3 className="font-bold mb-2">Gruppi di Ingredienti</h3>
          {ingredientGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-4 p-4 border rounded">
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  value={group.name}
                  onChange={(e) => updateIngredientGroupName(groupIndex, e.target.value)}
                  className="p-2 border rounded mr-2 flex-grow"
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
              {group.ingredients.map((ingredient, ingredientIndex) => (
                <div key={ingredientIndex} className="flex mb-2 items-center">
                  <input
                    type="text"
                    value={ingredient.quantity}
                    onChange={(e) => handleIngredientChange(groupIndex, ingredientIndex, 'quantity', e.target.value)}
                    className="p-2 border rounded mr-2 w-1/4"
                    placeholder="Quantità"
                  />
                  <select
                    value={ingredient.unit}
                    onChange={(e) => handleIngredientChange(groupIndex, ingredientIndex, 'unit', e.target.value)}
                    className="p-2 border rounded mr-2 w-1/4"
                  >
                    <option value="">Unità</option>
                    {QUANTITY_TYPE  .map(unit => <option key={unit} value={unit}>{unit}</option>)}
                  </select>
                  <select
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(groupIndex, ingredientIndex, 'name', e.target.value)}
                    className="p-2 border rounded mr-2 w-1/4 flex-grow"
                  >
                    <option value="">Seleziona un ingrediente</option>
                    {Object.entries( INGREDIENTS).map(([categoria, lista]) => (
                      <optgroup key={categoria} label={categoria}>
                        {lista.map((ingrediente, idx) => (
                          <option key={`${categoria}-${ingrediente}-${idx}`} value={ingrediente}>
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

      {/* Step della Ricetta */}
      <div className="mb-4">
        <h3 className="font-bold mb-2">Step della Ricetta</h3>
        {steps.map((step, index) => (
          <div key={index} className="flex mb-2 items-center">
            <textarea
              value={step}
              onChange={(e) => updateStep(index, e.target.value)}
              className="p-2 border rounded mr-2 flex-grow"
              placeholder={`Step ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeStep(index)}
              className="p-2 bg-red-500 text-white rounded"
            >
              Rimuovi
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addStep}
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Aggiungi step
        </button>
      </div>

      {/* Consigli */}
      <div>
        <label htmlFor="tips" className="block font-medium">Consigli</label>
        <input
          {...register("tips")}
          type="text"
          id="tips"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Conservazione */}
      <div>
        <label htmlFor="conservation" className="block font-medium">Conservazione</label>
        <input
          {...register("conservation")}
          type="text"
          id="conservation"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Data */}
      <div>
        <label htmlFor="date" className="block font-medium">Data</label>
        <input
          {...register("date")}
          type="date"
          id="date"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Submit */}
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        {existingRecipe ? 'Aggiorna Ricetta' : 'Salva Ricetta'}
      </button>
    </form>
  );
};
