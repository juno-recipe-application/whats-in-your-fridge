const recipeApp = {};

recipeApp.init = () => {
    recipeApp.getUserInput();
}

// make a global array to store the user's choices, which we will pass to our API call
recipeApp.userChoices = [];

// Make a global array that stores the returned recipes 
recipeApp.recipes = [];

// Store url and key on app object as a property
recipeApp.url = 'https://api.spoonacular.com/recipes/complexSearch'
recipeApp.apiKey = '8f522d9d9210471691590e0132190021'
// recipeApp.apiKey = '6ca6794922364918a232cd5884e479a0'

// API call
recipeApp.getRecipes = () => {
    // set up query string parameters via setting up a URL and URL search params object
    const url = new URL(recipeApp.url);
    url.search = new URLSearchParams({
        includeIngredients: recipeApp.userChoices,
        addRecipeInformation: true,
        fillIngredients: true,
        number: 3,
        apiKey: recipeApp.apiKey,
        // limitLicense: true,
        // ranking: 1,
        ignorePantry: true
    });

    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Oh no, the API call wasn't successful.");
            }
        }).then((jsonData) => {

            // Push recipes into global array
            jsonData.results.forEach((recipe) => {
                recipeApp.recipes.push(recipe);
            })

            console.log(recipeApp.recipes);
            recipeApp.displayRecipes(recipeApp.recipes);
        })
        .catch((err) => {
            const results = document.getElementsByClassName('results');
            results.innerHTML = "<span>Sorry, our database is down :(</span>"
        });
}


// capture user ingredient choices 
recipeApp.getUserInput = () => {

    // DOM to select form
    const userForm = document.getElementById('userForm');

    // create an event listener that will submit form on click
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();

        recipeApp.recipes = [];

        // create an array of ingredients from form to submit to api

        //if using individual select boxes in HTML
        recipeApp.userChoices[0] = document.getElementById("ingredientOne").value;
        recipeApp.userChoices[1] = document.getElementById("ingredientTwo").value;
        recipeApp.userChoices[2] = document.getElementById("ingredientThree").value;

        // could use this as a prompt to display as html to double confirm choices 

        console.log("You have selected: " + recipeApp.userChoices);

        // displaying user choice on pantry div on main page

        // get li's from html
        const UserSelection1 = document.getElementById('item1')
        const UserSelection2 = document.getElementById('item2')
        const UserSelection3 = document.getElementById('item3')

        // put the user choices on each li
        UserSelection1.innerText = recipeApp.userChoices[0];
        UserSelection2.innerText = recipeApp.userChoices[1];
        UserSelection3.innerText = recipeApp.userChoices[2];


        // call it
        recipeApp.getRecipes();
    });
}

recipeApp.displayRecipes = (apiData) => {
    // get our result section
    const recipeSection = document.getElementsByClassName('results');

    // empty our results section somehow

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

        // create button
        const infoButton = document.createElement('button');
        infoButton.setAttribute('id', 'modalButton');
        infoButton.innerText = 'See More';

        // append info to our div elements
        divElement.appendChild(image);
        divElement.appendChild(recipeHeading);
        divElement.appendChild(infoButton);

        // append div to section
        recipeSection[0].appendChild(divElement);

        // get div element for modal
        const modal = document.getElementById("moreInfoModal");

        // event listener for modal button
        infoButton.addEventListener('click', function () {
            document.getElementById('moreInfoModal').style.visibility = 'visible';

            // get all elements from modal div
            const cuisineInfo = document.getElementById('cuisines');
            const source = document.getElementById('sourceInfo');
            const summeryInfo = document.getElementById('dishInfo');
            const urlInfo = document.getElementById('webAddress');
            const extendedIngredients = document.getElementById('extendedIngredients');
            const missingIngredients = document.getElementById('missingIngredients');

            // fill modal with info
            cuisineInfo.innerHTML = recipe.cuisines;
            source.innerText = recipe.sourceName;
            summeryInfo.innerHTML = recipe.summary;
            urlInfo.innerText = recipe.spoonacularSourceUrl;

            // loop through extended ingredients array and display each item
            recipe.extendedIngredients.forEach((item) => {
                const ingredient = document.createElement('li');
                extendedIngredients.appendChild(ingredient);
                ingredient.innerText = item.original;
            })

            // same thing for the missing ingredients
            recipe.missedIngredients.forEach((item) => {
                const ingredient = document.createElement('li');
                missingIngredients.appendChild(ingredient);
                ingredient.innerText = item.original;
            })
        });

        window.addEventListener('click', function (event) {
            if (event.target == moreInfoModal) {
                document.getElementById('moreInfoModal').style.visibility = "hidden"
            }
        })
    })
}



recipeApp.init();