import FeaturedRecipesSections from "@/components/sections/FeaturedRecipesSections/FeaturedRecipesSections";
import LastRecipesSections from "@/components/sections/LastRecipeSections/LastRecipesSections";

export default function Home() {
  
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">

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
     <LastRecipesSections />
      </div>
  );
}
