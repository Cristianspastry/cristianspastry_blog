import {
  doc,
  setDoc,
  updateDoc,
  collection,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  orderBy,
  getCountFromServer,
  startAfter,
  limit,
  FieldValue
} from 'firebase/firestore';
import { PaginationOptions, Recipe, RecipeFilters, RecipeSortOption } from '@/core/entities/Recipe';
import { DB_Firestore } from '@/config/firebase';
import { IRecipeRepository } from '@/core/interfaces/recipe/IRecipeRepository';
import { RecipeMapper } from '@/infrastructure/mappers/recipe/RecipeMapper';

export class FirebaseRecipeRepository implements IRecipeRepository {
  private readonly collectionName = 'recipes';
  private readonly db = DB_Firestore;



  
  async save(recipe: Recipe): Promise<void> {
    const newRecipeRef = doc(collection(this.db, this.collectionName));
    const mappedData = RecipeMapper.toPersistence(recipe);
    await setDoc(newRecipeRef, { ...mappedData, id: newRecipeRef.id, });
  }

  async update(id: string, recipe: Recipe): Promise<void> {
    const recipeData: { [key: string]: FieldValue | Partial<unknown> | undefined } = this.convertRecipeToFirestoreData(recipe);
    await updateDoc(doc(this.db, this.collectionName, id), recipeData);
  }

  async getById(id: string): Promise<Recipe | null> {
    const docRef = doc(this.db, this.collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? RecipeMapper.toDomain({ id: docSnap.id, ...docSnap.data() }) : null;
  }

  async getBySlug(slug: string): Promise<Recipe | null> {
    const recipesRef = collection(this.db, this.collectionName);
    const q = query(recipesRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return RecipeMapper.toDomain({ id: doc.id, ...doc.data() });
  }

  async getAll(): Promise<Recipe[]> {
    const querySnapshot = await getDocs(collection(this.db, this.collectionName));
    return querySnapshot.docs.map(doc => RecipeMapper.toDomain({ id: doc.id, ...doc.data() }));
  }

  async getFilteredRecipes(filters: RecipeFilters, sort: RecipeSortOption, pagination: PaginationOptions): Promise<{
    recipes: Recipe[];
    totalCount: number;
  }> {
    const recipesRef = collection(this.db, this.collectionName);
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
    const querySnapshot = await getDocs(
      query(q, startAfter((pagination.page - 1) * pagination.limit), limit(pagination.limit))
    );

    const recipes = querySnapshot.docs.map(doc =>
      RecipeMapper.toDomain({ id: doc.id, ...doc.data() })
    );

    return { recipes, totalCount };
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(this.db, this.collectionName, id));
  }


   // Funzione per convertire i dati in un formato compatibile con Firestore
   private convertRecipeToFirestoreData(
    data: unknown
  ): { [key: string]: FieldValue | Partial<unknown> | undefined } {
    if (typeof data !== 'object' || data === null) {
      return {}; // Restituisce un oggetto vuoto se i dati non sono validi
    }
  
    if (Array.isArray(data)) {
      // Se è un array, lo converte ricorsivamente
      return data.reduce((acc, item, index) => {
        acc[index.toString()] = this.convertRecipeToFirestoreData(item);
        return acc;
      }, {} as { [key: string]: FieldValue | Partial<unknown> | undefined });
    }
  
    // Gestisce un oggetto
    return Object.entries(data as Record<string, unknown>).reduce((acc, [key, value]) => {
      if (key === 'id') {
        return acc; // Salta il campo "id"
      }
      acc[key] = typeof value === 'object' ? this.convertRecipeToFirestoreData(value) : value;
      return acc;
    }, {} as { [key: string]: FieldValue | Partial<unknown> | undefined });
  }
  
}
