
// ============================================
// WHATCANICOOK? - JAVASCRIPT
// Smart Cooking for Hostel Life
// ============================================


// 1. SELECT HTML ELEMENTS

const ingredientSearch = document.getElementById("ingredientSearch");
const addIngredientBtn = document.getElementById("addIngredientBtn");
const ingredientChips = document.getElementById("ingredientChips");
const ingredientCount = document.getElementById("ingredientCount");

const commonIngredientsBtn = document.getElementById("commonIngredientsBtn");
const clearIngredientsBtn = document.getElementById("clearIngredientsBtn");
const commonIngredients = document.getElementById("commonIngredients");

const findRecipesBtn = document.getElementById("findRecipesBtn");
const emptyFindBtn = document.getElementById("emptyFindBtn");
const showAllRecipesBtn = document.getElementById("showAllRecipesBtn");

const recipeGrid = document.getElementById("recipeGrid");
const recipeCount = document.getElementById("recipeCount");
const recipeSubtitle = document.getElementById("recipeSubtitle");
const emptyState = document.getElementById("emptyState");

const budgetFilter = document.getElementById("budgetFilter");
const timeFilter = document.getElementById("timeFilter");
const dietFilter = document.getElementById("dietFilter");
const sortRecipes = document.getElementById("sortRecipes");

const equipmentOptions = document.getElementById("equipmentOptions");
const preferenceMessage = document.getElementById("preferenceMessage");

const recipeModal = document.getElementById("recipeModal");
const recipeDetails = document.getElementById("recipeDetails");
const cookingSteps = document.getElementById("cookingSteps");
const cookingAssistant = document.getElementById("cookingAssistant");

const closeRecipeModal = document.getElementById("closeRecipeModal");
const modalOverlay = document.getElementById("modalOverlay");

const favoritesBtn = document.getElementById("favoritesBtn");
const favoritesModal = document.getElementById("favoritesModal");
const favoritesGrid = document.getElementById("favoritesGrid");
const favoritesOverlay = document.getElementById("favoritesOverlay");
const closeFavoritesModal = document.getElementById("closeFavoritesModal");
const emptyFavorites = document.getElementById("emptyFavorites");

const profileBtn = document.getElementById("profileBtn");
const profileModal = document.getElementById("profileModal");
const closeProfileModal = document.getElementById("closeProfileModal");
const profileOverlay = document.getElementById("profileOverlay");
const profileForm = document.getElementById("profileForm");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const profileMessage = document.getElementById("profileMessage");

const hostelModeBtn = document.getElementById("hostelModeBtn");

const timerMinutes = document.getElementById("timerMinutes");
const timerDisplay = document.getElementById("timerDisplay");
const startTimerBtn = document.getElementById("startTimerBtn");
const stopTimerBtn = document.getElementById("stopTimerBtn");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");


// 2. WEBSITE DATA

let selectedIngredients = [];
let selectedEquipment = "any";
let currentRecipes = [];
let currentRecipe = null;

let favorites = JSON.parse(
    localStorage.getItem("whatcanicook_favorites") || "[]"
);

let savedProfile = JSON.parse(
    localStorage.getItem("whatcanicook_profile") || "null"
);

let timerInterval = null;
let remainingSeconds = 0;
let toastTimeout = null;


// 3. RECIPE DATABASE

