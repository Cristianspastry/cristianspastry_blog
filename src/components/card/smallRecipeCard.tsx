


import React from 'react'

type Props = {
    smallCard: {
        imageUrl: string;
        title: string;
        category: string;
        description: string;
        preparationTime: string;
    },
}

const SmallRecipeCard = ({smallCard}: Props) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Immagine */}
            <img src={smallCard.imageUrl} className="h-32 w-full object-cover" alt={smallCard.title}/>
            {/* Contenuto */}
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{smallCard.title}</h2>
                {/* Categoria */}
                <p className="text-black mt-1 mb-2 bg-gray-200 rounded-full px-2 py-1 w-max ">{smallCard.category}</p>

                <p className="text-gray-600 line-clamp-2">{smallCard.description}</p>
                {/* Tempo di preparazione */}
                <p className="text-gray-500 mt-2">Tempo di preparazione: {smallCard.preparationTime}</p>
            </div>
        </div>
    )
}

export default SmallRecipeCard