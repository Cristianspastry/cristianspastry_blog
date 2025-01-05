import Image from 'next/image'
import Link from 'next/link'
import { Tip } from '@/core/entities/Tip'
import { Lightbulb, Tag } from 'lucide-react'
import { BlogRoutes } from '@/routes/Routes'

interface TipCardProps {
  tip: Tip

}

const TipCard: React.FC<TipCardProps> = ({ tip, }) => {
  return (
    <article className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow `}>
      {/* Image Container */}
      <div className="relative h-48 w-full">
        <Image
          src={tip.imageUrl || '/placeholder.svg?height=192&width=384'}
          alt={`${tip.title} IMMAGINE NON TROVATA`}
          fill
          className="object-cover aspect-video"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
          {tip.title}{ tip.slug}
        </h3>

        <div className="text-gray-600 mb-4 text-sm line-clamp-2">
          {tip.content}
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <span>Tip #{tip.title}</span>
          </div>

          <div className="flex items-center gap-1">
            <Tag className="w-4 h-4" />
            <span>{/*tip.category */'General'}</span>
          </div>

        </div>

        {/* CTA Button */}
        <Link
          href={`${BlogRoutes.Tips.link}/${tip.slug}`}
         
          key={tip.id}
          className="block w-full text-center bg-bluModerato text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors"
        >
         Leggi L&apos;articolo
        </Link>
      </div>
    </article>
  )
}

export default TipCard

