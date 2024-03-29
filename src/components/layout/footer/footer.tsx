


import React from 'react'
import styles from './footer.module.css';
import Image from 'next/image';
import instagramIcon from '../../../../assets/img/instagram.png';
import facebookIcon from '../../../../assets/img/facebook.png';
import tikTokIcon from '../../../../assets/img/tik-tok.png';
import threadsIcon from '../../../../assets/img/threads.png';
import youtubeIcon from '../../../../assets/img/youtube.png';
import { footerIcons } from '@/constant/icons';
import { footerLinks } from '@/constant/links';
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';
import { getFullYear } from '@/constant/helps';
import siteMetadata from '@/constant/meta';
type Props = {}

const Footer = (props: Props) => {
  
  return (
    <>
<footer className={styles.footer}>
        
        <div className={styles.socialIcons}>
          {footerIcons.map((icon) => (
            <Link href={icon.href as Url} className={styles.iconLink} key={icon.id}>
              <Image src={icon.icon} alt={`${icon.icon}`} className={styles.icon} width={40} height={40} />
            </Link>
          ))}
        </div>

        <div className={styles.footerContent}>

          <div className={styles.copyright}>
            &copy;{` ${getFullYear()} ${siteMetadata.title}. Tutti i diritti sono riservati.`}
          </div>

          <div className={styles.footerLinks}>
            {footerLinks.map((link) => (
              <Link key={link.id} href={link.href} className={styles.link}>{link.title}</Link>
            ))}
          </div>
          
        </div>
        <strong className={styles.createdBy}>creato da {siteMetadata.author}</strong>
      </footer>
    </>
  )
}

/*
.social_icons > .social_icons_img:hover {
  transform: scale(1.2);
  transition: transform 0.3s ease-in-out;
}
*/

/*const POROKS = () => {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
          <SocialIcon kind="threads" href={siteMetadata.threads} size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
            Tailwind Nextjs Theme
          </Link>
        </div>
      </div>
    </footer>
  )
}*/

export default Footer;