const recipes = [

    {
        id: 1,
        name: "Masala Maggi",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=80",
        ingredients: ["maggi", "onion", "tomato", "oil", "spices"],
        time: 10,
        price: 20,
        protein: 5,
        calories: 310,
        carbs: 45,
        fat: 11,
        diet: "vegetarian",
        equipment: ["pan", "induction"],
        description: "A quick and spicy hostel favourite.",
        steps: [
            "Chop the onion and tomato into small pieces.",
            "Heat a little oil in a pan.",
            "Add onion and tomato and cook for 2 minutes.",
            "Add water, tastemaker and noodles.",
            "Cook for 3 to 4 minutes and serve hot."
        ]
    },

    {
        id: 2,
        name: "Aloo Sandwich",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80",
        ingredients: ["potato", "bread", "butter", "spices"],
        time: 15,
        price: 25,
        protein: 5,
        calories: 290,
        carbs: 42,
        fat: 10,
        diet: "vegetarian",
        equipment: ["pan", "induction"],
        description: "Crispy bread stuffed with spicy mashed potatoes.",
        steps: [
            "Boil the potato until soft.",
            "Peel and mash the potato in a bowl.",
            "Add salt, chilli and your favourite spices.",
            "Spread the mixture between two bread slices.",
            "Toast the sandwich on a pan until golden."
        ]
    },

    {
        id: 3,
        name: "Vegetable Fried Rice",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=80",
        ingredients: ["rice", "onion", "carrot", "peas", "oil", "spices"],
        time: 15,
        price: 35,
        protein: 6,
        calories: 320,
        carbs: 55,
        fat: 9,
        diet: "vegan",
        equipment: ["pan", "induction"],
        description: "A simple way to turn leftover rice into a meal.",
        steps: [
            "Cook the rice beforehand or use leftover rice.",
            "Chop the vegetables into small pieces.",
            "Heat oil in a pan and add the vegetables.",
            "Stir-fry for 4 to 5 minutes.",
            "Add rice, salt and spices. Mix and serve."
        ]
    },

    {
        id: 4,
        name: "Cheese Omelette",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80",
        ingredients: ["eggs", "cheese", "onion", "salt", "oil"],
        time: 10,
        price: 35,
        protein: 15,
        calories: 260,
        carbs: 4,
        fat: 19,
        diet: "eggetarian",
        equipment: ["pan", "induction"],
        description: "A protein-rich cheesy omelette for breakfast.",
        steps: [
            "Crack two eggs into a bowl.",
            "Add chopped onion, salt and pepper.",
            "Beat the eggs until combined.",
            "Heat oil in a pan and pour the mixture.",
            "Add cheese, fold the omelette and cook until done."
        ]
    },

    {
        id: 5,
        name: "Banana Oats Bowl",
        image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=700&q=80",
        ingredients: ["oats", "banana", "milk", "honey"],
        time: 5,
        price: 25,
        protein: 8,
        calories: 280,
        carbs: 48,
        fat: 7,
        diet: "vegetarian",
        equipment: ["kettle", "no-cook"],
        description: "A filling breakfast that takes only a few minutes.",
        steps: [
            "Add oats to a bowl.",
            "Pour warm milk over the oats.",
            "Slice a banana and add it to the bowl.",
            "Add honey if you like.",
            "Mix well and enjoy."
        ]
    },

    {
        id: 6,
        name: "Peanut Butter Sandwich",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80",
        ingredients: ["bread", "peanut butter", "banana"],
        time: 5,
        price: 20,
        protein: 9,
        calories: 300,
        carbs: 38,
        fat: 13,
        diet: "vegan",
        equipment: ["no-cook"],
        description: "A quick, no-cook snack with protein and energy.",
        steps: [
            "Place two bread slices on a plate.",
            "Spread peanut butter on each slice.",
            "Slice the banana and place it on the bread.",
            "Close the sandwich and cut in half.",
            "Serve immediately."
        ]
    },

    {
        id: 7,
        name: "Paneer Bhurji",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80",
        ingredients: ["paneer", "onion", "tomato", "oil", "spices"],
        time: 15,
        price: 50,
        protein: 18,
        calories: 310,
        carbs: 12,
        fat: 22,
        diet: "vegetarian",
        equipment: ["pan", "induction"],
        description: "Spiced scrambled paneer, perfect with bread or roti.",
        steps: [
            "Crumble the paneer into small pieces.",
            "Chop the onion and tomato.",
            "Heat oil and cook the onion.",
            "Add tomato and spices. Cook until soft.",
            "Add paneer and stir for 3 to 4 minutes."
        ]
    },

    {
        id: 8,
        name: "Chana Chaat",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80",
        ingredients: ["chickpeas", "onion", "tomato", "lemon", "spices"],
        time: 10,
        price: 30,
        protein: 12,
        calories: 250,
        carbs: 38,
        fat: 6,
        diet: "vegan",
        equipment: ["no-cook"],
        description: "Tangy chickpea chaat with fresh vegetables.",
        steps: [
            "Drain and rinse cooked chickpeas.",
            "Chop onion and tomato.",
            "Mix chickpeas and vegetables in a bowl.",
            "Add lemon juice, salt and chaat masala.",
            "Mix well and serve fresh."
        ]
    },

    {
        id: 9,
        name: "Kettle Masala Oats",
        image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=700&q=80",
        ingredients: ["oats", "peas", "carrot", "spices"],
        time: 10,
        price: 20,
        protein: 7,
        calories: 240,
        carbs: 40,
        fat: 6,
        diet: "vegan",
        equipment: ["kettle"],
        description: "Warm savoury oats for a quick hostel meal.",
        steps: [
            "Add oats and chopped vegetables to a heat-safe bowl.",
            "Boil water in your kettle.",
            "Pour hot water over the oats and vegetables.",
            "Cover the bowl for 5 to 7 minutes.",
            "Add salt and spices, mix and serve."
        ]
    },

    {
        id: 10,
        name: "Paneer Rice Bowl",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80",
        ingredients: ["rice", "paneer", "onion", "tomato", "spices"],
        time: 20,
        price: 60,
        protein: 18,
        calories: 420,
        carbs: 54,
        fat: 14,
        diet: "vegetarian",
        equipment: ["pan", "induction"],
        description: "A filling rice bowl with paneer and spices.",
        steps: [
            "Cook rice and keep it aside.",
            "Cut paneer into small cubes.",
            "Cook onion and tomato with spices in a pan.",
            "Add paneer and cook for 4 minutes.",
            "Serve the paneer mixture over rice."
        ]
    },

    {
        id: 11,
        name: "Boiled Egg Chaat",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80",
        ingredients: ["eggs", "onion", "tomato", "lemon", "spices"],
        time: 10,
        price: 30,
        protein: 13,
        calories: 190,
        carbs: 8,
        fat: 12,
        diet: "eggetarian",
        equipment: ["kettle", "pan", "induction"],
        description: "A simple protein-rich snack with tangy spices.",
        steps: [
            "Boil eggs until fully cooked.",
            "Cool, peel and cut the eggs in halves.",
            "Chop onion and tomato.",
            "Add vegetables, lemon juice and spices.",
            "Mix gently and serve."
        ]
    },

    {
        id: 12,
        name: "Tomato Bread Pizza",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80",
        ingredients: ["bread", "tomato", "cheese", "onion", "spices"],
        time: 15,
        price: 40,
        protein: 9,
        calories: 330,
        carbs: 40,
        fat: 14,
        diet: "vegetarian",
        equipment: ["pan", "induction"],
        description: "A quick pizza-style snack using bread.",
        steps: [
            "Place bread slices on a plate.",
            "Spread chopped tomato and onion over the bread.",
            "Add grated cheese and seasoning.",
            "Heat a covered pan on low heat.",
            "Place bread inside and cook until cheese melts."
        ]
    }

];


