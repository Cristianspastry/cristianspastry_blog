import { Tip } from "../../entities/Tip";


interface  ITipRepository {
    // Recupera tutti i tips
    getAllTips(): Promise<Tip[]>;
  
    // Recupera un tip per ID
    getTipById(id: string): Promise<Tip | null>;
  
    // Aggiunge un nuovo tip
    addTip(tip: Tip): Promise<Tip>;
  
    // Aggiorna un tip esistente
    updateTip(id: string, updatedTip: Tip): Promise<Tip>;
  
    // Elimina un tip
    deleteTip(id: string): Promise<void>;
  
    // Recupera i tips filtrati per categoria
    getTipsByCategory(category: string): Promise<Tip[]>;
  
    // Cerca tips per titolo o contenuto
    searchTips(query: string): Promise<Tip[]>;
  }
  
  export default ITipRepository;