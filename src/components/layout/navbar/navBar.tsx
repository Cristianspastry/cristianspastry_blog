"use client"
import { usePathname } from 'next/navigation';
import styles from './navbar.module.css'
import Link from 'next/link';
import { useState } from 'react';
import { navBarLinks } from '@/constant/links';
const NavBar = () => {
    const pathName = usePathname();
    const [navShow, setNavShow] = useState(false)

    const onToggleNav = () => {
        setNavShow((status: boolean) => {
            if (status) {
                document.body.style.overflow = 'auto'
            } else {
                // Prevent scrolling
                document.body.style.overflow = 'hidden'
            }
            return !status
        })
    }

    return (
        <>
            <nav className={styles.containerNavBar}>

                {/* TITOLO <Logo/> */}
                <div className={styles.containerLogo}>
                 
                 <Link href={"/"} className={styles.title}>
                    {"Cristian's pastry"}
                 </Link>
                
                </div>

                {/** LINK DELLA NAV */}
                <div className={styles.containerNavLinks}>
                    {
                        navBarLinks.map((link) => (
                            <Link key={link.id} href={link.href} className={`${styles.navBarLinks} ${pathName === link.href ? 'text-zinc-900' : ''}`}>
                                {link.title}
                            </Link>
                        ))
                    }

                </div>

                {/** Mobile NavBar */}
                <button aria-label="Toggle Menu" onClick={onToggleNav} className={styles.buttonHamburger}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={styles.hamburgerIcon}
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <div
                    className={`${styles.containerNavBarMobile}  ${navShow ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div>
                        <button aria-label="Toggle Menu" onClick={onToggleNav}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className=""
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>

                    <nav className={styles.navBarMobile}>
                        {navBarLinks.map((link: any) => (
                            <div key={link.title}>
                                <Link
                                    href={link.href}
                                    onClick={onToggleNav}
                                    className={styles.mobileNavLinks}
                                >
                                    {link.title}
                                </Link>
                            </div>
                        ))}
                    </nav>

                </div>
            </nav>
        </>
    )
}

export default NavBar;