// 4. HELPER FUNCTIONS

function normalize(text) {
    return text.toLowerCase().trim();
}

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

function saveFavorites() {
    localStorage.setItem(
        "whatcanicook_favorites",
        JSON.stringify(favorites)
    );
}

function saveProfile() {
    localStorage.setItem(
        "whatcanicook_profile",
        JSON.stringify(savedProfile)
    );
}


// 5. INGREDIENT SELECTION

function addIngredient(ingredient) {

    ingredient = ingredient.trim();

    if (!ingredient) {
        showToast("Please enter an ingredient.");
        return;
    }

    const exists = selectedIngredients.some(
        item => normalize(item) === normalize(ingredient)
    );

    if (exists) {
        showToast("Ingredient already selected!");
        return;
    }

    selectedIngredients.push(ingredient);

    renderIngredients();

    ingredientSearch.value = "";

    showToast(ingredient + " added!");
}

function removeIngredient(ingredient) {

    selectedIngredients = selectedIngredients.filter(
        item => normalize(item) !== normalize(ingredient)
    );

    renderIngredients();
}

function renderIngredients() {

    ingredientChips.innerHTML = "";

    selectedIngredients.forEach(ingredient => {

        const chip = document.createElement("span");
        chip.className = "ingredient-chip";

        const name = document.createElement("span");
        name.textContent = ingredient;

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.textContent = "×";
        removeBtn.setAttribute("aria-label", "Remove " + ingredient);

        removeBtn.addEventListener("click", () => {
            removeIngredient(ingredient);
        });

        chip.appendChild(name);
        chip.appendChild(removeBtn);

        ingredientChips.appendChild(chip);
    });

    ingredientCount.textContent =
        selectedIngredients.length +
        (selectedIngredients.length === 1
            ? " ingredient selected"
            : " ingredients selected");

    // Update common ingredient buttons

    document.querySelectorAll(".ingredient-option").forEach(button => {

        const name = button.dataset.ingredient;

        button.classList.toggle(
            "active",
            selectedIngredients.some(
                item => normalize(item) === normalize(name)
            )
        );

    });
}


