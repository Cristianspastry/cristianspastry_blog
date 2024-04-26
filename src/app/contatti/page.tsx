"use client"

import { metaData } from '@/utils/const';
import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Logica per inviare il modulo o gestire i dati come preferisci
    console.log(formData);
    // Resetta il form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="max-w-lg mx-auto p-6  rounded-lg ">
        <h1 className="text-3xl font-semibold mb-6 text-center">Contattami</h1>
        <p className="text-lg mb-6 text-center">
          Per qualsiasi informazione, curiosità, dubbio o suggerimento non esitare a lasciarmi un messaggio compilando il form e ti risponderò nel più breve tempo possibile!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1">Messaggio</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              rows={4}
              required
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">Invia Messaggio</button>
        </form>

        <p className="mt-8 text-lg text-center">
          Sei un’azienda e ti piacerebbe collaborare con me per far conoscere e valorizzare i tuoi prodotti? Scrivimi a {metaData.openGraph?.emails} oppure compila il modulo di contatto.
        </p>
      </div>
    </main>
  );
};

export default ContactPage;
