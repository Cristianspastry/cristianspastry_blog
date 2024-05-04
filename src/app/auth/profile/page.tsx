

"use client"

import { auth } from '@/firebase/firabase';
import { routes } from '@/utils/const';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import Image from 'next/image';
import {userImg} from '@/utils/img';
type Props = {}

const ProfilePage = (props: Props) => {
  const [User, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const router = useRouter();
  const SignOut = () => {
    signOut();
    router.push(routes.home);
    sessionStorage.removeItem('user');
  }

  const userData = {
    username: User?.displayName,
    email: User?.email,
    avatar: User?.photoURL,

  }

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-8">

        {
          userData.avatar ? (
            <img src={userData.avatar} alt="Avatar" className="h-24 w-24 rounded-full border-4 border-blue-500" />
          ) : (

            <Image src={userImg} width={0} height={0} alt="Avatar" className=" h-24 w-24 rounded-full border-4 border-blue-500" />

          )
        }


      </div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold">{userData.username}</h1>
        <p className="text-gray-600">{userData.email}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div>
          <h2 className="text-xl font-semibold mb-4">Informazioni Utente</h2>
          <div className="flex items-center mb-2">

            <p className="text-gray-600">{userData.email}</p>
          </div>
          <button onClick={() => SignOut()} className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300">
            Esci
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage