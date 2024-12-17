'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function RecipeFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [prepTime, setPrepTime] = useState(searchParams.get('prepTime') || '')

  const handleFilter = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    if (difficulty) current.set('difficulty', difficulty)
    else current.delete('difficulty')
    if (category) current.set('category', category)
    else current.delete('category')
    if (prepTime) current.set('prepTime', prepTime)
    else current.delete('prepTime')
    const search = current.toString()
    const query = search ? `?${search}` : ''
    router.push(`/ricette${query}`)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Filtri</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
            Difficoltà
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Tutte</option>
            <option value="facile">Facile</option>
            <option value="media">Media</option>
            <option value="difficile">Difficile</option>
          </select>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Categoria
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Tutte</option>
            <option value="dolci">Dolci</option>
            <option value="salati">Salati</option>
            <option value="bevande">Bevande</option>
          </select>
        </div>
        <div>
          <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700">
            Tempo di preparazione
          </label>
          <select
            id="prepTime"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Tutti</option>
            <option value="15">Fino a 15 minuti</option>
            <option value="30">Fino a 30 minuti</option>
            <option value="60">Fino a 1 ora</option>
            <option value="120">Più di 1 ora</option>
          </select>
        </div>
        <button
          onClick={handleFilter}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Applica filtri
        </button>
      </div>
    </div>
  )
}

