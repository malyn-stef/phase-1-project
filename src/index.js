
const cocktailCollection = document.querySelector('div#cocktail-collection')
const randomGenBtn = document.querySelector("#rando-cocktail-btn");
const showMeCocktailsBtn = document.querySelector('.submit[name="submit-ingredient"]')
const showMeCocktailsByNameBtn = document.querySelector('.submit[name="submit-cocktailname"]')
const dropDownMenuLabel = document.querySelector('label')
const dropDownMenuOptions = document.querySelector('select')
const getLikeSection = document.querySelector('#input-likes')
const getLikeContainer = document.querySelector('#like-section')

document.addEventListener("DOMContentLoaded", () => {

  randomGenBtn.addEventListener("click", (e) => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then(res => res.json())
      .then(dataDrink => createDrinkCard(dataDrink["drinks"]['0']))

  });
  showMeCocktailsByNameBtn.addEventListener('click', e => {
    const ingredientForm = document.querySelector("input[name = 'cocktail-name']")

    e.preventDefault()

    let ensureCapital = ingredientForm.value.charAt(0).toUpperCase() + ingredientForm.value.slice(1)


    if (ensureCapital.includes(' ') === true) {
      ensureCapital = ensureCapital.replaceAll(' ', "_")
      console.log(ensureCapital)
    }

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + ensureCapital)
      .then(res => res.json())
      .then(someDrink => someDrink['drinks'].forEach(drink => getAllDrinkInfoFromId(drink['idDrink'])))
      .catch(err => alert('Sorry, cannot find that ingredient, try another one!'))
  })


  showMeCocktailsBtn.addEventListener('click', e => {
    const ingredientForm = document.querySelector("input[name = 'ingredient']")

    e.preventDefault()

    let ensureCapital = ingredientForm.value.charAt(0).toUpperCase() + ingredientForm.value.slice(1)

    if (ensureCapital.includes('berry') === true && ensureCapital.includes(' ') !== false) {
      ensureCapital = ensureCapital.replace('berry', "berries")
    }

    if (ensureCapital.includes('Tonic') === true) {
      ensureCapital = 'Tonic_Water'
    } else if (ensureCapital.includes('Soda' === true)) {
      ensureCapital = 'Soda_Water'
    } else if (ensureCapital.includes('Sparkling')) {
      ensureCapital = 'Sparkling_Water'
    }

    if (ensureCapital.includes(' ') === true) {
      ensureCapital = ensureCapital.replaceAll(' ', "_")
      console.log(ensureCapital)
    }

    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ensureCapital)
      .then(res => res.json())
      .then(someDrink => someDrink['drinks'].forEach(drink => getAllDrinkInfoFromId(drink['idDrink'])))
      .catch(err => alert('Sorry, cannot find that ingredient, try another one!'))
  }



  )
  dropDownMenuOptions.addEventListener('change', e => findBySpirit(e))

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
  newRemoveButton.className = 'remove-btn'
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
  newLikeButton.addEventListener('click', e => handleLike(e, drink))
  newRecipeButton.addEventListener('click', e => handleRecipe(e, drink))
  newRemoveButton.addEventListener('click', e => {
    newCard.remove()
    if (getLikeSection.hasChildNodes() !== true) {
      getLikeContainer.className = 'hidden'
    }
  })



  newCard.append(newLikeButton)
  newCard.append(newRecipeButton)
  newCard.append(newRemoveButton)


  cocktailCollection.prepend(newCard)



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


function handleLike(e) {
  const selectedCard = e.target.parentNode
  const likeBtn = selectedCard.querySelector('button')


  if (likeBtn.textContent === 'Liked! ❤️') {
    likeBtn.className = 'card-btn'
    likeBtn.textContent = 'Like'
    cocktailCollection.prepend(selectedCard)
  } else {
    likeBtn.className = "liked-button"
    likeBtn.textContent = 'Liked! ❤️'
    getLikeContainer.className = "container"
    getLikeSection.prepend(selectedCard)
  }
  if (getLikeSection.hasChildNodes() !== true) {
    getLikeContainer.className = 'hidden'
  }



}
function findBySpirit(e) {
  console.log(e.target.value)


  if (e.target.value === 'Non_Alcoholic') {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=' + e.target.value)
      .then(res => res.json())
      .then(someDrink => someDrink['drinks'].forEach(drink => getAllDrinkInfoFromId(drink['idDrink'])))
  } else {

    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + e.target.value)
      .then(res => res.json())
      .then(someDrink => someDrink['drinks'].forEach(drink => getAllDrinkInfoFromId(drink['idDrink'])))
  }
}


