
import { Suspense, } from "react"
import { Metadata } from "next"
import RecipesPageContent from "@/presentation/components/(BLOG)/pages/RecipesPageContent"

export const metadata: Metadata = {
  title: 'Le Nostre Ricette | Cristian\'s Pastry',
  description: 'Esplora la nostra collezione di deliziose ricette di pasticceria.',
  openGraph: {
    title: 'Le Nostre Ricette | Cristian\'s Pastry',
    description: 'Esplora la nostra collezione di deliziose ricette di pasticceria.',
    images: ['/images/recipes-og.jpg'],
  },
}

export default function RecipesPage() {
  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<div>Caricamento...</div>}>
        <RecipesPageContent />
      </Suspense>
    </div>
  )
}

