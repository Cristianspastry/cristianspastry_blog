import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import SearchResults from './search-results';
import { use } from 'react';

export const metadata = {
  title: 'Risultati di ricerca',
  description: 'Risultati della ricerca di ricette',
};

interface SearchPageProps {
  searchParams: Promise<{ q: string }>;
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const params = use(searchParams);
  const searchTerm = params.q;

  if (!searchTerm) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Risultati di ricerca per: {searchTerm}</h1>
      <Suspense fallback={<div>Caricamento risultati...</div>}>
        <SearchResults searchTerm={searchTerm} />
      </Suspense>
    </div>
  );
}

