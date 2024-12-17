import Image from 'next/image'
import Link from 'next/link'
import { Recipe } from '@/core/domain/entities/Recipe'
import { DollarSign, Clock } from 'lucide-react'
import { BlogRoutes } from '@/routes/Routes'
interface RecipeCardProps {
  recipe: Recipe
  featured?: boolean
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe,}) => {
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    {/* Image Container */}
    <div className="relative h-48 w-full">
        <Image
            src={recipe.image}
            alt={`${recipe.title} IMMAGINE NON TROVATA`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
    </div>

    {/* Content */}
    <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
            {recipe.title}
        </h3>

        <div className="text-gray-600 mb-4 text-sm line-clamp-2"
        >
            {recipe.description}
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-yellow-400" />
                <span>{recipe.cost}</span>
            </div>

            <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{recipe.prepTime.unit}{' '}{recipe.prepTime.value}</span>
            </div>

            <span className="text-bluModerato font-medium">
                {recipe.difficulty}
            </span>
        </div>

        {/* CTA Button */}
        <Link
            href={BlogRoutes.Recipes.subLinks + recipe.slug}
            className="block w-full text-center bg-bluModerato text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors"
        >
            Scopri di più
        </Link>
    </div>
</article>
  )
}

export default RecipeCard;

