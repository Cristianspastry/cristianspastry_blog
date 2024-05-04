"use client"

import React, { useState } from 'react';
import { googleImg,facebookImg } from '@/utils/img';
import Link from 'next/link';
import FormInput from '@/components/inputs/formInputs';
import FormCheckBox from '@/components/inputs/formCheckBox';
import { routes } from '@/utils/const';
import { AuthFormButtons, AuthFormSocialButtons } from '@/components/button/authFormButtons';
import { useRouter } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import { useSignInWithEmailAndPassword, useSignInWithFacebook, useSignInWithGoogle,useSendEmailVerification } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firabase';

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithFacebook] = useSignInWithFacebook(auth);
  const [SendEmailVerification] = useSendEmailVerification(auth);
  const router = useRouter();

  const handleSignIn = async (e: any) => {
    e.preventDefault(); // Evita il comportamento predefinito del submit del form

    if (!email || !password) {
      setErrorMessage('Completa tutti i campi')
      return
    }
    if (password.length < 6) {
      setErrorMessage('La password deve avere almeno 6 caratteri');
      return;
    }
   try {
    if(!isSigningIn) {
     setIsSigningIn(true);
     await signInWithEmailAndPassword(email, password);
     setEmail('');
     setPassword('');
     router.push(routes.home);
    }
   } catch (error) {
    if (error instanceof FirebaseError) {
      setErrorMessage(error.message);
    }
   }
  };

  const onGoogleSignIn = async (e: any) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await signInWithGoogle()

      router.push(routes.home);
    }
  }

  const onFacebookSignIn = async (e: any) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await signInWithFacebook().then(() => SendEmailVerification())
      router.push(routes.home);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 rounded-md shadow-md">



      <h2 className="text-2xl font-semibold mb-6">Accedi al Account</h2>
      <form onSubmit={handleSignIn}>
        <FormInput label="Email" type="email" value={email} handleChange={(e: any) => setEmail(e.target.value)} />
        <FormInput label="Password" type="password" value={password} handleChange={(e: any) => setPassword(e.target.value)} />

        <FormCheckBox />

        <div className="mb-4">
          <Link href="#" className="text-blue-500">Password dimenticata?</Link>
        </div>

        {errorMessage && <span className="text-red-500 font-bold">{errorMessage}</span>}

        <AuthFormButtons onDisabled={isSigningIn} buttonText={isSigningIn ? 'Accesso in corso...' : 'Accedi'}  />

      </form>

      <div className="flex justify-center">
        <p>Non hai un account? <Link href={routes.register} className="text-blue-500">Registrati</Link></p>
      </div>
      <div className="flex justify-center mt-4">
        <p>Oppure accedi con:</p>
      </div>
      <div className="flex justify-center mt-2 space-x-2">
        <AuthFormSocialButtons socialText="Google" src={googleImg} onDisabled={isSigningIn}  onClick={(e: any) => onGoogleSignIn(e)} />
        <AuthFormSocialButtons socialText="Facebook" src={facebookImg} onDisabled={isSigningIn} onClick={(e : any) => onFacebookSignIn(e)} />
      </div>
      {<p className="text-red-500 mt-4">{errorMessage}</p>}
      <div className="mt-8">
        <p className="text-sm text-gray-500">Cliccando su Accedi, accetti i nostri <Link href="#" className="text-blue-500">Termini di servizio</Link> e la nostra <Link href="#" className="text-blue-500">Informativa sulla privacy</Link>.</p>
      </div>
    </div>
  );
};


export default LoginPage;
