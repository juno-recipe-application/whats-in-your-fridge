const recipeApp = {};

recipeApp.init = () => {
    recipeApp.getUserInput();
}

// make a global array to store the user's choices, which we will pass to our API call
recipeApp.userChoices = [];

// Store url and key on gallery app object as a property
recipeApp.url = 'https://api.spoonacular.com/recipes/findByIngredients'
recipeApp.apiKey = '8f522d9d9210471691590e0132190021'

// API call
recipeApp.getRecipes = () => {
    // set up query string parameters via setting up a URL and URL search params object
    const url = new URL(recipeApp.url);
    url.search = new URLSearchParams({
        // ingredients: `${ingredient1},${ingredient2},${ingredient3}`,
        ingredients: recipeApp.userChoices,
        number: 25,
        apiKey: recipeApp.apiKey,
        limitLicense: true,
        ranking: 1,
        ignorePantry: true
    });

    fetch(url)
        .then((response) => {
            return response.json();
        }).then((jsonData) => {
            console.log(jsonData);
        });
}

// Make an array that stores the returned recipes 
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



// adding event listeners to each dropdown that captures the chosen value and puts it into an array on our app object 
//     dropdown1.addEventListener("change", function () {
//         console.log(dropdown1.value);

//         recipeApp.userChoices.splice(0, 1, dropdown1.value);

//         console.log(recipeApp.userChoices);
//     });

//     dropdown2.addEventListener("change", function () {
//         console.log(dropdown2.value);

//         recipeApp.userChoices.splice(1, 1, dropdown2.value);

//         console.log(recipeApp.userChoices);
//     });

//     dropdown3.addEventListener("change", function () {
//         console.log(dropdown3.value);

//         recipeApp.userChoices.splice(2, 1, dropdown3.value);

//         console.log(recipeApp.userChoices);
//     });


//     recipeApp.getRecipes(recipeApp.userChoices[0], recipeApp.userChoices[1], recipeApp.userChoices[2]);
// }



recipeApp.init();