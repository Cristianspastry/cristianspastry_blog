// AdminLayout.tsx

// Layout per la pagina di amministrazione
import NavBar from "@/presentation/components/(ADMIN)/layout/NavBar";
import Footer from "@/presentation/components/(ADMIN)/layout/Footer";
import SideBar from "@/presentation/components/(ADMIN)/layout/SideBar";



export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 md:ml-64">
        {/* Navbar */}
        <NavBar />

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100 min-h-screen">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
