
"use client"
import styles from './style/mobileNav.module.css';
import NavLinks from './navLinks';
import Link from 'next/link';
import { navBarLinks } from '@/constant/links';
import { useState } from 'react';

const MobileNavBar = () => {
    const [navShow, setNavShow] = useState(false)
    const onToggleNav = () => {
        setNavShow((status: boolean) => {
            if (status) {
                document.body.style.overflow = 'auto'
            } else {
                // Prevent scrolling
                document.body.style.overflow = 'hidden'
              }
              console.log(status);
              return !status
        })
        
    }
    return (
        <>
         <button aria-label="Toggle Menu" onClick={onToggleNav} className={styles.toggleButton}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={styles.hamburgerSvg}
  >
    <path
      fillRule="evenodd"
      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
</button>

<div className={`${styles.navContainer} ${navShow ? styles.slideIn : styles.slideOut}`}>
  <div>
    <button aria-label="Toggle Menu" onClick={onToggleNav} className={styles.closeButton}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={styles.closeSvg}
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  </div>

  <div className={styles.navLinks}>
    {navBarLinks.map((link) => (
      <div key={link.title}>
        <Link href={link.href} onClick={onToggleNav} className={styles.link}>
          {link.title}
        </Link>
      </div>
    ))}
  </div>
</div>

        </>
    );
}

export default MobileNavBar;