



import React from 'react'

type Props = {
    largeCard:{ 
    imageUrl: string;
    title: string;
    category: string;
    description: string;
    preparationTime: string;
   },
}

const LargeRecipeCard = ({largeCard}: Props) => {
  return (
    <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Immagine */}
            <img src={largeCard.imageUrl} alt={largeCard.title} className="h-64 w-full object-cover" />
            {/* Contenuto */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{largeCard.title}</h2>
              {/* Categoria */}
              <p className="text-black mt-1 mb-2 bg-gray-200 rounded-full px-2 py-1 w-max ">{largeCard.category}</p>

              <p className="text-gray-600 line-clamp-3">{largeCard.description}</p>
              {/* Tempo di preparazione */}
              <p className="text-gray-500 mt-2">Tempo di preparazione: {largeCard.preparationTime}</p>
            </div>
          </div>
        </div>
  )
}

export default LargeRecipeCard