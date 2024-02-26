
import instagramIcon from '../../assets/img/instagram.png';
import facebookIcon from '../../assets/img/facebook.png';
import tikTokIcon from '../../assets/img/tik-tok.png';
import threadsIcon from '../../assets/img/threads.png';
import youtubeIcon from '../../assets/img/youtube.png';

import { StaticImageData } from 'next/image';
import siteMetadata from './meta';

interface IconProps {
    id: number
    icon: StaticImageData | string
    href?: string,
}

export const footerIcons: IconProps[] = [
{
    id: 0,
    icon: instagramIcon,
    href : siteMetadata.instagram
},
{
    id: 1,
    icon: facebookIcon,
    href : siteMetadata.facebook
},
{
    id: 2,
    icon: tikTokIcon,
    href : siteMetadata.tikTok
},
{
    id: 3,
    icon: threadsIcon,
    href : siteMetadata.threads
},
{
    id: 4,
    icon: youtubeIcon,
    href : siteMetadata.youtube
}
]

export {
    instagramIcon,
    facebookIcon,
    tikTokIcon,
    threadsIcon,
    youtubeIcon,
}