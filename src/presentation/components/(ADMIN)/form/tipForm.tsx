'use client'

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Tip } from '@/core/entities/Tip';
import generateSlug from '@/shared/utils/generateSlug';
import { saveTip } from '@/presentation/state/slices/tip/tipSlice';
import { AdminRoutes } from '@/routes/Routes';
import { AppDispatch } from '@/presentation/state/store';

interface TipFormProps {
  existingTip?: Tip;
}

const TipForm: React.FC<TipFormProps> = ({ existingTip }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Tip>({
    defaultValues: existingTip || {
      id: '',
      slug: '',
      title: '',
      content: '',
      imageUrl: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  });

  const title = watch('title');

  useEffect(() => {
    if (title) {
      const slug = generateSlug(title);
      setValue('slug', slug, { shouldValidate: true });
    }
  }, [title, setValue]);

  const onSubmit = async (data: Tip) => {
    try {
        if (!data.slug) {
            data.slug = generateSlug(data.title);
        }
        
        const tipData: Tip = {
            ...data,
            updatedAt: new Date().toISOString(),
            createdAt: data.createdAt || new Date().toISOString(),
            
        };
        
        await dispatch(saveTip(tipData)).unwrap();
        router.push(AdminRoutes.Tips.link);
    } catch (error) {
        alert(`Errore nel salvataggio: ${error instanceof Error ? error.message : 'Errore sconosciuto'}`);
    }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <label htmlFor="title" className="block font-medium">Titolo</label>
        <input
          {...register("title", { required: "Il titolo è obbligatorio" })}
          type="text"
          id="title"
          className="w-full p-2 border rounded"
        />
        {errors.title && <span className="text-red-500">{errors.title.message}</span>}
      </div>

      <div>
        <label htmlFor="slug" className="block font-medium">Slug</label>
        <input
          {...register("slug", { required: "Lo slug è obbligatorio" })}
          type="text"
          id="slug"
          className="w-full p-2 border rounded bg-gray-100"
          readOnly
        />
        {errors.slug && <span className="text-red-500">{errors.slug.message}</span>}
      </div>

      <div>
        <label htmlFor="content" className="block font-medium">Contenuto</label>
        <textarea
          {...register("content", { required: "La descrizione è obbligatoria" })}
          id="content"
          rows={6}
          className="w-full p-2 border rounded"
        />
        {errors.content && <span className="text-red-500">{errors.content.message}</span>}
      </div>

      <div>
        <label htmlFor="imageUrl" className="block font-medium">URL Immagine</label>
        <input
          {...register("imageUrl")}
          type="url"
          id="imageUrl"
          className="w-full p-2 border rounded"
          placeholder="https://..."
        />
        {errors.imageUrl && <span className="text-red-500">{errors.imageUrl.message}</span>}
      </div>

      <button 
        type="submit" 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        {existingTip ? 'Aggiorna Tip' : 'Salva Tip'}
      </button>
    </form>
  );
};

export default TipForm;

