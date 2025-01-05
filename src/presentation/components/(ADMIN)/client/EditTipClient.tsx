// app/tips/edit/[id]/EditTipClient.tsx
'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/presentation/state/hooks'
import Loader from '@/presentation/components/loader'
import TipForm from '@/presentation/components/(ADMIN)/form/tipForm'
import { fetchTipById } from '@/presentation/state/slices/tip/tipSlice'

export default function EditTipClient({ id }: { id: string }) {
  const dispatch = useAppDispatch()
  const { currentTip, status, error } = useAppSelector(state => state.tips)

  useEffect(() => {
    console.log('Fetching tip with ID:', id)
    dispatch(fetchTipById(id))
  }, [dispatch, id])

  // Debug
  console.log('Status:', status)
  console.log('Current Tip:', currentTip)
  console.log('Error:', error)

  if (status === 'loading') return <Loader />
  if (status === 'failed') return <div>Error: {error}</div>
  if (!currentTip) return <div>No tip found with ID: {id}</div>

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Modifica Articolo</h1>
        <TipForm existingTip={currentTip} />
      </div>
    </div>
  )
}