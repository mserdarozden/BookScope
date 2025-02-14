import { renderListWithTemplate, isNewDay, getLocalStorage, setLocalStorage } from "./utils.mjs";

function bookCardTemplate(book) {
  const title = book.volumeInfo.title || 'Unknown Title';
  const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
  const image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '/images/cover.webp';
  const id = book.id;

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
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {

    //this.renderList(productList);
  }

  async listDailyBooks() {
    try {
      if (isNewDay()) {
        const bookList = await this.dataSource.getRandomData();
        if (bookList && bookList.length > 0) {
          setLocalStorage("daily-books", bookList);
          this.renderList(bookList);
        } else {
          console.warn("No books received from API.");
        }
      } else {
        const storedBookList = getLocalStorage("daily-books");
        if (storedBookList && storedBookList.length > 0) {
          console.log(storedBookList);
          this.renderList(storedBookList);
        } else {
          console.warn("No stored books found. Fetching new data...");
          const bookList = await this.dataSource.getRandomData();
          setLocalStorage("daily-books", bookList);
          this.renderList(bookList);
        }
      }
    } catch (error) {
      console.error("Error fetching daily books:", error);
    }
  }

  async listBookByCategory() {
    const bookList = await this.dataSource.getData();
    this.renderList(bookList.items);
  }

  async listFavoriteBooks(list) {
    this.renderList(list);
  }

  renderList(list) {
    //console.log(bookCardTemplate);
    renderListWithTemplate(bookCardTemplate, this.listElement, list);
  };

  

}