'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function RecipeSorter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest')

  const handleSort = (value: string) => {
    setSortBy(value)
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.set('sort', value)
    const search = current.toString()
    const query = search ? `?${search}` : ''
    router.push(`/ricette${query}`)
  }

  return (
    <div className="flex items-center justify-end">
      <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700">
        Ordina per:
      </label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => handleSort(e.target.value)}
        className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="newest">Più recenti</option>
        <option value="oldest">Meno recenti</option>
        <option value="popular">Più popolari</option>
        <option value="difficulty_asc">Difficoltà (crescente)</option>
        <option value="difficulty_desc">Difficoltà (decrescente)</option>
      </select>
    </div>
  )
}

