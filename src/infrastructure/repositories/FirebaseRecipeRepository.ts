import { doc, setDoc, updateDoc, collection, getDoc, getDocs, deleteDoc, query, where, orderBy, getCountFromServer, startAfter, limit } from 'firebase/firestore';
import { PaginationOptions, Recipe, RecipeFilters, RecipeSortOption } from '@/core/domain/entities/Recipe';
import { RecipeRepository } from '@/core/domain/repositories/RecipeRepository';
import { DB_Firestore } from '@/config/firebase';

export class FirebaseRecipeRepository implements RecipeRepository {
  private readonly collectionName = 'recipes';
  private readonly db = DB_Firestore;
  async save(recipe: Recipe): Promise<void> {
    const newRecipeRef = doc(collection(this.db, this.collectionName));
    await setDoc(newRecipeRef, { ...recipe, id: newRecipeRef.id });
  }

  async update(id: string, recipe: Recipe): Promise<void> {
    const recipeData = this.convertRecipeToFirestoreData(recipe);
    await updateDoc(doc(this.db, this.collectionName, id), recipeData );
  }

  async getById(id: string): Promise<Recipe | null> {
    const docRef = doc(this.db, this.collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() as Recipe : null;
  }

  async getBySlug(slug: Promise<string | null>): Promise<Recipe | null> {
    const querySnapshot = await getDocs(collection(this.db, this.collectionName));
    return querySnapshot.docs.find(doc => doc.data().slug === slug)?.data() as Recipe || null;
  }

  async getAll(): Promise<Recipe[]> {
    const querySnapshot = await getDocs(collection(this.db, this.collectionName));
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Recipe);
  }

  
  async getFilteredRecipes(filters: RecipeFilters, sort: RecipeSortOption, pagination: PaginationOptions): Promise<{
    recipes: Recipe[];
    totalCount: number;
  }> {
    const recipesRef = collection(this.db, 'recipes');
    let q = query(recipesRef);

    // Applica i filtri
    if (filters.difficulty) {
      q = query(q, where('difficulty', '==', filters.difficulty));
    }
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    if (filters.prepTime) {
      q = query(q, where('prepTime.value', '<=', filters.prepTime));
    }

    // Applica l'ordinamento
    q = query(q, orderBy(sort.field, sort.direction));

    // Ottieni il conteggio totale
    const countSnapshot = await getCountFromServer(q);
    const totalCount = countSnapshot.data().count;

    // Applica la paginazione
    const startAt = (pagination.page - 1) * pagination.limit;
    q = query(q, startAfter(startAt), limit(pagination.limit));

    const recipesSnapshot = await getDocs(q);
    const recipes = recipesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Recipe));

    return { recipes, totalCount };
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(this.db, this.collectionName, id));
  }

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as { [key: string]: any });
  }
}

