import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class BookDetails {
    constructor(bookId, dataSource) {
        this.bookId = bookId; // Unique identifier for the book
        this.book = {}; // Object to store book details
        this.dataSource = dataSource; // Data source for fetching book details
        this.isFavorite = false; // Boolean to track if book is a favorite
        this.favButton = document.getElementById("favButton"); // Reference to favorite button
    }

    async init() {
        try {
            // Fetch book details using the provided data source
            this.book = await this.dataSource.findBookById(this.bookId);
            this.renderBookDetails(this.book); // Render book details in the UI
        } catch (error) {
            console.error("Error initializing book details:", error);
        }

        // Check if the book is already a favorite
        this.checkForFavorite();
        this.setFavButton();
        this.addEventListeners();
    }

    checkForFavorite() {
        let favorites = getLocalStorage("favorites");

        if (Array.isArray(favorites)) {
            this.isFavorite = favorites.some(book => book.id === this.book.id);
        }
    }

    addBookToFavorite() {
        this.checkForFavorite();
        let favorites = getLocalStorage("favorites");

        if (Array.isArray(favorites) && !this.isFavorite) {
            favorites.push(this.book);
            this.isFavorite = true;
            this.favButton.innerHTML = "Remove from favorite";
        } else if (!Array.isArray(favorites)) {
            favorites = [this.book];
            this.isFavorite = true;
            this.favButton.innerHTML = "Remove from favorite";
        }

        setLocalStorage("favorites", favorites);
    }

    removeBookFromFavorite() {
        let favorites = getLocalStorage("favorites");

        if (!Array.isArray(favorites)) {
            favorites = [];
        }

        // Find the index of the book by comparing IDs
        let index = favorites.findIndex(book => book.id === this.book.id);

        if (index !== -1) {
            favorites.splice(index, 1); // Remove the book from the array
            setLocalStorage("favorites", favorites); // Save updated array
            this.isFavorite = false;
            this.favButton.innerHTML = "Add to favorite";
        } else {
            console.log("Book not found in favorites");
        }
    }

    renderBookDetails(data) {
        document.getElementById("book-cover").src = data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : '/images/cover.webp';
        document.getElementById("book-cover").alt = data.volumeInfo.title || "Unknown Title";
        document.getElementById("book-title").textContent = data.volumeInfo.title || "Unknown Title";
        document.getElementById("book-author").textContent = data.volumeInfo.authors ? data.volumeInfo.authors.join(", ") : "Unknown Author";
        document.getElementById("book-description").innerHTML = data.volumeInfo.description || "No description available.";
        document.getElementById("book-publisher").textContent = data.volumeInfo.publisher || "Unknown Publisher";
        document.getElementById("book-date").textContent = data.volumeInfo.publishedDate || "Unknown Date";
        document.getElementById("book-pages").textContent = data.volumeInfo.pageCount || "N/A";
    }

    addEventListeners() {
        this.favButton.addEventListener("click", () => {
            this.favButton.style.transform = "scale(0.9)";
            setTimeout(() => {
                this.favButton.style.transform = "scale(1)";
            }, 150);

            // Toggle favorite status
            if (this.isFavorite) {
                this.removeBookFromFavorite();
            } else {
                this.addBookToFavorite();
            }
        });
    }

    setFavButton() {
        this.favButton = document.getElementById("favButton");
        if (this.isFavorite) {
            this.favButton.innerHTML = "Remove from favorite";
        } else {
            this.favButton.innerHTML = "Add to favorite";
        }
    }
}