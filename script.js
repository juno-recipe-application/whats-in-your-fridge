const recipeApp = {};

recipeApp.init = () => {
    recipeApp.getRecipes();
    recipeApp.getUserInput();
}

// Store url and key on gallery app object as a property
recipeApp.url = 'https://api.spoonacular.com/recipes/findByIngredients'
recipeApp.apiKey = '8f522d9d9210471691590e0132190021'

// get some data! set up a fetch request to the unspash api
recipeApp.getRecipes = () => {

    // set up query string parameters via setting up a URL and URL search params object
    const url = new URL(recipeApp.url);
    url.search = new URLSearchParams({
        ingredients: 'chicken,rice,onion',
        number: 50,
        apiKey: recipeApp.apiKey
    });

    fetch(url)
        .then((response) => {
            return response.json();
        }).then((jsonData) => {
            console.log(jsonData);
        });
}

recipeApp.getUserInput = () => {
    const dropdown1 = document.getElementById("ingredient1");
    const dropdown2 = document.getElementById("ingredient2");
    const dropdown3 = document.getElementById("ingredient3");

    dropdown1.addEventListener("change", function () {
        console.log(dropdown1.value);
    });

    dropdown2.addEventListener("change", function () {
        console.log(dropdown2.value);
    });

    dropdown3.addEventListener("change", function () {
        console.log(dropdown3.value);
    });
}

recipeApp.init();