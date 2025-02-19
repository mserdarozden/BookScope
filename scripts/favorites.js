import { getLocalStorage } from "./utils.mjs";
import BookList from "./BookList.mjs";

// Retrieve favorite books from localStorage or initialize an empty array
let favorites = getLocalStorage("favorites") || [];

const listElement = document.getElementById("book-cards"); // Reference to book list container
const bookList = new BookList(favorites, listElement); // Initialize BookList instance with favorites

// Check if favorites exist and display them, otherwise show a placeholder message
if (Array.isArray(favorites) && favorites.length > 0) {
    bookList.listFavoriteBooks(favorites); // Render favorite books
} else {
    listElement.innerHTML = "<p><br><br><br><br><br><br>No favorite books yet. Start adding some!<br><br><br><br><br><br></p>"; // Display message if no favorites found
}
