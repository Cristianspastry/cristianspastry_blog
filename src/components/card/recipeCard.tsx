// components/RecipeCard.tsx
import { Ricetta } from '@/model/ricetta';
import Link from 'next/link';

const RecipeCard: React.FC<{ recipe: Ricetta }> = ({ recipe }) => {
  return (
    <Link href={`/ricette/${recipe.id}`} passHref>
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      
        <img src={recipe.imageUrl} alt={recipe.titolo} className="h-48 w-full object-cover" />
      
      <div className="p-4">
        <h1 className='text-xl font-semibold text-gray-800 hover:text-blue-600'>
          {recipe.titolo}
        </h1>
        <p className="text-black mt-1 mb-2 bg-gray-200 rounded-full px-2 py-1 w-max ">{recipe.categoria.titolo}</p>
        <p className="text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: recipe.descrizione }}></p>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Tempo di preparazione: {recipe.tempoDiPreparazione.tempo} {recipe.tempoDiPreparazione.tipoTempo}</p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default RecipeCard;
