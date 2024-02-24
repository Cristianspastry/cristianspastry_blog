
import styles from './style/navbar.module.css';
import { navBarLinks } from '@/constant/links';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLinks  = () => {
    const pathName = usePathname();

    return (
        <>
         <div className={styles.containerNavLinks}>
                    {
                        navBarLinks.map((link) => (
                            <Link key={link.id} href={link.href} className={`${styles.navBarLinks} ${pathName === link.href ? 'text-zinc-900' : ''}`}>
                                {link.title}
                            </Link>
                        ))
                    }

                </div>
        </>
    )
}

export default NavLinks;