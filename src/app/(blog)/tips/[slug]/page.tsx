import { store } from "@/presentation/state/store"
import { fetchTipBySlug } from "@/presentation/state/slices/tip/tipSlice"
import { Metadata } from "next"
import TipDetails from "@/presentation/components/(BLOG)/details/TipsDetails"

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  let tip = store.getState().tips.currentTip;

  if (!tip || tip.slug !== params.slug) {
    await store.dispatch(fetchTipBySlug(params.slug));
    tip = store.getState().tips.currentTip;
  }

  if (!tip) {
    return {
      title: 'Tip non trovato | Cristian\'s Pastry',
      description: 'Il tip richiesto non è stato trovato.',
    }
  }

  return {
    title: `${tip.title} | Cristian's Pastry`,
    description: tip.content.substring(0, 160),
    openGraph: {
      title: `${tip.title}: Tip di Pasticceria | Cristian's Pastry`,
      description: tip.content.substring(0, 160),
      images: [{ url: tip.imageUrl }],
    },
  }
}

export default function TipDetailsPage({ params }: Props) {
  return (
    <TipDetails slug={params.slug} />
  )
}

