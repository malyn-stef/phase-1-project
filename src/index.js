
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
    const formRest = document.querySelector("input[placeholder='Ingredient']")

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
  <span> Drink Type: ${drink.strCategory} </span>
  <p>${drink.strAlcoholic} </p>
  <img src = '${drink.strDrinkThumb}' class='cocktail-avatar'>
  <br></br>
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
  let ingredientObjArray = []

  for (let ingredientNumber = 1; ingredientNumber <= 15; ingredientNumber++) {
    let findIngredient = drink[`strIngredient${ingredientNumber}`]
    if (findIngredient === null) {
      break
    }
    let measureIngredient = drink[`strMeasure${ingredientNumber}`]
    if (measureIngredient === null) {
      measureIngredient = ''
    }
    newObj = {
      'ingredient': findIngredient,
      'ingredientAmount': measureIngredient
    }

    ingredientObjArray.push(newObj)
  }


  newRecipeCard.innerHTML =
    `
  <h3> Recipe: </h3>
  <p> This drink is best served in a ${drink.strGlass} </p>
  <table class='styled-table'>
  <tr>
  <th>Ingredient</th>
  <th>Amount</th>
  </tr>
  </table>
  <p>${drink.strInstructions}</p>
  `


  const getOldChild = e.target.parentNode.querySelector('div')

  if (getOldChild === null) {
    e.target.parentNode.append(newRecipeCard)
    ingredientObjArray.forEach(item => createTable(Object.values(item), e))
  }
  else {
    e.target.parentNode.removeChild(getOldChild)
  }



}

function createTable(item, e) {

  const getTable = e.target.parentNode.querySelector('table')
  const newRow = document.createElement('tr')
  newRow.innerHTML =
    `
  <td>${item[0]}</td>
  <td>${item[1]}</td>
  `
  getTable.appendChild(newRow)
}

