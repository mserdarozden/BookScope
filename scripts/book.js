import { getParams, loadModal } from "./utils.mjs";
import GoogleServices from "./GoogleServices.mjs";
import WikiServices from "./WikiServices.mjs";
import BookDetails from "./bookDetails.mjs";
import AuthorDetails from "./AuthorDetails.mjs";

// Initialize Google Services data source
const gDataSource = new GoogleServices();
// Retrieve book ID from URL parameters
const bookId = getParams("book");

// Create a new BookDetails instance and initialize it
const book = new BookDetails(bookId, gDataSource);
book.init();

// Load the modal and then initialize author details when ready
loadModal().then(() => {
    //console.log("Modal loaded.");

    // Retrieve modal elements
    const authorElement = document.getElementById("authorModal");
    const authorName = document.getElementById("book-author");
    const closeButton = document.getElementById("closeButton");

    //console.log("Checking elements:", { authorElement, authorName, closeButton });

    // Ensure all required elements exist before initializing author details
    if (!authorElement || !authorName || !closeButton) {
        console.error("One or more modal elements not found. Ensure loadModal() is correctly inserting them.");
        return;
    }

    // Initialize Wikipedia data source for fetching author details
    const wDataSource = new WikiServices();
    const author = new AuthorDetails(authorElement, authorName, wDataSource, closeButton);
    author.init();

}).catch(error => {
    console.error("Error loading modal:", error); // Log error if modal loading fails
});
