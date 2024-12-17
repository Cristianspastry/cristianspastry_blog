import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import SearchResults from './search-results';

export const metadata = {
  title: 'Risultati di ricerca',
  description: 'Risultati della ricerca di ricette',
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const searchTerm = searchParams.q;

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

