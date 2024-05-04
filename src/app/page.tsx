"use client";

import SearchBar from "@/components/searchBar/searchBar";
import FeaturedRecipesSections from "@/components/sections/FeaturedRecipesSections/FeaturedRecipesSections";
import LastRecipesSections from "@/components/sections/LastRecipeSections/LastRecipesSections";
import { auth } from "@/firebase/firabase";
import { Ricetta } from "@/model/ricetta";
import { routes } from "@/utils/const";
import { fetchRecipes } from "@/utils/service";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
   const [user] = useAuthState(auth);
   const router = useRouter();
   const [recipes, setRecipes] = useState<Ricetta[]>([]);


   if(!user) {
     redirect(routes.login);
   }

   useEffect(() => {
     const getRecipes = async () => {
       try {
         const recipesData = await fetchRecipes();
         setRecipes(recipesData);
       } catch (error) {
         console.error('Errore nel recupero delle ricette:', error);
       }
     };
     getRecipes();
   }, []);

  
   return (
      <main className="max-w-screen-lg mx-auto px-4 py-8">
         <div className=" flex justify-between">
         <h1 className="text-3xl font-semibold text-left mb-8">Ultime Ricette</h1>
         <SearchBar recipes={recipes}/>
         </div>
         <LastRecipesSections recipes={recipes} />
      </main>
   );
}
{/*<FeaturedRecipesSections 
     largeCard={{
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/cristian-s-pastry-86a80.appspot.com/o/img_ricette%2FRicette%20Base%2FPANDISPAGNA.jpeg?alt=media&token=fd4ed1d7-6943-4b94-9e56-8d5c2f71a44b",
        title: "",
        category: "",
        description: "",
        preparationTime: ""
     }} 
     smallCard1={{
      imageUrl: "https://www.davidezambelli.com/wp-content/uploads/2020/05/849A969D-BAF8-4B2B-BF0D-09F3FFA3BCC6.jpeg",
      title: "",
      category: "",
      description: "",
      preparationTime: "",
     }}
     smallCard2={{
        imageUrl: "https://www.davidezambelli.com/wp-content/uploads/2020/05/849A969D-BAF8-4B2B-BF0D-09F3FFA3BCC6.jpeg",
        title: "",
        category: "",
        description: "",
        preparationTime: "",}}
     />*/}