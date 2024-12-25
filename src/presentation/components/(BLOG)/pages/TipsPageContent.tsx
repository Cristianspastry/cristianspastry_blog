"use client";
import { useEffect } from 'react';
import RecipeLoader from '../loader/RecipeLoader';
import { fetchTips } from '@/presentation/state/slices/tip/tipSlice';
import TipsGrid from '../grid/TipsGrid';
import { useAppDispatch, useAppSelector } from '@/presentation/state/hooks';
import NoTipsMessage from '../shared/NoTipsMessage';

export default function TipsPageContent() {
  const dispatch = useAppDispatch();
  const { tips, status: isLoading, error } = useAppSelector((state) => state.tips);

  useEffect(() => {
    // Fetch tips when component mounts
    dispatch(fetchTips());
  }, [dispatch]);

  // Visualizza il loader durante il caricamento
  if (isLoading === 'loading') {
    return (
      <div className="container mx-auto py-8">
        <RecipeLoader />
      </div>
    );
  }

  // Visualizza il messaggio di errore se presente
  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Si è verificato un errore
          </h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => dispatch(fetchTips())}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Riprova
          </button>
        </div>
      </div>
    );
  }

  // Visualizza il messaggio se non ci sono ricette
  if (!tips || tips.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <NoTipsMessage />
      </div>
    );
  }

  // Visualizza le ricette
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <TipsGrid tips={tips} />
      </div>
    </div>
  );
}