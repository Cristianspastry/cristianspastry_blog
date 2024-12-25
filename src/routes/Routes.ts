


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
    Settings: {
        name: 'Settings',
        link: 'admin/settings'
    },
    TornaAlBlog: {
        name: 'Torna al Blog',
        link: '/'
    },
}