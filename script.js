const searchSubmit = document.getElementById("search-submit");
const searchInput = document.getElementById("search-input");
const fav = document.getElementById("fav");
const favo = document.getElementById("favo");
const home = document.getElementById("home");
const results = document.getElementById("searchResults");
let arr = [];
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let mealItem;

// search click event

searchSubmit.addEventListener("click", () => {
  let searchQuery = searchInput.value.trim(); // Trim whitespace from the search query

  if (searchQuery === "") {
    alert("Please search for any meal");
    return; // Exit the function to prevent further execution
  }

  fetch(`${url}${searchQuery}`)
    .then((response) => response.json())
    .then((data) => {
      mealItem = data.meals;
      if (mealItem == null) {
        alert("No Meal Found!");
        return; // Exit the function
      } else {
        display(mealItem);
      }

      // Add event to add the selected meal in favourite list

      const addFavButtons = document.querySelectorAll("#addFavv");
      addFavButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
          addToFav(mealItem[index]); // Pass the individual meal object
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);

      // Display a user-friendly message within the page instead of using console

      results.innerHTML = "An error occurred while fetching data.";
    });
});

// display the meal

function display(meals) {
  results.innerHTML = "";
  meals.forEach((meal) => {
    results.innerHTML += `
        <div id="foodImage">
          <img src="${meal.strMealThumb}" alt="logo">
        </div>
        <div class="title">
          ${meal.strMeal}
        </div>
        <div>
        <h3 style="color:red">Ingredients :-</h3>
          <ul class="list-unstyled list">
            ${generateIngredientList(meal)}
          </ul>
        </div>
        <div id="readMore">
          <p class="instruction">${meal.strInstructions}</p>
        </div>
        <button id="addFavv"> Add to favourites</button>
        `;
  });
}

// Generate ingredient list

function generateIngredientList(meal) {
  let ingredientList = "";
  for (let i = 1; i <= 10; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredientList += `<li>${meal[`strIngredient${i}`]} - ${
        meal[`strMeasure${i}`]
      }</li>`;
    }
  }
  return ingredientList;
}

// add item to favourite list

function addToFav(meal) {
  if (!arr.includes(meal)) {
    arr.push(meal);
    alert(`${meal.strMeal} Added to favourite list`);
  } else {
    alert(`${meal.strMeal} Already in favourite list`);
  }
}

// Remove the element from favourite list

function removeFav(meal) {
  const index = arr.indexOf(meal);
  if (index !== -1) {
    arr.splice(index, 1);
    showFav();
    alert(`${meal.strMeal} Removed from favourite list`);
  } else {
    alert("Meal not found in favourite list");
  }
}

// Function to Display the favourite meals

function showFav() {
  results.innerHTML = "";
  if (arr.length === 0) {
    results.innerHTML = "No Meals in favourite List";
  } else {
    arr.forEach((meal) => {
      results.innerHTML += `
      <div id="foodImage">
        <img src="${meal.strMealThumb}" alt="logo">
      </div>
      <div class="title">
        ${meal.strMeal}
      </div>
      <div>
      <h3 style="color:red">Ingredients :-</h3>
        <ul class="list-unstyled list">
          ${generateIngredientList(meal)}
        </ul>
      </div>
      <div id="readMore">
        <p class="instruction">${meal.strInstructions}</p>
      </div>
      <button id="remFav">Remove From favourites</button>`;
    });
  }

  // get the element from id remFav

  const removeFavButtons = document.querySelectorAll("#remFav");

  // Add the event to remove the element from the favourite list

  removeFavButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      removeFav(mealItem[index]); // Pass the individual meal object
    });
  });
}

// function to clear the screen

home.addEventListener("click", () => {
  results.innerHTML = "";
});

// Event to show the favourite list

fav.addEventListener("click", showFav);
