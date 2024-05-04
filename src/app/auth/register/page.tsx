
"use client";


import Link from 'next/link';
import React, { useState } from 'react'
import { googleImg,facebookImg } from '@/utils/img';
import FormInput from '@/components/inputs/formInputs';
import { routes } from '@/utils/const';
import { AuthFormButtons, AuthFormSocialButtons } from '@/components/button/authFormButtons';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'next/navigation';
import {useCreateUserWithEmailAndPassword, useSendEmailVerification} from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/firabase';
type Props = {}

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isRegistering, setIsRegistering] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const [SendEmailVerification] = useSendEmailVerification(auth);
  const router = useRouter();
  

  const handleSignUp = async (e: any) => {
    e.preventDefault()


    if (!email || !password || !confirmPassword) {
      setErrorMessage('Completa tutti i campi')
      return
    }
    if(password.length < 6) {
      setErrorMessage('La password deve avere almeno 6 caratteri')
      return
    }
    if (password !== confirmPassword) {
      setErrorMessage('Le password non coincidono')
      return
    }

    try {
      if (!isRegistering) {
        
        const res = await createUserWithEmailAndPassword(email, password).then((res) => {
          SendEmailVerification()
        });
        
        setTimeout(() => {
          router.push(routes.home);
        },10)
        setIsRegistering(true)
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        console.log({res})
      }
    } catch (error: FirebaseError | unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('Email gia in uso')
        } else if (error.code === 'auth/weak-password') {
          setErrorMessage('Password deve avere almeno 6 caratteri')
        } else if (error.code === 'auth/invalid-email') {
          setErrorMessage('Email non valida')
        } else if (error.code === 'auth/operation-not-allowed') {
          setErrorMessage('Operazione non consentita')
        } else {
          setErrorMessage('Errore durante la registrazione')
        }
      }
      console.log(error)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Crea un Accaunt</h2>
      <form onSubmit={handleSignUp}>
        <FormInput label="Email" type="email" value={email} handleChange={(e) => setEmail(e.target.value)} />
        <FormInput label="Password" type="password" value={password} handleChange={(e) => setPassword(e.target.value)} />
        <FormInput label="Conferma Password" type="password" value={confirmPassword} handleChange={(e) => setConfirmPassword(e.target.value)} />

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <AuthFormButtons buttonText={isRegistering ? 'Registrando...' : 'Registrati'} onDisabled={isRegistering} />

      </form>

      <div className="flex justify-center">
        <p>Hai gia un account? <Link href={routes.login} className="text-blue-500">Accedi</Link></p>
      </div>
      <div className="flex justify-center mt-4">
        <p>Oppure registrati con:</p>
      </div>
      <div className="flex justify-center mt-2 space-x-2">
        <AuthFormSocialButtons socialText="Google" src={googleImg} onClick={undefined} onDisabled={isRegistering} />
        <AuthFormSocialButtons socialText="Facebook" src={facebookImg} onClick={undefined} onDisabled={isRegistering} />
      </div>
      <div className="mt-8">
        <p className="text-sm text-gray-500">Cliccando su Registrati, accetti i nostri <Link href="#" className="text-blue-500">Termini di servizio</Link> e la nostra <Link href="#" className="text-blue-500">Informativa sulla privacy</Link>.</p>
      </div>
    </div>
  );
};

export default RegistrationPage;


