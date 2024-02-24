"use client"
import { usePathname } from 'next/navigation';
import styles from './style/navbar.module.css';
import { useState } from 'react';
import Logo from './logo';
import NavLinks from './navLinks';
import MobileNavBar from './mobileNavBar';

const NavBar = () => {
    return (
        <>
            <nav className={styles.containerNavBar}>

                {/* TITOLO <Logo/> */}
                <Logo/>

                {/** LINK DELLA NAV */}
                <NavLinks/>

                {/** Mobile NavBar */}
                <MobileNavBar/>
            </nav>
        </>
    )
}

export default NavBar;