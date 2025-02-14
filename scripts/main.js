import GoogleServices from "./GoogleServices.mjs";
import BookList from "./BookList.mjs";

const dataSource = new GoogleServices();
const listElement = document.getElementById("book-cards");
const bookList = new BookList(dataSource, listElement);
bookList.listDailyBooks();