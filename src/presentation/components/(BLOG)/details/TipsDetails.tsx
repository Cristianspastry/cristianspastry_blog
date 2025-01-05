"use client"
import Image from "next/image"
import { ArrowLeft, Book } from 'lucide-react'
import { useAppDispatch, useAppSelector } from "@/presentation/state/hooks"
import { fetchTipBySlug } from "@/presentation/state/slices/tip/tipSlice"
import { useEffect } from "react"
import { RecipeDetailsButton } from "@/presentation/components/(BLOG)/button/RecipeDetailsButtons"

type Props = {
  slug: string
}

const TipDetails = ({ slug }: Props) => {
  const dispatch = useAppDispatch();
  const { currentTip, status, error } = useAppSelector(state => state.tips);

  useEffect(() => {
    if (slug) {
      dispatch(fetchTipBySlug(slug));
    }
  }, [slug, dispatch]);

  if (status === 'loading') {
    return <div>Caricamento tip...</div>;
  }

  if (status === 'failed') {
    return <div>Errore: {error}</div>;
  }

  if (!currentTip) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Tip non trovato</h1>
        <p className="text-xl text-gray-600 mb-8">Il tip che stai cercando non esiste o potrebbe essere stato rimosso.</p>
        <RecipeDetailsButton icon={<ArrowLeft className="w-4 h-4 mr-2" />} text="Torna ai tips" />
      </div>
    )
  }

  return (
    <main className="px-5 py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <h1 className="text-4xl md:text-5xl font-bold text-sky-700 text-center pt-8 px-6">
            {currentTip.title}
          </h1>

          <div className="relative mx-auto px-6 my-8">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={currentTip.imageUrl}
                alt={currentTip.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="object-cover transform transition duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 to-transparent"></div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            <div className="prose max-w-none">
              <div className="text-gray-700 whitespace-pre-wrap">
                {currentTip.content}
              </div>
            </div>

            <div className="text-sm text-gray-500 italic text-right">
              Ultimo aggiornamento: {new Date(currentTip.updatedAt).toLocaleDateString('it-IT')}
            </div>

            <div className="flex justify-center space-x-4 pt-4">
              <RecipeDetailsButton icon={<ArrowLeft className="w-4 h-4 mr-2" />} text="Indietro" />
              <RecipeDetailsButton icon={<Book className="w-4 h-4 mr-2" />} text="Altri tips" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default TipDetails

