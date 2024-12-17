import Image from "next/image"
import { ArrowLeft, Book, ChefHat, Clock, CookingPot, DollarSign, } from 'lucide-react'
import { Metadata, ResolvingMetadata } from "next"
import { FirebaseRecipeRepository } from "@/infrastructure/repositories/FirebaseRecipeRepository"
import { GetRecipeBySlugUseCase } from "@/core/useCases/recipes/GetRecipeBySlug"
import { IngredientGroup, IngredientOrGroup, Recipe } from "@/core/domain/entities/Recipe"
import Accordion from "@/presentation/components/(BLOG)/accordion/accordion"
import { RecipeDetailsButton } from "@/presentation/components/(BLOG)/button/RecipeDetailsButtons"
import MoldCakeIcon from '../../../../../public/mold.svg';


type Props = {
  params: { 
    slug: Promise<string | null>, 
   }
}


export async function generateMetadata(
  { params }: Props,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parent: ResolvingMetadata,
): Promise<Metadata> {

  // inniettiamo il repository nel uses case 
  const recipeRepository = new FirebaseRecipeRepository();
  const getRecipeBySlugUseCase = new GetRecipeBySlugUseCase(recipeRepository);
  // Get the recipe by slug
  const recipe = await getRecipeBySlugUseCase.execute(params.slug)


  // If the recipe doesn't exist, return default metadata
  if (!recipe) {
    return {
      title: 'Ricetta non trovata | Cristian\'s Pastry',
      description: 'La ricetta richiesta non è stata trovata.',
    }
  }

  // Generate metadata based on the recipe
  return {
    title: recipe.title + ' | Cristian\'s Pastry',
    description: recipe.description,
    openGraph: {
      title: recipe.title + ': Ricetta Dettagliata | Cristian\'s Pastry',
      description: recipe.description,
      images: [{ url: recipe.image }],
    },
  }
}


export default async function RecipePage({ params }: Props) {


  // inniettiamo il repository nel uses case 
  const recipeRepository = new FirebaseRecipeRepository();
  const getRecipeBySlugUseCase = new GetRecipeBySlugUseCase(recipeRepository);

  // Get the recipe by slug
  const recipe: Recipe | null = await getRecipeBySlugUseCase.execute(params.slug)


  // Check if the recipe exists 
  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Ricetta non trovata</h1>
        <p className="text-xl text-gray-600 mb-8">La ricetta che stai cercando non esiste o potrebbe essere stata rimossa.</p>
        <RecipeDetailsButton icon={<ArrowLeft className="w-4 h-4 mr-2" />} text="Torna alle ricette" />
      </div>
    )
  }


  // Funzione per ordinare e visualizzare la lista
  const renderOrderedList = (items: string[]) => {
    return items.map((item, index) => (
      <li key={index} className="text-gray-700">
        {`${index + 1}. ${item}`}
      </li>
    ));
  };

  // Controlla se tips è una stringa e trasformalo in array
  const tipsList = Array.isArray(recipe.tips) ? recipe.tips : recipe.tips ? [recipe.tips] : [];


  function isIngredientGroup(item: IngredientOrGroup): item is IngredientGroup {
    return 'ingredients' in item;
  }

  return (
    <>
      <main className="px-5 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

            <h1 className="text-4xl md:text-5xl font-bold text-sky-700 text-center pt-8 px-6">
              {recipe.title}
            </h1>

            <p className="text-gray-600 text-center text-lg italic px-6 mt-2 mb-8">
              {recipe.category}
            </p>

            <p
              className="text-gray-600 text-center text-lg italic px-6 mt-2 mb-8"

              style={{ whiteSpace: 'pre-wrap' }}
              suppressHydrationWarning
            >
              {recipe.description}
            </p>

            <div className="relative mx-auto px-6 mb-8">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="object-cover transform transition duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 to-transparent"></div>
              </div>
            </div>

            <div className="p-6 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div className="bg-sky-50 p-4 rounded-xl flex items-center space-x-3">
                  <Clock className="text-sky-700 w-6 h-6" />
                  <div>
                    <p className="text-sm text-sky-700 font-medium">Tempo</p>
                    <p className="text-gray-900">{recipe.prepTime.value}{recipe.prepTime.unit}</p>
                  </div>
                </div>


                {recipe.cookingTime && (
                  <div className="bg-sky-50 p-4 rounded-xl flex items-center space-x-3">
                    <CookingPot className="text-sky-700 w-6 h-6" />
                    <div>
                      <p className="text-sm text-sky-700 font-medium">Tempo di Cottura</p>
                      <p className="text-gray-900">{recipe.cookingTime.value}{recipe.cookingTime.unit}</p>
                    </div>
                  </div>
                )}

                {recipe.difficulty && (
                  <div className="bg-sky-50 p-4 rounded-xl flex items-center space-x-3">
                    <ChefHat className="text-sky-700 w-6 h-6" />
                    <div>
                      <p className="text-sm text-sky-700 font-medium">Difficoltà</p>
                      <p className="text-gray-900">{recipe.difficulty}</p>
                    </div>
                  </div>
                )}

                {recipe.moldSize && (
                  <div className="bg-sky-50 p-4 rounded-xl flex items-center space-x-3">
                    <Image src={MoldCakeIcon} alt="Stampo" width={30} height={30} />
                    <div>
                      <p className="text-sm text-sky-700 font-medium">Stampo</p>
                      <p className="text-gray-900">{recipe.moldSize}</p>
                    </div>
                  </div>
                )}

                {recipe.portions && (
                  <div className="bg-sky-50 p-4 rounded-xl flex items-center space-x-3">
                    <div>
                      <p className="text-sm text-sky-700 font-medium">Porzioni</p>
                      <p className="text-gray-900">{recipe.portions}</p>
                    </div>
                  </div>
                )}

                {recipe.cost && (
                  <div className="bg-sky-50 p-4 rounded-xl flex items-center space-x-3">
                    <DollarSign className="text-sky-700 w-6 h-6" />
                    <div>
                      <p className="text-sm text-sky-700 font-medium">Costo</p>
                      <p className="text-gray-900">{recipe.cost}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border border-sky-100 rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-sky-800 mb-4 flex items-center border-b border-sky-800 pb-2">
                  Ingredienti
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {Array.isArray(recipe.ingredients) && recipe.ingredients.map((item, index) => (
                    <div key={index}>
                      {isIngredientGroup(item) ? (
                        <div>
                          <h3 className="font-semibold text-sky-700 mb-2">{item.name}</h3>
                          <ul className="list-disc list-inside">
                            {item.ingredients.map((ingredient, idx) => (
                              <li key={idx} className="text-gray-700">
                                {ingredient.quantity} {ingredient.unit} {ingredient.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="text-gray-700">
                          {item.quantity} {item.unit} {item.name}
                        </div>
                      )}
                    </div>
                  ))}

                </div>
              </div>


              <div className="bg-sky-50 rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-sky-800 mb-4">Preparazione</h2>
                <ol className="space-y-4">
                  {recipe.steps.map((step, index) => (
                    <li key={index} className="flex space-x-4 items-start">
                      <span className="flex-shrink-0 w-8 h-8 bg-sky-700 text-white rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {tipsList.length > 0 && (
                <Accordion title="Consigli di Cristian">
                  <ul className="space-y-2">
                    {renderOrderedList(tipsList)}
                  </ul>
                </Accordion>
              )}


              {recipe.conservation && (
                <div className="border border-sky-100 rounded-xl p-6">
                  <h2 className="text-2xl font-semibold text-sky-800 mb-4 flex items-center">
                    Conservazione
                  </h2>
                  <p className="text-gray-700">{recipe.conservation}</p>
                </div>
              )}

              <div className="flex justify-center space-x-4 pt-4">
                <RecipeDetailsButton icon={<ArrowLeft className="w-4 h-4 mr-2" />} text="Indietro" />
                <RecipeDetailsButton icon={<Book className="w-4 h-4 mr-2" />} text="Altre ricette" />
              </div>
            </div>
          </div>

        </div>
      </main>

    </>
  )
}