/**
 * This script defines the add, view, and delete operations for Ingredient objects in the Recipe Management Application.
 */

const BASE_URL = "http://localhost:8081"; // backend URL

/* 
 * TODO: Get references to various DOM elements
 * - addIngredientNameInput
 * - deleteIngredientNameInput
 * - ingredientListContainer
 * - searchInput (optional for future use)
 * - adminLink (if visible conditionally)
 */
let addIngredientNameInput = document.getElementById("add-ingredient-name-input");
let addIngredientButton = document.getElementById("add-ingredient-submit-button");
let deleteIngredientNameInput = document.getElementById("delete-ingredient-name-input");
let deleteIngredientButton = document.getElementById("delete-ingredient-submit-button");
let ingredientListContainer = document.getElementById("ingredient-list");

/* 
 * TODO: Attach 'onclick' events to:
 * - "add-ingredient-submit-button" → addIngredient()
 * - "delete-ingredient-submit-button" → deleteIngredient()
 */
addIngredientButton.onclick = addIngredient;
deleteIngredientButton.onclick = deleteIngredient;

/*
 * TODO: Create an array to keep track of ingredients
 */
let ingredients = [];

/* 
 * TODO: On page load, call getIngredients()
 */
getIngredients();

/**
 * TODO: Add Ingredient Function
 * 
 * Requirements:
 * - Read and trim value from addIngredientNameInput
 * - Validate input is not empty
 * - Send POST request to /ingredients
 * - Include Authorization token from sessionStorage
 * - On success: clear input, call getIngredients() and refreshIngredientList()
 * - On failure: alert the user
 */
async function addIngredient() {
    // Implement add ingredient logic here
    let addIngredientName = addIngredientNameInput.value.trim();
    if(!addIngredientName){
        alert("All fields must be filled.");
        return;
    }

    let requestBody = { name: addIngredientName };
    let token = sessionStorage.getItem("auth-token");

    const requestOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Authorization": `Bearer ${token}` 
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(requestBody)
    };

    try{
        const response = await fetch(`${BASE_URL}/ingredients`, requestOptions);
        if(response.status === 201){
            addIngredientNameInput.value = "";
            await getIngredients();
        }
        else{
            alert("Failed to add Ingredient.")
        }
    }catch(error){
        console.error("Add ingredient error: ", error);
        alert("An error occured while adding the ingredient.");
    }
}


/**
 * TODO: Get Ingredients Function
 * 
 * Requirements:
 * - Fetch all ingredients from backend
 * - Store result in `ingredients` array
 * - Call refreshIngredientList() to display them
 * - On error: alert the user
 */
async function getIngredients() {
    // Implement get ingredients logic here
    let token = sessionStorage.getItem("auth-token");

    const requestOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Authorization": `Bearer ${token}` 
        },
        redirect: "follow",
        referrerPolicy: "no-referrer"
    };

    try{
        const response = await fetch(`${BASE_URL}/ingredients`, requestOptions);
        if(response.status === 200){
            ingredients = await response.json();
            refreshIngredientList();
        }
        else{
            alert("Failed to get ingredients.")
        }
    }catch(error){
        console.error("Get ingredients error: ", error);
        alert("An error occured while getting the ingredients.");
    }
}


/**
 * TODO: Delete Ingredient Function
 * 
 * Requirements:
 * - Read and trim value from deleteIngredientNameInput
 * - Search ingredientListContainer's <li> elements for matching name
 * - Determine ID based on index (or other backend logic)
 * - Send DELETE request to /ingredients/{id}
 * - On success: call getIngredients() and refreshIngredientList(), clear input
 * - On failure or not found: alert the user
 */
async function deleteIngredient() {
    // Implement delete ingredient logic here
    let deleteIngredientName = deleteIngredientNameInput.value.trim();
    if(!deleteIngredientName){
        alert("All fields must be filled.");
        return;
    }

    const liElements = ingredientListContainer.querySelectorAll("li");
    let found = false;

    for(let li of liElements){
        if(li.textContent.trim().toLowerCase() === deleteIngredientName.toLowerCase()){
            found = true;
            break;
        }
    }
    if(!found){
        alert("Ingredient not found.");
        return;
    }

    const targetIngredient = ingredients.find(ingredient => ingredient.name.toLowerCase() === deleteIngredientName.toLowerCase());

    let token = sessionStorage.getItem("auth-token");

    const requestOptions = {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Authorization": `Bearer ${token}` 
        },
        redirect: "follow",
        referrerPolicy: "no-referrer"
    };

    try{
        const response = await fetch(`${BASE_URL}/ingredients/${targetIngredient.id}`, requestOptions);
        if(response.status === 200){
            deleteIngredientNameInput.value = "";
            await getIngredients();
        }
        else{
            alert("Failed to delete Ingredient.")
        }
    }catch(error){
        console.error("Delete ingredient error: ", error);
        alert("An error occured while deleting the ingredient.");
    }
}


/**
 * TODO: Refresh Ingredient List Function
 * 
 * Requirements:
 * - Clear ingredientListContainer
 * - Loop through `ingredients` array
 * - For each ingredient:
 *   - Create <li> and inner <p> with ingredient name
 *   - Append to container
 */
function refreshIngredientList() {
    // Implement ingredient list rendering logic here
    ingredientListContainer.innerHTML = "";
    ingredients.forEach(ingredient => {
        let li = document.createElement("li");
        let p = document.createElement("p");
        p.textContent = ingredient.name;
        li.appendchild(p);
        ingredientListContainer.appendChild(li);
    });
}
