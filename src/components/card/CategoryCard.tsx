



import { Category } from '@/model/category'
import Link from 'next/link'
import React from 'react'

type Props = {
    category: Category
}

function CategoryCard({category}: Props) {
  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link href={`/recipes/${'category.id'}`}>
       
          <img src={category.imageUrl} alt={category.titolo} className="h-48 w-full object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.titolo}</h3>
            
          </div>
       
      </Link>
    </div>
    </>
  )
}

export default CategoryCard