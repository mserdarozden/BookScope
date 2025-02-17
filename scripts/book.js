import { getParams } from "./utils.mjs";
import GoogleServices from "./GoogleServices.mjs";
import WikiServices from "./WikiServices.mjs";
import BookDetails from "./bookDetails.mjs";
import AuthorDetails from "./AuthorDetails.mjs";
import { loadModal } from "./utils.mjs";

const gDataSource = new GoogleServices();
const bookId = getParams("book");

const book = new BookDetails(bookId, gDataSource);
book.init();

loadModal().then(() => {
    console.log("Modal loaded.");


    const authorElement = document.getElementById("authorModal");
    const authorName = document.getElementById("book-author");
    const closeButton = document.getElementById("closeButton");

    console.log("Checking elements:", { authorElement, authorName, closeButton });

    if (!authorElement || !authorName || !closeButton) {
        console.error("One or more modal elements not found. Ensure loadModal() is correctly inserting them.");
        return;
    }

    const wDataSource = new WikiServices();
    const author = new AuthorDetails(authorElement, authorName, wDataSource, closeButton);
    author.init();

}).catch(error => {
    console.error("Error loading modal:", error);
});




