# phase-1-project
PHASE 1 PROJECT: BarTinder
BarTinder is an input-driven cocktail generator with a few user-interactive options. The user can generate cocktails in four separate ways: find by type of spirit, find by cocktail name, find by ingredient, and generate a random cocktail from an API known as TheCocktailDB. (https://www.thecocktaildb.com/api.php)

The first user interaction is a drop-down menu labeled Find by type of Spirit. A user can select one of the pre-designated spirits listed to display cocktails that utilize that spirit. The application then retrieves each cocktail in the API's search by the ingredient list and returns a curated list of cocktails.
The second user interaction on the application is the Search for Cocktail by Name field. Here, the user can input a name of a cocktail and the application will generate a list of cocktails related to that name.

The third user interaction is a Search By Ingredient function that takes a user input of an ingredient found in a cocktail and returns cocktails that include that ingredient in their recipes.
If an ingredient or a cocktail name does not return any cocktails, the user will see an alert explaining that no cocktails can be found and to try another input.
The last user interaction is a Random Cocktail Generator. A user simply clicks the button to produce a randomly generated cocktail from the API.
The generated cocktails also have functionality for the user. These 'cocktail cards' display the name of the cocktail, the type of drink, whether the drink is alcoholic or non-alcoholic, a photo of the cocktail, and three interactive buttons: Like, Cocktail Recipe, and Remove.

The Like button will take the card and emplace it in a newly generated container called the Like Container. Here, users can remove those cocktails from the container and place them back into the original container by clicking the Liked button.

The Cocktail Recipe button will extend the cocktail card and retrieve the cocktail recipe from the API and compile a table with ingredients and amounts for the user. The card will also display the best type of glass for the cocktail and instructions on how to construct the cocktail according to the API.

The Remove button will, when clicked, remove the cocktail card entirely from the site, regardless of which container it is in.

The final button is the Remove All Cocktails button. This button populates when there are cocktail cards displayed in the container and will remove all cards when clicked.
