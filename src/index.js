
const cocktailCollection = document.querySelector('div#cocktail-collection')

document.addEventListener("DOMContentLoaded", () => {
  const randomGenBtn = document.querySelector("#rando-cocktail-btn");
  const cocktailFormContainer = document.querySelector(".container");
  const showMeCocktailsBtn = document.querySelector('.submit')




  randomGenBtn.addEventListener("click", (e) => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then(res => res.json())
      .then(dataDrink => createDrinkCard(dataDrink["drinks"]['0']))

  });

  showMeCocktailsBtn.addEventListener('click', e => {
    const ingredientForm = document.querySelector("input[name = 'name']")
    e.preventDefault()

    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ingredientForm.value)
      .then(res => res.json())
      .then(someDrink => someDrink['drinks'].forEach(drink => getAllDrinkInfoFromId(drink['idDrink'])))
  }
  )

});

function getAllDrinkInfoFromId(drink) {

  fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drink)
    .then(res => res.json())
    .then(dataDrink => createDrinkCard(dataDrink["drinks"]['0']))


}

function createDrinkCard(drink) {


  const newCard = document.createElement('div')

  const newLikeButton = document.createElement('button')
  const newRemoveButton = document.createElement('button')
  const newRecipeButton = document.createElement('button')

  newLikeButton.className = 'card-btn'
  newRemoveButton.className = 'card-btn'
  newRecipeButton.className = 'card-btn'


  newLikeButton.textContent = 'Like'
  newRecipeButton.textContent = 'Cocktail Recipe'
  newRemoveButton.textContent = 'Remove'

  newCard.className = 'card'
  newCard.innerHTML =
    `
  <h2>${drink.strDrink}</h2>
  <p> Drink Type: ${drink.strCategory} - ${drink.strAlcoholic} </p>
  <img src = '${drink.strDrinkThumb}' class='cocktail-avatar'>
 `
  newLikeButton.addEventListener('click', e => console.log('liked'))
  newRecipeButton.addEventListener('click', e => handleRecipe(e, drink))
  newRemoveButton.addEventListener('click', e => newCard.remove())


  newCard.append(newLikeButton)
  newCard.append(newRecipeButton)
  newCard.append(newRemoveButton)


  cocktailCollection.appendChild(newCard)


}

function handleRecipe(e, drink) {


  const newRecipeCard = document.createElement('div')


  newRecipeCard.innerHTML =
    `
  <h2>${drink.strDrink}</h2>
  <h3> Recipe: </h3>
  <p> This drink is best served in a ${drink.strGlass} </p>
  <p>${drink.strInstructions}</p>
  `
  const getOldChild = e.target.parentNode.querySelector('div')

  if (getOldChild === null) {
    e.target.parentNode.append(newRecipeCard)
  }
  else {
    e.target.parentNode.removeChild(getOldChild)
  }

}
