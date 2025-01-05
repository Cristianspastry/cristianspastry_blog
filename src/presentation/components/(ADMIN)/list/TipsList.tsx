"use client";
import { AdminRoutes, BlogRoutes } from '@/routes/Routes';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../loader';
import { AppDispatch, RootState } from '@/presentation/state/store';
import { Tip } from '@/core/entities/Tip';
import { deleteTip, fetchTips } from '@/presentation/state/slices/tip/tipSlice';

const TipsList = () => {

  const dispatch = useDispatch<AppDispatch>();
  //const router = useRouter();
  const { tips, status } = useSelector((state: RootState) => state.tips);

  useEffect(() => {
    dispatch(fetchTips());
  }, [dispatch]);

  const handleDeleteTips = async (id?: string) => {
    const result = confirm(`Sei sicuro di voler eliminare l'articolo ${id}?`);
    if (result) {
      await dispatch(deleteTip(id!));
      dispatch(fetchTips()); // Ricarica i dati
      alert(`articolo ${id} eliminato`);
    } else {
      alert(`articolo ${id} non eliminato`);
    }
  };

  if (status === "loading") {
    return <Loader />;
  }

  if (tips.length === 0) {
    return <p>Nessuna articolo trovato. Aggiungine una nuova!</p>;
  }

  return (
    <ul className="space-y-4">
      {tips.map((tip : Tip) => (
        <li
          key={tip.id}
          className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">{tip.title}</span>
            <span className="font-medium text-gray-700">{tip.slug}</span>
            
            <div className="space-x-2">
              <Link href={BlogRoutes.Tips.subLinks + tip.slug} className="text-orange-500 hover:text-orange-600 font-medium transition-all">
                Visualizza
              </Link>
              <Link href={AdminRoutes.Tips.subLinks.editTip + tip.id} className="text-green-500 hover:text-green-600 font-medium transition-all">
                Modifica
              </Link>
              <button
                className="text-red-500 hover:text-red-600 font-medium transition-all"
                onClick={() => handleDeleteTips(tip.id)}
              >
                Elimina
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TipsList;