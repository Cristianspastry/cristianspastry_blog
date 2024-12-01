import { Recipe } from '@/types/Recipe'

interface RecipePreviewProps {
  recipe: Recipe
}

export function RecipePreview({ recipe }: RecipePreviewProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{recipe.titolo}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{recipe.description}</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Categoria</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{recipe.categoria}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Difficoltà</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{recipe.difficulty}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Tempo di preparazione</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {recipe.prepTime.value} {recipe.prepTime.unit}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Tempo di cottura</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {recipe.cookingTime.value} {recipe.cookingTime.unit}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Ingredienti</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {recipe.ingredients.map((group, index) => (
                <div key={index}>
                  {group.groupTitle && <h4 className="font-medium">{group.groupTitle}</h4>}
                  <ul className="list-disc pl-5">
                    {group.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        {item.quantity} {item.unit} {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Passaggi</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ol className="list-decimal pl-5">
                {recipe.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

