
import { Tip } from '@/core/entities/Tip';
import TipCard from '../Card/TipCard';

interface TipsGridProps {
  tips: Tip[];
}

export default function TipsGrid({ tips,}: TipsGridProps) {
  
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tips.map((tip) => (
        <TipCard key={tip.id ?? tip.slug} tip={tip} />
      ))}
    </div>
  );
}