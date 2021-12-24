const recipeApp = {};

recipeApp.init = () => {
    recipeApp.getUserInput();
    recipeApp.getRecipes(recipeApp.userChoices[0], recipeApp.userChoices[1],recipeApp.userChoices[2]);
}

recipeApp.userChoices = [];

// Store url and key on gallery app object as a property
recipeApp.url = 'https://api.spoonacular.com/recipes/findByIngredients'
recipeApp.apiKey = '8f522d9d9210471691590e0132190021'

// get some data! set up a fetch request to the unspash api
recipeApp.getRecipes = (ingredient1, ingredient2, ingredient3) => {

    // set up query string parameters via setting up a URL and URL search params object
    const url = new URL(recipeApp.url);
    url.search = new URLSearchParams({
        ingredients: `${ingredient1},${ingredient2},${ingredient3}`,
        number: 25,
        apiKey: recipeApp.apiKey
    });

    fetch(url)
        .then((response) => {
            return response.json();
        }).then((jsonData) => {
            console.log(jsonData);
        });
}

// recipeApp.recipes = [];


recipeApp.getUserInput = () => {
    const dropdown1 = document.getElementById("ingredient1");
    const dropdown2 = document.getElementById("ingredient2");
    const dropdown3 = document.getElementById("ingredient3");

    dropdown1.addEventListener("change", function () {
        console.log(dropdown1.value);

        recipeApp.userChoices.splice(0, 1, dropdown1.value);

        console.log(recipeApp.userChoices);
    });

    dropdown2.addEventListener("change", function () {
        console.log(dropdown2.value);

        recipeApp.userChoices.splice(1, 1, dropdown2.value);

        console.log(recipeApp.userChoices);

    });

    dropdown3.addEventListener("change", function () {
        console.log(dropdown3.value);

        recipeApp.userChoices.splice(2, 1, dropdown3.value);

        console.log(recipeApp.userChoices);
    });
}

recipeApp.init();