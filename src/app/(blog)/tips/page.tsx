
import { Suspense, } from "react"
import { Metadata } from "next"
import TipsPageContent from "@/presentation/components/(BLOG)/pages/TipsPageContent"

export const metadata: Metadata = {
  title: 'Tips & Consigli | Cristian\'s Pastry',
  description: 'Scopri i nostri preziosi consigli e suggerimenti per migliorare le tue tecniche di pasticceria.',
  openGraph: {
    title: 'Tips & Consigli | Cristian\'s Pastry',
    description: 'Scopri i nostri preziosi consigli e suggerimenti per migliorare le tue tecniche di pasticceria.',
    images: ['/images/tips-og.jpg'],
  },
}


export default function TipsPage() {
  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<div>Caricamento...</div>}>
        <TipsPageContent />
      </Suspense>
    </div>
  )
}

