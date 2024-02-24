




interface LinkProps {
    id: number
    title: string
    href : string
}

export const navBarLinks : LinkProps[] = [
    {
        id : 0,
        title : "Home",
        href : "/",
    },
    {
        id : 1,
        title : "Ricette",
        href : "/ricette",
    },
    {
        id : 2,
        title : "Teoria",
        href : "/teoria"
    },
    {
        id : 3,
        title : "Chi Sono",
        href : "/chi-sono"
    }
]

export const footerLinks: LinkProps[] = [
{
    id : 0,
    title : 'Termini e condizioni',
    href : '#terminiecondizioni',
},
{
    id : 1,
    title : 'Privacy Policy',
    href : '#privacy'
},
{
    id : 2,
    title : 'Contatti',
    href : '#contatti'
}
]
