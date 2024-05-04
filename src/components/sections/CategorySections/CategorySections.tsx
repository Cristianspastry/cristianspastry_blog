


import CategoryCard from '@/components/card/CategoryCard'
import { Category } from '@/model/category'
import React from 'react'

type Props = {
    categories: Category[]
}

function CategorySections({categories}: Props) {
  return (
    <>
     <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mostra le ultime ricette */}
          {categories.map((category : Category) => (
            <>
            <CategoryCard key={category.id} category={category} />
            </>
          ))}
        </section>
    </>
  )
}

export default CategorySections