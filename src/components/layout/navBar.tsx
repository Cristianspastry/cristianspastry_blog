
"use client";

import React, { useState } from 'react'
import Link from 'next/link';
import { metaData, navLinks, routes } from '../../utils/const';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firabase';
import userImg from '../../../assets/img/user.png';
import Image from 'next/image';
import { UrlObject } from 'url';
import MobileNavBar from './mobileNavBar';
import DesktopNavBar from './desktopNavBar';
type Props = {}

function NavBar({ }: Props) {
  const [user, loading, error] = useAuthState(auth);
  const userAvatar = user?.photoURL;
  const router = useRouter();

  const goToLogin = () => {
    router.push(routes.login);
  }

  return (
    <>
      <div className="max-w-screen-lg mx-auto">
        <DesktopNavBar user={user} userAvatar={userAvatar}/>
        <MobileNavBar user={user} userAvatar={userAvatar}/>
      </div>

    </>
  )
}



export default NavBar;