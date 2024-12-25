import { store } from "@/presentation/state/store"
import RecipeDetails from "@/presentation/components/(BLOG)/details/RecipeDetails"
import { fetchRecipeBySlug } from "@/presentation/state/slices/recipe/recipeSlice";
import { Metadata } from "next";


type Props = {
  params: Promise<{ slug: string }>
}


export async function generateMetadata(
  { params }: Props,

): Promise<Metadata> {
  let recipe = store.getState().recipes.currentRecipe;

  if (!recipe || recipe.slug !== (await params).slug) {
    // Se la ricetta non è nello store o non corrisponde allo slug corrente, la recuperiamo dal database
    await store.dispatch(fetchRecipeBySlug((await params).slug));
    recipe = store.getState().recipes.currentRecipe;
  }

  if (!recipe) {
    return {
      title: 'Ricetta non trovata | Cristian\'s Pastry',
      description: 'La ricetta richiesta non è stata trovata.',
    }
  }

  return {
    title: `${recipe.title} | Cristian's Pastry`,
    description: recipe.description,
    openGraph: {
      title: `${recipe.title}: Ricetta Dettagliata | Cristian's Pastry`,
      description: recipe.description,
      images: [{ url: recipe.image }],
    },
  }
}


export default function RecipeDetailsPage({ params }: Props) {

  return (
    <RecipeDetails params={params} />
  )
}