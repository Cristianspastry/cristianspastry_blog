import { doc, setDoc, updateDoc, collection, getDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Recipe } from '@/core/domain/entities/Recipe';
import { RecipeRepository } from '@/core/domain/repositories/RecipeRepository';

export class FirebaseRecipeRepository implements RecipeRepository {
  private readonly collectionName = 'recipes';

  async save(recipe: Recipe): Promise<void> {
    const newRecipeRef = doc(collection(db, this.collectionName));
    await setDoc(newRecipeRef, { ...recipe, id: newRecipeRef.id });
  }

  async update(id: string, recipe: Recipe): Promise<void> {
    const recipeData = this.convertRecipeToFirestoreData(recipe);
    await updateDoc(doc(db, this.collectionName, id), recipeData );
  }

  async getById(id: string): Promise<Recipe | null> {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() as Recipe : null;
  }

  async getBySlug(slug: string): Promise<Recipe | null> {
    const querySnapshot = await getDocs(collection(db, this.collectionName));
    return querySnapshot.docs.find(doc => doc.data().slug === slug)?.data() as Recipe || null;
  }

  async getAll(): Promise<Recipe[]> {
    const querySnapshot = await getDocs(collection(db, this.collectionName));
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Recipe);
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, this.collectionName, id));
  }

  
  private convertRecipeToFirestoreData(data: any): { [key: string]: any } {
    if (typeof data !== 'object' || data === null) {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map(item => this.convertRecipeToFirestoreData(item));
    }

    return Object.entries(data).reduce((acc, [key, value]) => {
      if (key === 'id') {
        return acc; // Skip the id field
      }
      acc[key] = this.convertRecipeToFirestoreData(value);
      return acc;
    }, {} as { [key: string]: any });
  }
}

