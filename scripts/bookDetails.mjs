import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class BookDetails {
    constructor(bookId, dataSource) {
        this.bookId = bookId;
        this.book = {};
        this.dataSource = dataSource;
        this.isFavorite = false;
        this.favButton = favButton;
    }

    async init() {
        //console.log("initializing");
        try {
            this.book = await this.dataSource.findBookById(this.bookId);
            console.log(this.book);

            this.renderBookDetails(this.book);
            //this.addEventListeners();
        } catch (error) {
            console.error("Error initializing product details:", error);
        }

        this.checkForFavorite();
        console.log(this.isFavorite);
        this.setFavButton();
        this.addEventListeners();
    }

    checkForFavorite() {
        let favorites = getLocalStorage("favorites");
        
        if (Array.isArray(favorites)) {
            console.log(favorites);
            this.isFavorite = favorites.some(book => book.id === this.book.id);
          } 
    }

    addBookToFavorite() {
        this.checkForFavorite();
        let favorites = getLocalStorage("favorites");

        if (Array.isArray(favorites) && (!this.isFavorite)) {
            favorites.push(this.book);
            this.isFavorite = true;
            this.favbutton.innerHTML = "Remove from favorite";
          } else if (!Array.isArray(favorites)) {
            favorites = []; 
            favorites.push(this.book);
            this.isFavorite = true;
            this.favbutton.innerHTML = "Remove from favorite";
          }
          setLocalStorage("favorites", favorites);
          
          console.log(favorites);
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
            this.favbutton.innerHTML = "Add to favorite";
            console.log("Book removed:", this.book);
        } else {
            console.log("Book not found in favorites");
        }
        console.log(favorites);
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
        this.favButton.addEventListener ("click", () => {
            console.log("button clicked")
            if (this.isFavorite) {
                this.removeBookFromFavorite();
            } else {
                this.addBookToFavorite();
            };
            
        });
    }

    setFavButton() {
        this.favbutton = document.getElementById("favButton");
        if (this.isFavorite) {
            this.favButton.innerHTML = "Remove from favorite";
        } else {
            this.favButton.innerHTML = "Add to favorite";
        };

    }
}