import GoogleServices from "./GoogleServices.mjs";
import BookList from "./BookList.mjs";

function listBooks(query) {
    const dataSource = new GoogleServices(query, 20);
    const listElement = document.getElementById("book-cards");
    const bookList = new BookList(dataSource, listElement);
    bookList.listBookByCategory();
}

const genre = document.getElementById('genre').value;
const query = `subject:${genre}`
listBooks(query);

const genreSearchButton = document.getElementById("genreSearch");
genreSearchButton.addEventListener('click', () => {
    const genre = document.getElementById('genre').value;
    const query = `subject:${genre}`
    listBooks(query);
});

const textSearchButton = document.getElementById("textSearch");

textSearchButton.addEventListener('click', () => {
    const text = document.getElementById("bookQuery").value.trim();
    if (!text) {
        alert("Please enter a search term.");
        return;
    }
    const query = `${encodeURIComponent(text)}`;
    listBooks(query);
});

