import { getLocalStorage } from "./utils.mjs";
import BookList from "./BookList.mjs";

// Retrieve favorites from localStorage
let favorites = getLocalStorage("favorites") || []; // Ensure it's an array

const listElement = document.getElementById("book-cards");
const bookList = new BookList(favorites, listElement);

//console.log("Favorites:", favorites);

if (Array.isArray(favorites) && favorites.length > 0) {
    //console.log("Displaying favorite books...");
    bookList.listFavoriteBooks(favorites);
} else {
    //console.log("No favorites found.");
    listElement.innerHTML = "<p><br><br><br><br><br><br>No favorite books yet. Start adding some!<br><br><br><br><br><br></p>";
}

