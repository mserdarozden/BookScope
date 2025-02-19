import { renderListWithTemplate, isNewDay, getLocalStorage, setLocalStorage } from "./utils.mjs";

function authorCardTemplate(author) {
  const name = author.title || 'Unknown Author';
  const bio = author.extract ? author.extract : 'Unknown Biography';
  const image = author.thumbnail ? author.thumbnail.source : '/images/cover.webp';

  return `<li class="author-card">
            <img src="${image}" alt="Book Cover">
            <div>
                <h2>${name}</h2>
                <p><strong></strong> ${bio}</p>
            <div>
    </li>`;
}

export default class AuthorList {

  constructor(dataSource, listElement) {
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {

    //this.renderList(productList);
  }

  async listDailyAuthors() {
    try {
      if (isNewDay()) {
        const authorList = await this.dataSource.getRandomData();
        if (authorList && authorList.length > 0) {
          setLocalStorage("daily-authors", authorList);
          this.renderList(authorList);
        } else {
          console.warn("No books received from API.");
        }
      } else {
        const storedAuthorList = getLocalStorage("daily-authors");
        if (storedAuthorList && storedAuthorList.length > 0) {
          //console.log(storedAuthorList);
          this.renderList(storedAuthorList);
        } else {
          console.warn("No stored authors found. Fetching new data...");
          const authorList = await this.dataSource.getRandomData();
          setLocalStorage("daily-authors", authorList);
          this.renderList(authorList);
        }
      }
    } catch (error) {
      console.error("Error fetching daily authors:", error);
    }
  }

  renderList(list) {
    renderListWithTemplate(authorCardTemplate, this.listElement, list);
  };

  

}