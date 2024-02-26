
import siteMetadata from '@/constant/meta';
import styles from './style/navbar.module.css';
import Link from 'next/link';

const Logo = () => {
    return (
        <>
        <div className={styles.containerLogo}>
                 
                 <Link href={"/"} className={styles.title}>
                    {siteMetadata.title}
                 </Link>
                
                </div>
        </>
    );
}

export default Logo;