// Add ingredient button

addIngredientBtn.addEventListener("click", () => {
    addIngredient(ingredientSearch.value);
});


// Press Enter to add ingredient

ingredientSearch.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        event.preventDefault();
        addIngredient(ingredientSearch.value);
    }

});


// Common ingredient buttons

document.querySelectorAll(".ingredient-option").forEach(button => {

    button.addEventListener("click", () => {

        const ingredient = button.dataset.ingredient;

        const alreadySelected = selectedIngredients.some(
            item => normalize(item) === normalize(ingredient)
        );

        if (alreadySelected) {
            removeIngredient(ingredient);
        } else {
            addIngredient(ingredient);
        }

    });

});


// Select common items button

commonIngredientsBtn.addEventListener("click", () => {

    const commonItems = [
        "Potato",
        "Rice",
        "Bread",
        "Eggs",
        "Onion",
        "Tomato"
    ];

    commonItems.forEach(item => {

        if (!selectedIngredients.some(
            ingredient => normalize(ingredient) === normalize(item)
        )) {
            selectedIngredients.push(item);
        }

    });

    renderIngredients();

    showToast("Common ingredients selected!");

});


// Clear ingredients

clearIngredientsBtn.addEventListener("click", () => {

    selectedIngredients = [];

    renderIngredients();

    showToast("Ingredients cleared.");

});


// 6. HOSTEL EQUIPMENT SELECTION

equipmentOptions.querySelectorAll(".option-btn").forEach(button => {

    button.addEventListener("click", () => {

        equipmentOptions.querySelectorAll(".option-btn").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedEquipment = button.dataset.equipment;

        updatePreferenceMessage();

    });

});


// Hostel Mode button

hostelModeBtn.addEventListener("click", () => {

    selectedEquipment = "kettle";

    equipmentOptions.querySelectorAll(".option-btn").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.equipment === "kettle"
        );

    });

    updatePreferenceMessage();

    document.getElementById("finder").scrollIntoView({
        behavior: "smooth"
    });

    showToast("Hostel Mode activated!");

});


// Update preferences text

function updatePreferenceMessage() {

    const budget = budgetFilter.value;
    const time = timeFilter.value;
    const diet = dietFilter.value;

    const equipmentName =
        selectedEquipment === "any"
            ? "Any equipment"
            : selectedEquipment.toUpperCase();

    const budgetText = "₹" + budget;

    const timeText =
        time === "999"
            ? "Any time"
            : time + " minutes";

    preferenceMessage.textContent =
        equipmentName +
        " | Budget: " + budgetText +
        " | Time: " + timeText +
        " | Diet: " + diet;

}

budgetFilter.addEventListener("change", updatePreferenceMessage);
timeFilter.addEventListener("change", updatePreferenceMessage);
dietFilter.addEventListener("change", updatePreferenceMessage);


// 7. RECIPE SEARCH AND FILTERING

