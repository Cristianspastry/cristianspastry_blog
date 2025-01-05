import { APP_NAME } from '@/shared/constants/Constants';
import Link from 'next/link';
import React from 'react'

const HeroSection = () => {
  return (
    <section className="relative bg-bluModerato text-white py-20 px-6 rounded-lg">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-playfair_display">
          Benvenuto su {APP_NAME}
        </h1>
        <p className="text-xl md:text-2xl opacity-90 mb-8 font-inter">
          Scopri le migliori ricette di pasticceria create con passione
        </p>
        <Link href="#section-recipes" className="bg-white text-bluModerato px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all inline-block">
          Esplora le Ricette
        </Link>
      </div>
    </section>
  )
}

export default HeroSection;

