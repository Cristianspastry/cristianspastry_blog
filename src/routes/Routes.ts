

export const BlogRoutes = {
    Home : {
        name : 'Home',
        link : '/', 
    },
    Search: {
        name: 'Search',
        link: '/search'
    },
    Recipes: {
        name: 'Ricette',
        link: '/ricette',
        subLinks : '/ricette/'
    },
    Tips: {
        name: 'Tips',
        link: '/tips',
        subLinks : '/tips/'
    },
    About: {
        name: 'About',
        link: '/about'
    },
     Admin : {
        name : 'Admin',
        link : '/admin',
     },
     PrivacyPolicy: {
        name: 'Privacy Policy',
        link: '/privacy-policy'
     },
     CookiePolicy: {
        name: 'Cookie Policy',
        link: '/cookie-policy'
     },
     TerminieCondizioni: {
        name: 'Termini e Condizioni',
        link: '/termini-e-condizioni'
     },
     Disclaimer : {
        name: 'Disclaimer',
        link: '/disclaimer'
     }
}


export const AdminRoutes = {
    Home : {
        name : 'Dashboard',
        link : '/admin', 
    },
    Recipes: {
        name: 'Recipes',
        link: '/admin/recipes',
        subLinks : {
            recipeDetails :'/admin/recipes/details/',
            addRecipe : '/admin/recipes/add',
            editRecipe : '/admin/recipes/edit/',
        }
    },
    Tips: {
        name: 'Tips',
        link: '/admin/tips',
        subLinks : {
            tipDetails :'/admin/tips/details/',
            addTip : '/admin/tips/add',
            editTip : '/admin/tips/edit/',
        }
    },
    Settings: {
        name: 'Settings',
        link: 'admin/settings'
    },
    TornaAlBlog: {
        name: 'Torna al Blog',
        link: '/'
    },
}