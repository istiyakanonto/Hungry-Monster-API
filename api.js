document.getElementById('search-btn').addEventListener('click', searchResult)
document.getElementById("meal-info").style.display = 'none';

function searchResult() {
    const searchFood = document.getElementById('search-food').value
    console.log(searchFood);
    if (searchFood == "") {
        alert('please write the name what you want');
    }
    else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchFood}`)
            .then(res => res.json())
            .then(data => {
                if (data.meals === null) {
                    alert('Not found')
                }
                else {
                    findMeal(data.meals);
                }
            })
    }
}
function findMeal(meals) {
    document.getElementById("meal-items").innerHTML = "";
    meals.forEach(meal => {
        const createMealDiv = document.createElement("div");
        createMealDiv.innerHTML = `
        <div onclick='mealInformation("${meal.idMeal}")' class="meal-card">
            <img src="${meal.strMealThumb}" class="meal-image">
            <h5 class="meal-title">${meal.strMeal}</h5>
        </div>
        `;
        document.getElementById("meal-items").appendChild(createMealDiv);
    });
}
function mealInformation(mealItems) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItems}`)
        .then(res => res.json())
        .then(data => {
            showDetailsMealsInfo(data.meals[0]);
        })
}
function showDetailsMealsInfo(meal) {
    document.getElementById("show-details").innerHTML = `
    <div class="text-center">
        <img src="${meal.strMealThumb}" class="meal-image">
        <h2 class="meal-title">${meal.strMeal}</h2>
    </div>
    <div>
        <h3>  Ingredients</h3>
         <ul id="element-items">
        </ul>
    </div>
    `;
    document.getElementById("ingredient-info").innerHTML = `
    <h6 class="ingredient">${meal.strInstructions}</h6>
    `;
    let i = 1;
    while (i <= 18) {
        let quantityOfMeals = 'strMeasure' + i;
        let totalElementItems = 'strIngredient' + i;
        i++;
        if (meal[totalElementItems] === null || meal[totalElementItems] === "") {//try to avoid null or empty strings
            break;
        }
        const li = document.createElement("li");
        li.innerHTML = `
        <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
      </svg> ${meal[quantityOfMeals]} ${meal[totalElementItems]}</li>
        `;
        document.getElementById("element-items").appendChild(li)
    }
}
