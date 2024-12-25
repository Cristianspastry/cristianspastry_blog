import { DB_Firestore } from "@/config/firebase";
import { Tip } from "@/core/entities/Tip";
import ITipRepository from "@/core/interfaces/tip/ITipRepository";
import { TipMapper } from "@/infrastructure/mappers/tip/TipMapper";
import { collection, getDocs } from "firebase/firestore";


class FirebaseTipRepository implements ITipRepository {
    private readonly collectionName = 'tips';
    private readonly db = DB_Firestore;


    async getAllTips(): Promise<Tip[]> {
        const querySnapshot = await getDocs(collection(this.db, this.collectionName));
        return querySnapshot.docs.map(doc => TipMapper.toDomain({ id: doc.id, ...doc.data() }));
    }

    getTipById(id: string): Promise<Tip | null> {
        console.log('getTipById:', id);
        return Promise.resolve(null);
    }
    addTip(tip: Tip): Promise<Tip> {
        console.log('addTip:', tip);
        return Promise.resolve(tip);
    }
    updateTip(id: string, updatedTip: Tip): Promise<Tip> {
        console.log('updateTip:', id, updatedTip);
        return Promise.resolve(updatedTip);
    }
    deleteTip(id: string): Promise<void> {
        throw new Error("Method not implemented.");
        console.log('deleteTip:', id);
    }
    getTipsByCategory(category: string): Promise<Tip[]> {
        throw new Error("Method not implemented.");
        console.log('getTipsByCategory:', category);
    }
    searchTips(query: string): Promise<Tip[]> {
        throw new Error("Method not implemented.");
        console.log('searchTips:', query);
    }

}

export default FirebaseTipRepository