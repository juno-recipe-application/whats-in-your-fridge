const recipeApp = {};

recipeApp.init = () => {
    recipeApp.getUserInput();
}

// make a global array to store the user's choices, which we will pass to our API call
recipeApp.userChoices = [];

// Store url and key on app object as a property
// recipeApp.url = 'https://api.spoonacular.com/recipes/findByIngredients'
recipeApp.url = 'https://api.spoonacular.com/recipes/complexSearch'
recipeApp.apiKey = '8f522d9d9210471691590e0132190021'

// API call
recipeApp.getRecipes = () => {
    // set up query string parameters via setting up a URL and URL search params object
    const url = new URL(recipeApp.url);
    url.search = new URLSearchParams({
        ingredients: recipeApp.userChoices,
        addRecipeInformation: true,
        fillIngredients: true,
        number: 3,
        apiKey: recipeApp.apiKey,
        limitLicense: true,
        // ranking: 1,
        ignorePantry: true
    });

    fetch(url)
        .then((response) => {
            return response.json();
        }).then((jsonData) => {
            // Push recipes into global array
            jsonData.results.forEach((recipe) => {
                recipeApp.recipes.push(recipe);
            })
            console.log(recipeApp.recipes);
            recipeApp.displayRecipes(recipeApp.recipes);
            console.log(jsonData)
        });
}

// Make a global array that stores the returned recipes 
recipeApp.recipes = [];


// capture user ingredient choices 
recipeApp.getUserInput = () => {
    // get our dropdown menus
    // const dropdown1 = document.getElementById("ingredient1");
    // const dropdown2 = document.getElementById("ingredient2");
    // const dropdown3 = document.getElementById("ingredient3");

    // DOM to select form
    const userForm = document.getElementById('userForm')
    // const submitIngredient = document.getElementById('submit');

    // create an event listener that will submit form on click
    userForm.addEventListener('submit', (e) => {

        e.preventDefault();

        // create an array of ingredients from form to submit to api

        //if using multiple select options in HTML

        // for (var option of document.getElementById('ingredientMultiple').options) {
        //     if (option.selected) {
        //         recipeApp.userChoices.push(option.value);
        //     }
        // }

        //if using individual select boxes in HTML
        recipeApp.userChoices[0] = document.getElementById("ingredientOne").value;
        recipeApp.userChoices[1] = document.getElementById("ingredientTwo").value;
        recipeApp.userChoices[2] = document.getElementById("ingredientThree").value;


        // could use this as a prompt to display as html to double confirm choices 
        console.log("You have selected: " + recipeApp.userChoices);

        // call it
        recipeApp.getRecipes();
    });
}


recipeApp.displayRecipes = (apiData) => {
    // get our result section
    const recipeSection = document.getElementsByClassName('results');
    console.log(recipeSection);

    apiData.forEach((recipe) => {
        // create divs with class for styling
        const divElement = document.createElement('div');
        divElement.setAttribute('class', "recipe-container");

        // create images
        const image = document.createElement('img');
        image.src = recipe.image;
        image.alt = recipe.title;

        // create text
        const recipeHeading = document.createElement('h3');
        recipeHeading.innerText = recipe.title;

        // append info to our div elements
        divElement.appendChild(image);
        divElement.appendChild(recipeHeading);

        // append div to section
        recipeSection[0].appendChild(divElement);
    })
}



recipeApp.init();