
import { Tip } from '@/core/entities/Tip';
import TipCard from '../Card/TipCard';

interface TipsGridProps {
  tips: Tip[];
}

export default function TipsGrid({ tips,}: TipsGridProps) {
  
  // Ordina gli articoli per data più recente

  const sortedTips = [...tips].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());


  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {sortedTips.map((tip) => (
        <TipCard key={tip.id ?? tip.slug} tip={tip} />
      ))}
    </div>
  );
}