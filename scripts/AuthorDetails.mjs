export default class AuthorDetails {
    constructor(authorElement, authorName, wDataSource, closeButton) {
        this.dataSource = wDataSource;
        this.authorElement = authorElement;
        this.authorName = authorName;
        this.closeButton = closeButton;

    }

    async init() {
        //console.log("author initializing");

        this.addEventListeners();
    }

    async logAuthor() {
        try {
            const author = await this.dataSource.getData(this.authorName.textContent);
            //console.log(author);
        } catch (error) {
            console.error("Error initializing author details:", error);
        }
    }

    addEventListeners() {
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
    
        this.authorName.addEventListener("click", () => {
            //console.log("Author clicked");
            this.renderAuthorDetails();

        });
    
        this.closeButton.addEventListener("click", () => {
            //console.log("Close button clicked");
            this.authorElement.style.display = "none";
        });
    }

    async renderAuthorDetails() {
        
        const data = await this.dataSource.getData(this.authorName.textContent);

        if (data.title && data.extract) {
            this.authorElement.style.display = "flex";
            document.getElementById("title").innerText = data.title;
            document.getElementById("summary").innerText = data.extract;
            document.getElementById("wikiLink").href = data.content_urls.desktop.page;

            if (data.thumbnail) {
                document.getElementById("image").src = data.thumbnail.source;
                document.getElementById("image").style.display = "block";
            } else {
                document.getElementById("image").style.display = "none";
            }

        } else {
            alert("No results found. Try another author.");
        }
        

    }

}