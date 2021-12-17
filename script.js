const recipeApp = {};

recipeApp.init = () => {
    recipeApp.getRecipes();
}

// Store url and key on gallery app object as a property
recipeApp.url = 'https://api.spoonacular.com/recipes/findByIngredients'
recipeApp.apiKey = '8f522d9d9210471691590e0132190021'

// get some data! set up a fetch request to the unspash api
recipeApp.getRecipes = () => {

    // set up query string parameters via setting up a URL and URL search params object
    const url = new URL(recipeApp.url);
    url.search = new URLSearchParams({
        ingredients: 'potato,garlic,onion',
        number: 15,
        apiKey: recipeApp.apiKey
    });

    fetch(url)
        .then((response) => {
            return response.json();
        }).then((jsonData) => {
            console.log(jsonData);
        });

}

recipeApp.init();
