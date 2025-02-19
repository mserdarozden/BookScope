import GoogleServices from "./GoogleServices.mjs";
import BookList from "./BookList.mjs";

// Function to list books based on a search query
function listBooks(query) {
    const dataSource = new GoogleServices(query, 20); // Initialize GoogleServices with query and limit
    const listElement = document.getElementById("book-cards"); // Get reference to book list container
    const bookList = new BookList(dataSource, listElement); // Create new BookList instance
    bookList.listBookByCategory(); // Fetch and render books by category
}

// Initial listing of books based on the selected genre
const genre = document.getElementById('genre').value; // Get initial genre selection
const query = `subject:${genre}`; // Construct query string
listBooks(query); // Fetch and display books for the selected genre

// Event listener for genre-based book search
const genreSearchButton = document.getElementById("genreSearch");
genreSearchButton.addEventListener('click', () => {
    const genre = document.getElementById('genre').value; // Get updated genre selection
    const query = `subject:${genre}`; // Construct query string
    listBooks(query); // Fetch and display books for the new genre
});

// Event listener for text-based book search
const textSearchButton = document.getElementById("textSearch");
const textBox = document.getElementById("bookQuery"); 

textSearchButton.addEventListener('click', () => {
    const text = textBox.value.trim(); // Get and trim user input

    if (!text) {
        alert("Please enter a search term."); // Alert user if input is empty
        return;
    }

    const query = `${encodeURIComponent(text)}`; // Encode search term for URL query
    listBooks(query); // Fetch and display books based on search term
    textBox.value = ""; // Clear input box after search
});

// Allow search when pressing 'Enter' in the text input box
textBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        textSearchButton.click(); // Trigger search button click event
    }
});