import Footer from "@/presentation/components/(BLOG)/layout/Footer";
import Navbar from "@/presentation/components/(BLOG)/layout/NavBar";



export default function BlogLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        <Navbar />
      <main className="container mx-auto py-8 px-4 flex flex-col min-h-screen">
          {children}
        </main>
        <Footer />
      </>
    );
  }