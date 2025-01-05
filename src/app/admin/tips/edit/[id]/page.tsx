// app/tips/edit/[id]/page.tsx

import EditTipClient from "@/presentation/components/(ADMIN)/client/EditTipClient"

export default function EditTipPage({
  params,
}: {
  params: { id: string }
}) {
  return <EditTipClient id={params.id} />
}