export default class AuthorDetails {
    constructor(authorElement, authorName, wDataSource, closeButton) {
        // Assigning parameters to class properties
        this.dataSource = wDataSource; // Data source for fetching author details
        this.authorElement = authorElement; // Modal element to display author details
        this.authorName = authorName; // Clickable element to trigger author details
        this.closeButton = closeButton; // Button to close the modal
    }

    async init() {
        // Initialize the component by adding event listeners
        this.addEventListeners();
    }

    async logAuthor() {
        try {
            // Fetch author data using the dataSource
            const author = await this.dataSource.getData(this.authorName.textContent);
            // Data is fetched but not used
            // console.log(author); // Uncomment to log author data to console for debugging
        } catch (error) {
            // Log error if fetching author data fails
            console.error("Error initializing author details:", error);
        }
    }

    addEventListeners() {
        // Check if required elements exist before adding event listeners
        if (!this.authorElement) {
            console.error("authorElement (modal) not found!");
            return;
        }
        if (!this.authorName) {
            console.error("authorName (click trigger) not found!");
            return;
        }
        if (!this.closeButton) {
            console.error("closeButton not found!");
            return;
        }

        // Add click event listener to authorName to display author details
        this.authorName.addEventListener("click", () => {
            this.renderAuthorDetails();
        });

        // Add click event listener to closeButton to hide the modal
        this.closeButton.addEventListener("click", () => {
            this.authorElement.style.display = "none";
        });
    }

    async renderAuthorDetails() {
        // Fetch author details from data source
        const data = await this.dataSource.getData(this.authorName.textContent);

        // Check if the data contains necessary information
        if (data.title && data.extract) {
            // Display the modal
            this.authorElement.style.display = "flex";

            // Update modal content with author details
            document.getElementById("title").innerText = data.title;
            document.getElementById("summary").innerText = data.extract;
            document.getElementById("wikiLink").href = data.content_urls.desktop.page;

            // Display author image if available, otherwise hide the image element
            if (data.thumbnail) {
                document.getElementById("image").src = data.thumbnail.source;
                document.getElementById("image").style.display = "block";
            } else {
                document.getElementById("image").style.display = "none";
            }
        } else {
            // Show alert if no results were found
            alert("No results found. Try another author.");
        }
    }
}