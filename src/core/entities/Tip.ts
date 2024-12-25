

export interface Tip {
    id: string; // Un identificatore unico per il tip
    slug : string; // Un identificatore unico per il tip
    title: string; // Il titolo del tip
    description: string; // Il contenuto del tip (spiegazione o informazione)
     imageUrl: string; // Un URL opzionale per un'immagine associata al tip
    createdAt: Date | string; // Data di creazione del tip
    updatedAt: Date | string; // Data dell'ultimo aggiornamento del tip
}