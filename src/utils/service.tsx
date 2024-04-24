import { Ricetta } from "@/model/ricetta";



// fetch recipe from firebase from this URL : https://cristian-s-pastry-86a80-default-rtdb.europe-west1.firebasedatabase.app/
export const fetchRecipes = async () => {
    const response = await fetch('https://cristian-s-pastry-86a80-default-rtdb.europe-west1.firebasedatabase.app/recipes.json');
    if (!response.ok) {
      throw new Error('Errore nel recupero delle ricette');
    }
    const data = await response.json();
    return Object.values(data) as Ricetta[];
  };