import { renderListWithTemplate, isNewDay, getLocalStorage, setLocalStorage } from "./utils.mjs";

// Function to generate HTML template for a book card
function bookCardTemplate(book) {
  const title = book.volumeInfo.title || 'Unknown Title'; // Get book title or default to 'Unknown Title'
  const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'; // Get authors or default to 'Unknown Author'
  const image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '/images/cover.webp'; // Get book cover image or use default
  const id = book.id; // Get book ID for linking to details page

  return `<li class="book-card">
      <a href="/pages/book_details/index.html?book=${id}">
        <img src="${image}" alt="Book Cover">
        <h2>${title}</h2>
        <p><strong>Author:</strong> ${authors}</p>
      </a>
    </li>`;
}

export default class BookList {

  constructor(dataSource, listElement) {
    this.dataSource = dataSource; // Data source for fetching books
    this.listElement = listElement; // Element where book list will be rendered
  }

  async init() {
    // Initialization method (currently not rendering anything)
  }

  async listDailyBooks() {
    try {
      // Check if it's a new day to fetch fresh data
      if (isNewDay()) {
        const bookList = await this.dataSource.getRandomData(); // Fetch random book data
        if (bookList && bookList.length > 0) {
          setLocalStorage("daily-books", bookList); // Store books in local storage
          this.renderList(bookList); // Render the list of books
        } else {
          console.warn("No books received from API."); // Log warning if API returns no data
        }
      } else {
        // Retrieve stored books from local storage if available
        const storedBookList = getLocalStorage("daily-books");
        if (storedBookList && storedBookList.length > 0) {
          this.renderList(storedBookList); // Render stored book list
        } else {
          console.warn("No stored books found. Fetching new data..."); // Log warning if no stored data exists
          const bookList = await this.dataSource.getRandomData(); // Fetch new data
          setLocalStorage("daily-books", bookList); // Store new data
          this.renderList(bookList); // Render the new list
        }
      }
    } catch (error) {
      console.error("Error fetching daily books:", error); // Log any errors that occur during fetching
    }
  }

  async listBookByCategory() {
    // Fetch books by category from data source
    const bookList = await this.dataSource.getData();
    this.renderList(bookList.items);
  }

  async listFavoriteBooks(list) {
    // Render a given list of favorite books
    this.renderList(list);
  }

  renderList(list) {
    // Render the book list using the provided template function
    renderListWithTemplate(bookCardTemplate, this.listElement, list);
  }
}