import GoogleServices from "./GoogleServices.mjs";
import WikiServices from "./WikiServices.mjs";
import BookList from "./BookList.mjs";
import AuthorList from "./AuthorList.mjs";

// Initialize Google Books data source and book list component
const gDataSource = new GoogleServices();
const gListElement = document.getElementById("book-cards");
const bookList = new BookList(gDataSource, gListElement);
bookList.listDailyBooks(); // Fetch and display daily books

// Initialize Wikipedia data source and author list component
const wDataSource = new WikiServices();
const wListElement = document.getElementById("author-cards");
const authorList = new AuthorList(wDataSource, wListElement);
authorList.listDailyAuthors(); // Fetch and display daily authors

// Add click effect animation to the CTA button
document.getElementById("ctaButton").addEventListener("click", function() {
    this.style.transform = "scale(0.9)";
    setTimeout(() => {
        this.style.transform = "scale(1)";
    }, 150);
});