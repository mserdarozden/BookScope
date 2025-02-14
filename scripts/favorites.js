import { getLocalStorage, setLocalStorage,renderListWithTemplate } from "./utils.mjs";
import BookList from "./BookList.mjs";

let favorites = getLocalStorage("favorites");
console.log(favorites);
const listElement = document.getElementById("book-cards");
const bookList = new BookList(favorites, listElement);
bookList.listFavoriteBooks(favorites);
