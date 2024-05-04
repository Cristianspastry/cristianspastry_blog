



import CategorySections from '@/components/sections/CategorySections/CategorySections'
import { Category } from '@/model/category'
import React from 'react'

type Props = {}

function RicettePage({}: Props) {
  const Categories : Category[] = [
    {
      id: '1',
      titolo: 'Primi',
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: '2',
      titolo: 'Secondi',
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: '3',
      titolo: 'Dessert',
      imageUrl: 'https://via.placeholder.com/150'
    }
  ]
  return (
    <>
    <main className="max-w-screen-lg mx-auto px-4 py-8">
         <div className=" flex justify-between">
         <h1 className="text-3xl font-semibold text-left mb-8">Categorie</h1>
         
         </div>
         <CategorySections categories={Categories} />
      </main>
    </>
  )
}

export default RicettePage