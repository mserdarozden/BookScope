import { getParams } from "./utils.mjs";
import GoogleServices from "./GoogleServices.mjs";
import BookDetails from "./bookDetails.mjs";

const dataSource = new GoogleServices();
const bookId = getParams("book");

const book = new BookDetails(bookId, dataSource);
book.init(); 
