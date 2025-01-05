import { DB_Firestore } from "@/config/firebase";
import { Tip } from "@/core/entities/Tip";
import ITipRepository from "@/core/interfaces/tip/ITipRepository";
import { TipMapper } from "@/infrastructure/mappers/tip/TipMapper";
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  setDoc
} from "firebase/firestore";

class FirebaseTipRepository implements ITipRepository {
    private readonly collectionName = 'tips';
    private readonly db = DB_Firestore;

    async getAllTips(): Promise<Tip[]> {
        const querySnapshot = await getDocs(collection(this.db, this.collectionName));
        return querySnapshot.docs.map(doc => TipMapper.toDomain({ id: doc.id, ...doc.data() }));
    }

    async getTipById(id: string): Promise<Tip | null> {
        const docRef = doc(this.db, this.collectionName, id);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
            return null;
        }
        
        return TipMapper.toDomain({ id: docSnap.id, ...docSnap.data() });
    }

    async getTipBySlug(slug: string): Promise<Tip | null> {
        const q = query(collection(this.db, this.collectionName), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            return null;
        }
        
        const doc = querySnapshot.docs[0];
        return TipMapper.toDomain({ id: doc.id, ...doc.data() });
    }

    async addTip(tip: Tip): Promise<Tip> {
        const newTipRef = await addDoc(collection(this.db, this.collectionName), {
            ...TipMapper.toPersistence(tip),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        
        // Crea un nuovo oggetto tip con l'ID di Firebase
        const newTip: Tip = {
            ...tip,
            id: newTipRef.id
        };
        
        // Aggiorna il documento con l'ID corretto
        await setDoc(newTipRef, TipMapper.toPersistence(newTip));
        
        return newTip;
    }

    
    async updateTip(id: string, updatedTip: Tip): Promise<Tip> {
        const docRef = doc(this.db, this.collectionName, id);
        const updateData = {
            ...TipMapper.toPersistence(updatedTip),
            updatedAt: new Date().toISOString()
        };
        
        await updateDoc(docRef, updateData);
        return updatedTip;
    }

    async deleteTip(id: string): Promise<void> {
        const docRef = doc(this.db, this.collectionName, id);
        await deleteDoc(docRef);
    }

    async getTipsByCategory(category: string): Promise<Tip[]> {
        const q = query(collection(this.db, this.collectionName), where("category", "==", category));
        const querySnapshot = await getDocs(q);
        
        return querySnapshot.docs.map(doc => TipMapper.toDomain({ id: doc.id, ...doc.data() }));
    }

    async searchTips(query: string): Promise<Tip[]> {
        const querySnapshot = await getDocs(collection(this.db, this.collectionName));
        const lowercaseQuery = query.toLowerCase();
        
        return querySnapshot.docs
            .map(doc => TipMapper.toDomain({ id: doc.id, ...doc.data() }))
            .filter(tip => 
                tip.title.toLowerCase().includes(lowercaseQuery) ||
                tip.content.toLowerCase().includes(lowercaseQuery)
            );
    }
}

export default FirebaseTipRepository;