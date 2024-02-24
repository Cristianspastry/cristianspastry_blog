
import instagramIcon from '../../assets/img/instagram.png';
import facebookIcon from '../../assets/img/facebook.png';
import tikTokIcon from '../../assets/img/tik-tok.png';
import threadsIcon from '../../assets/img/threads.png';
import youtubeIcon from '../../assets/img/youtube.png';

import { StaticImageData } from 'next/image';

interface IconProps {
    id: number
    icon: StaticImageData | string
    href?: string,
}

export const footerIcons: IconProps[] = [
{
    id: 0,
    icon: instagramIcon,
    href : "https://www.instagram.com/cristianspastry/"
},
{
    id: 1,
    icon: facebookIcon,
    href : "https://www.facebook.com/cristianspastry/"
},
{
    id: 2,
    icon: tikTokIcon,
    href : "https://www.tiktok.com/@cristianspastry"
},
{
    id: 3,
    icon: threadsIcon,
    href : "https://www.threads.net/@cristianspastry?hl=it"
},
{
    id: 4,
    icon: youtubeIcon,
    href : "https://www.youtube.com/channel/UCGqgjYkYEKkTH73_-RL59wA"
}
]

export {
    instagramIcon,
    facebookIcon,
    tikTokIcon,
    threadsIcon,
    youtubeIcon,
}