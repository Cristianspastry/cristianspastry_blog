
"use client";
import { Ricetta } from '@/model/ricetta';
import Link from 'next/link';
import React, { useState } from 'react';

type Props  = {
  recipes: Ricetta[];
}

const SearchBar: React.FC<Props> = ({recipes}: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Ricetta[]>([]);


  const onSearch = (query: string) => {
    // Qui puoi gestire la logica di ricerca, ad esempio effettuando il fetch delle ricette che corrispondono alla query
    console.log('Ricerca:', query);
    // Esempio di ricerca locale (non effettua una nuova chiamata API)
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.titolo.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredRecipes);
    console.log('Ricette trovate:', filteredRecipes);
  };

  const handleSearch = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Pulisce il campo di input di ricerca
    setSearchQuery('');
    onSearch(searchQuery.trim());
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    // Utilizzo di setTimeout per ritardare l'esecuzione della ricerca
    setTimeout(() => {
      onSearch(value);
    }, 300);
  };



  return (
    <div className="relative">
      <form className="flex items-center" onSubmit={handleSearch}>
        
        <input
          type="text"
          placeholder="Cerca ricette..."
          value={searchQuery}
          onChange={handleChange}
          className="w-64 px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
         <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 absolute right-3 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 15l5-5m0 0l-5-5m5 5H4"
          />
        </svg>
      </form>
     <SearchResultList searchQuery={searchQuery} searchResults={searchResults} />
    </div>
  );
};

const SearchResultList = ({ searchQuery, searchResults } : {searchQuery: string, searchResults: Ricetta[]}) => {
  return (
    <>
    {searchQuery && (
        <div className="absolute z-10 bg-white w-64 shadow-md mt-2 rounded">
          <ul className="divide-y divide-gray-200">
            {searchResults.map((recipe) => (
              <li key={recipe.id}>
                <Link href={`/recipes/${recipe.id}`} passHref className='block px-4 py-3 hover:bg-gray-100'>
                  {recipe.titolo}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SearchBar;
