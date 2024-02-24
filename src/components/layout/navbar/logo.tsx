
import styles from './style/navbar.module.css';
import Link from 'next/link';

const Logo = () => {
    return (
        <>
        <div className={styles.containerLogo}>
                 
                 <Link href={"/"} className={styles.title}>
                    {"Cristian's pastry"}
                 </Link>
                
                </div>
        </>
    );
}

export default Logo;