function findRecipes(shouldScroll = true) {
    fetch("http://127.0.0.1:5000/api/search", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        ingredients: selectedIngredients
    })
})
.then(response => response.json())
.then(data => {
    console.log("Python Backend:", data);
})
.catch(error => {
    console.log("Python backend connection error:", error);
});


    const ingredients = selectedIngredients.map(normalize);

    if (ingredients.length === 0) {
        showToast("Please select ingredients first!");
        return;
    }

    const budget = Number(budgetFilter.value);
    const maxTime = Number(timeFilter.value);
    const diet = dietFilter.value;

    currentRecipes = recipes
        .map(recipe => {

            const recipeIngredients =
                recipe.ingredients.map(normalize);

            // Match only recipes that use your selected ingredients
            const matchingIngredients = ingredients.filter(item =>
                recipeIngredients.includes(item)
            );

            // Calculate matching score
            const matchCount = matchingIngredients.length;

            return {
                ...recipe,
                matchCount: matchCount,
                matchPercentage:
                    (matchCount / ingredients.length) * 100
            };

        })
        .filter(recipe => {

            // At least one selected ingredient must match
            const ingredientMatch = recipe.matchCount > 0;

            const budgetMatch = recipe.price <= budget;

            const timeMatch = recipe.time <= maxTime;

            const equipmentMatch =
                selectedEquipment === "any" ||
                recipe.equipment.includes(selectedEquipment);

            let dietMatch = true;

            if (diet === "vegetarian") {
                dietMatch =
                    recipe.diet === "vegetarian" ||
                    recipe.diet === "eggetarian";
            }

            if (diet === "vegan") {
                dietMatch = recipe.diet === "vegan";
            }

            if (diet === "eggetarian") {
                dietMatch =
                    recipe.diet === "eggetarian" ||
                    recipe.diet === "vegetarian";
            }

            if (diet === "high-protein") {
                dietMatch = recipe.protein >= 12;
            }

            return (
                ingredientMatch &&
                budgetMatch &&
                timeMatch &&
                equipmentMatch &&
                dietMatch
            );

        });

    // Show recipes with the highest ingredient match first
    currentRecipes.sort((a, b) =>
        b.matchCount - a.matchCount
    );

    sortAndRenderRecipes();

    updatePreferenceMessage();

    recipeSubtitle.textContent =
        "Recipes made using your selected ingredients.";

    document.getElementById("recipes").scrollIntoView({
        behavior: "smooth"
    });

}

findRecipesBtn.addEventListener("click", findRecipes);
emptyFindBtn.addEventListener("click", findRecipes);  

        

    

    



// 8. SORT RECIPES

function sortAndRenderRecipes() {

    const sortValue = sortRecipes.value;

    if (sortValue === "time") {
        currentRecipes.sort((a, b) => a.time - b.time);
    }

    if (sortValue === "budget") {
        currentRecipes.sort((a, b) => a.price - b.price);
    }

    if (sortValue === "protein") {
        currentRecipes.sort((a, b) => b.protein - a.protein);
    }

    renderRecipes(currentRecipes);

}

sortRecipes.addEventListener("change", sortAndRenderRecipes);


// 9. DISPLAY RECIPE CARDS

function renderRecipes(recipeList) {

    recipeGrid.innerHTML = "";

    recipeCount.textContent =
        recipeList.length +
        (recipeList.length === 1
            ? " recipe found"
            : " recipes found");

    if (recipeList.length === 0) {

        emptyState.style.display = "block";

        recipeGrid.style.display = "none";

        return;
    }

    emptyState.style.display = "none";

    recipeGrid.style.display = "grid";

    recipeList.forEach(recipe => {

        const card = document.createElement("div");
        card.className = "recipe-card";

        const isFavorite = favorites.includes(recipe.id);

        card.innerHTML = `

            <button
                class="favorite-btn ${isFavorite ? "active" : ""}"
                data-id="${recipe.id}"
                aria-label="Add to favorites"
            >
                ${isFavorite ? "♥" : "♡"}
            </button>

            <img
                src="${recipe.image}"
                alt="${recipe.name}"
                loading="lazy"
            >

            <div class="recipe-card-content">

                <h3>${recipe.name}</h3>

                <p>${recipe.description}</p>

                <div class="recipe-meta">

                    <span>⏱ ${recipe.time} min</span>

                    <span>💰 ₹${recipe.price}</span>

                    <span>💪 ${recipe.protein}g protein</span>

                </div>

                <div class="recipe-card-actions">

                    <span class="recipe-price">
                        ₹${recipe.price}/serving
                    </span>

                    <button
                        class="btn btn-primary view-recipe-btn"
                        data-id="${recipe.id}"
                    >
                        View Recipe →
                    </button>

                </div>

            </div>

        `;

        recipeGrid.appendChild(card);

    });

    // Add favorite button events

    recipeGrid.querySelectorAll(".favorite-btn").forEach(button => {

        button.addEventListener("click", () => {

            toggleFavorite(Number(button.dataset.id));

        });

    });

    // Add view recipe events

    recipeGrid.querySelectorAll(".view-recipe-btn").forEach(button => {

        button.addEventListener("click", () => {

            openRecipe(Number(button.dataset.id));

        });

    });

}


