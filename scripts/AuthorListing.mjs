async function fetchAuthors() {
    try {
        const query = "javascript programming"; // Change query as needed
        const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
        
        // Fetch data from Google Books API
        const response = await fetch(url);
        const data = await response.json();

        // Extract authors from response
        let authorsSet = new Set(); // To store unique authors

        if (data.items) {
            data.items.forEach(item => {
                if (item.volumeInfo.authors) {
                    item.volumeInfo.authors.forEach(author => authorsSet.add(author));
                }
            });
        }

        // Convert set to array
        const authorsArray = Array.from(authorsSet);

        // Display authors in HTML
        const authorsList = document.getElementById("authorsList");
        authorsList.innerHTML = ""; // Clear previous entries

        authorsArray.forEach(author => {
            let li = document.createElement("li");
            li.textContent = author;
            authorsList.appendChild(li);
        });

        console.log("Authors Retrieved:", authorsArray);
    } catch (error) {
        console.error("Error fetching authors:", error);
    }
}