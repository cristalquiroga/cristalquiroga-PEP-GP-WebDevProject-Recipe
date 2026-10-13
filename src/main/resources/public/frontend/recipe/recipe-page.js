/**
 * This script defines the CRUD operations for Recipe objects in the Recipe Management Application.
 */

const BASE_URL = "http://localhost:8081"; // backend URL

let recipes = [];

// Wait for DOM to fully load before accessing elements
window.addEventListener("DOMContentLoaded", () => {

    /* 
     * TODO: Get references to various DOM elements
     * - Recipe name and instructions fields (add, update, delete)
     * - Recipe list container
     * - Admin link and logout button
     * - Search input
    */
    let addRecipeNameInput = document.getElementById("add-recipe-name-input");
    let addRecipeInstructionsInput = document.getElementById("add-recipe-instructions-input");
    let addRecipeButton = document.getElementById("add-recipe-submit-input")
    let updateRecipeNameInput = document.getElementById("update-recipe-name-input");
    let updateRecipeInstructionsInput = document.getElementById("update-recipe-instructions-input");
    let updateRecipeButton = document.getElementById("update-recipe-submit-input");
    let deleteRecipeNameInput = document.getElementById("delete-recipe-name-input");
    let deleteRecipeButton = document.getElementById("delete-recipe-submit-input");
    let recipeList = document.getElementById("recipe-list");
    let adminLink = document.getElementById("admin-link");
    let logoutButton = document.getElementById("logout-button");
    let searchInput = document.getElementById("search-input");
    let searchButton = document.getElementById("search-button");
    /*
     * TODO: Show logout button if auth-token exists in sessionStorage
     */
    if(sessionStorage.getItem("auth-token")){
        logoutButton.style.display = "block";
    }

    /*
     * TODO: Show admin link if is-admin flag in sessionStorage is "true"
     */
    function displayAdminLink(){
        if(sessionStorage.getItem("is-admin") === "true"){
            adminLink.style.display = "block";
        }
    }
    /*
     * TODO: Attach event handlers
     * - Add recipe button → addRecipe()
     * - Update recipe button → updateRecipe()
     * - Delete recipe button → deleteRecipe()
     * - Search button → searchRecipes()
     * - Logout button → processLogout()
     */
    addRecipeButton.onclick = addRecipe;
    updateRecipeButton.onclick = updateRecipe;
    deleteRecipeButton.onclick = deleteRecipe;
    searchButton.onclick = searchRecipes;
    logoutButton.onclick = processLogout;

    /*
     * TODO: On page load, call getRecipes() to populate the list
     */
    getRecipes();
    displayAdminLink();

    /**
     * TODO: Search Recipes Function
     * - Read search term from input field
     * - Send GET request with name query param
     * - Update the recipe list using refreshRecipeList()
     * - Handle fetch errors and alert user
     */
    async function searchRecipes() {
        // Implement search logic here
        let searchTerm = searchInput.value;
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
            referrerPolicy: "no-referrer",
        };

        try{
            const response = await fetch(`${BASE_URL}/recipes?name=${encodeURIComponent(searchTerm)}`, requestOptions);
            if(response.status === 200){
                recipes = await response.json();
                refreshRecipeList();
            }
            else{
                alert("Search failed.")
            }
        }catch(error){
            console.error("Search error: ", error);
            alert("An error occured during search.");
        }
    }

    /**
     * TODO: Add Recipe Function
     * - Get values from add form inputs
     * - Validate both name and instructions
     * - Send POST request to /recipes
     * - Use Bearer token from sessionStorage
     * - On success: clear inputs, fetch latest recipes, refresh the list
     */
    async function addRecipe() {
        // Implement add logic here
    }

    /**
     * TODO: Update Recipe Function
     * - Get values from update form inputs
     * - Validate both name and updated instructions
     * - Fetch current recipes to locate the recipe by name
     * - Send PUT request to update it by ID
     * - On success: clear inputs, fetch latest recipes, refresh the list
     */
    async function updateRecipe() {
        // Implement update logic here
    }

    /**
     * TODO: Delete Recipe Function
     * - Get recipe name from delete input
     * - Find matching recipe in list to get its ID
     * - Send DELETE request using recipe ID
     * - On success: refresh the list
     */
    async function deleteRecipe() {
        // Implement delete logic here
    }

    /**
     * TODO: Get Recipes Function
     * - Fetch all recipes from backend
     * - Store in recipes array
     * - Call refreshRecipeList() to display
     */
    async function getRecipes() {
        // Implement get logic here
    }

    /**
     * TODO: Refresh Recipe List Function
     * - Clear current list in DOM
     * - Create <li> elements for each recipe with name + instructions
     * - Append to list container
     */
    function refreshRecipeList() {
        // Implement refresh logic here
    }

    /**
     * TODO: Logout Function
     * - Send POST request to /logout
     * - Use Bearer token from sessionStorage
     * - On success: clear sessionStorage and redirect to login
     * - On failure: alert the user
     */
    async function processLogout() {
        // Implement logout logic here
    }

});
