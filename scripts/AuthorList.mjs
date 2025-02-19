import { renderListWithTemplate, isNewDay, getLocalStorage, setLocalStorage } from "./utils.mjs";

// Function to generate HTML template for an author card to display in the list
function authorCardTemplate(author) {
  const name = author.title || 'Unknown Author'; // Use provided title or fallback to 'Unknown Author'
  const bio = author.extract ? author.extract : 'Unknown Biography'; // Use provided biography or fallback to 'Unknown Biography'
  const image = author.thumbnail ? author.thumbnail.source : '/images/cover.webp'; // Use provided image or default placeholder

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
    this.dataSource = dataSource; // Data source for fetching authors
    this.listElement = listElement; // The element where author list will be rendered
  }

  async listDailyAuthors() {
    try {
      // Check if it's a new day to fetch fresh data
      if (isNewDay()) {
        const authorList = await this.dataSource.getRandomData(); // Fetch random author data
        if (authorList && authorList.length > 0) {
          setLocalStorage("daily-authors", authorList); // Store authors in local storage
          this.renderList(authorList); // Render the list of authors
        } else {
          console.warn("No authors received from API."); // Log warning if API returns no data
        }
      } else {
        // Retrieve stored authors from local storage if available
        const storedAuthorList = getLocalStorage("daily-authors");
        if (storedAuthorList && storedAuthorList.length > 0) {
          this.renderList(storedAuthorList); // Render stored author list
        } else {
          console.warn("No stored authors found. Fetching new data..."); // Log warning if no stored data exists
          const authorList = await this.dataSource.getRandomData(); // Fetch new data
          setLocalStorage("daily-authors", authorList); // Store new data
          this.renderList(authorList); // Render the new list
        }
      }
    } catch (error) {
      console.error("Error fetching daily authors:", error); // Log any errors that occur during fetching
    }
  }

  // Render the list of authors using a provided template function
  renderList(list) {
    renderListWithTemplate(authorCardTemplate, this.listElement, list);
  }

}
