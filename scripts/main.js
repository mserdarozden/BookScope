import GoogleServices from "./GoogleServices.mjs";
import WikiServices from "./WikiServices.mjs";
import BookList from "./BookList.mjs";
import AuthorList from "./AuthorList.mjs";


const gDataSource = new GoogleServices();
const gListElement = document.getElementById("book-cards");
const bookList = new BookList(gDataSource, gListElement);
bookList.listDailyBooks();

const wDataSource = new WikiServices();
const wListElement = document.getElementById("author-cards");
const authorList = new AuthorList(wDataSource, wListElement);
authorList.listDailyAuthors();