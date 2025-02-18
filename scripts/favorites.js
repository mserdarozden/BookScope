import { getLocalStorage } from "./utils.mjs";
import BookList from "./BookList.mjs";

let favorites = getLocalStorage("favorites");

const listElement = document.getElementById("book-cards");
const bookList = new BookList(favorites, listElement);
bookList.listFavoriteBooks(favorites);
