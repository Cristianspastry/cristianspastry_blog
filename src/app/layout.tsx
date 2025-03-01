
import type { Metadata } from "next";
import "./globals.css";
import { getLanguage } from "@/config/lenguage";
import { Inter , Playfair_Display } from "next/font/google";
import  ReduxProvider  from "@/presentation/components/ReduxProvider";



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "900",
});
const playfair_display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: "400",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = getLanguage();
  return (
    <html lang={lang}>
      <body
        className={`${inter} ${playfair_display} antialiased`}
      >
       <ReduxProvider>
        {children}
       </ReduxProvider>
      </body>
    </html>
  );
}
