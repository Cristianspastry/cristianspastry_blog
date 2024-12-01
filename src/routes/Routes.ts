


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
        name: 'Recipes',
        link: '/recipe',
        subLinks : '/recipe/'
    },
    Tips: {
        name: 'Tips',
        link: '/tips'
    },
    About: {
        name: 'About',
        link: '/about'
    },
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
}