// 10. FAVORITES

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites = favorites.filter(item => item !== id);

        showToast("Removed from favorites.");

    } else {

        favorites.push(id);

        showToast("Added to favorites!");

    }

    saveFavorites();

    sortAndRenderRecipes();

    renderFavorites();

}


function renderFavorites() {

    favoritesGrid.innerHTML = "";

    const favoriteRecipes = recipes.filter(recipe =>
        favorites.includes(recipe.id)
    );

    if (favoriteRecipes.length === 0) {

        emptyFavorites.style.display = "block";

        favoritesGrid.style.display = "none";

        return;
    }

    emptyFavorites.style.display = "none";

    favoritesGrid.style.display = "grid";

    favoriteRecipes.forEach(recipe => {

        const card = document.createElement("div");
        card.className = "recipe-card";

        card.innerHTML = `

            <img src="${recipe.image}" alt="${recipe.name}">

            <div class="recipe-card-content">

                <h3>${recipe.name}</h3>

                <p>${recipe.description}</p>

                <div class="recipe-meta">
                    <span>⏱ ${recipe.time} min</span>
                    <span>💰 ₹${recipe.price}</span>
                </div>

                <div class="recipe-card-actions">

                    <button
                        class="btn btn-primary view-favorite-btn"
                        data-id="${recipe.id}"
                    >
                        View Recipe
                    </button>

                    <button
                        class="btn btn-outline remove-favorite-btn"
                        data-id="${recipe.id}"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;

        favoritesGrid.appendChild(card);

    });

    favoritesGrid.querySelectorAll(".view-favorite-btn").forEach(button => {

        button.addEventListener("click", () => {
            openRecipe(Number(button.dataset.id));
        });

    });

    favoritesGrid.querySelectorAll(".remove-favorite-btn").forEach(button => {

        button.addEventListener("click", () => {

            toggleFavorite(Number(button.dataset.id));

            renderFavorites();

        });

    });

}


// Favorites modal events

favoritesBtn.addEventListener("click", () => {

    renderFavorites();

    favoritesModal.classList.add("active");

});

closeFavoritesModal.addEventListener("click", () => {
    favoritesModal.classList.remove("active");
});

favoritesOverlay.addEventListener("click", () => {
    favoritesModal.classList.remove("active");
});


// 11. OPEN RECIPE AND COOKING ASSISTANT

function openRecipe(id) {

    currentRecipe = recipes.find(recipe => recipe.id === id);

    if (!currentRecipe) {
        return;
    }

    recipeDetails.innerHTML = `

        <img
            src="${currentRecipe.image}"
            alt="${currentRecipe.name}"
            style="width:100%;height:250px;object-fit:cover;border-radius:15px;margin-bottom:20px;"
        >

        <span class="eyebrow">YOUR NEXT MEAL</span>

        <h2 style="font-family:'Playfair Display',serif;font-size:30px;margin-bottom:12px;">
            ${currentRecipe.name}
        </h2>

        <p style="color:#718075;margin-bottom:20px;">
            ${currentRecipe.description}
        </p>

        <div class="recipe-meta">
            <span>⏱ ${currentRecipe.time} minutes</span>
            <span>💰 ₹${currentRecipe.price}/serving</span>
            <span>💪 ${currentRecipe.protein}g protein</span>
        </div>

        <h3 style="margin:25px 0 12px;">Ingredients</h3>

        <ul style="padding-left:22px;line-height:2;">

            ${currentRecipe.ingredients.map(item =>
                `<li>${item}</li>`
            ).join("")}

        </ul>

        <h3 style="margin:25px 0 12px;">Nutrition (estimated)</h3>

        <div class="recipe-meta">
            <span>🔥 ${currentRecipe.calories} kcal</span>
            <span>💪 ${currentRecipe.protein}g protein</span>
            <span>🍞 ${currentRecipe.carbs}g carbs</span>
            <span>🥑 ${currentRecipe.fat}g fat</span>
        </div>

    `;

    cookingSteps.innerHTML = "";

    currentRecipe.steps.forEach((step, index) => {

        const stepElement = document.createElement("div");

        stepElement.className = "cooking-step";

        stepElement.innerHTML = `

            <input type="checkbox" id="step-${index}">

            <label for="step-${index}">
                <p>
                    <strong>Step ${index + 1}</strong><br>
                    ${step}
                </p>
            </label>

        `;

        const checkbox = stepElement.querySelector("input");

        checkbox.addEventListener("change", () => {

            stepElement.classList.toggle(
                "completed",
                checkbox.checked
            );

        });

        cookingSteps.appendChild(stepElement);

    });

    // Set suggested timer

    timerMinutes.value = currentRecipe.time;

    stopTimer();

    recipeModal.classList.add("active");

}


// Close recipe modal

closeRecipeModal.addEventListener("click", () => {

    recipeModal.classList.remove("active");

    stopTimer();

});

modalOverlay.addEventListener("click", () => {

    recipeModal.classList.remove("active");

    stopTimer();

});


// 12. COOKING TIMER

function updateTimerDisplay() {

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    timerDisplay.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");

}


function startTimer() {

    stopTimer();

    const minutes = Number(timerMinutes.value);

    if (!minutes || minutes <= 0) {

        showToast("Please enter a valid time.");

        return;
    }

    remainingSeconds = minutes * 60;

    updateTimerDisplay();

    startTimerBtn.disabled = true;

    timerInterval = setInterval(() => {

        remainingSeconds--;

        updateTimerDisplay();

        if (remainingSeconds <= 0) {

            stopTimer();

            timerDisplay.textContent = "00:00";

            showToast("⏰ Time's up! Your timer is complete.");

            alert("⏰ Cooking timer finished!");

        }

    }, 1000);

}


function stopTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    startTimerBtn.disabled = false;

}


startTimerBtn.addEventListener("click", startTimer);

stopTimerBtn.addEventListener("click", () => {

    stopTimer();

    showToast("Timer stopped.");

});


// 13. LOGIN / PROFILE

function openProfile() {

    if (savedProfile) {

        userName.value = savedProfile.name || "";

        userEmail.value = savedProfile.email || "";

    }

    profileMessage.textContent = "";

    profileModal.classList.add("active");

}


profileBtn.addEventListener("click", openProfile);


closeProfileModal.addEventListener("click", () => {

    profileModal.classList.remove("active");

});

profileOverlay.addEventListener("click", () => {

    profileModal.classList.remove("active");

});


profileForm.addEventListener("submit", event => {

    event.preventDefault();

    const name = userName.value.trim();
    const email = userEmail.value.trim();

    if (!name || !email) {

        showToast("Please fill in all fields.");

        return;
    }

    savedProfile = {
        name: name,
        email: email
    };

    saveProfile();

    profileMessage.textContent =
        "Welcome, " + name + "! Your profile has been saved.";

    profileBtn.textContent = "Hi, " + name.split(" ")[0];

    showToast("Profile saved successfully!");

    setTimeout(() => {

        profileModal.classList.remove("active");

    }, 1500);

});


// 14. CLOSE MODALS WITH ESCAPE KEY

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        recipeModal.classList.remove("active");
        favoritesModal.classList.remove("active");
        profileModal.classList.remove("active");

        stopTimer();

    }

});


// 15. INITIALIZE WEBSITE

function initializeWebsite() {

    renderIngredients();

    renderRecipes([]);

    renderFavorites();

    updatePreferenceMessage();

    if (savedProfile) {

        profileBtn.textContent =
            "Hi, " + savedProfile.name.split(" ")[0];

    }

}

initializeWebsite();