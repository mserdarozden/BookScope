const apiKey = 'AIzaSyDN3iG54Fhyz2EITBg8cX-pJmcCNIY0iSM';

export default class GoogleServices {
    constructor(query, maxResult) {
        this.query = query; // Search query for Google Books API
        this.maxResult = maxResult; // Maximum number of results to fetch
    }

    async getData() {
        // Construct API URL with query and key
        const url = `https://www.googleapis.com/books/v1/volumes?q=${this.query}&maxResults=${this.maxResult}&key=${apiKey}`;
    
        try {
            const response = await fetch(url); // Fetch data from API
            const data = await response.json(); // Parse JSON response
            return data; // Return fetched data
        } catch (error) {
            console.error('Error fetching books:', error);
            return null; // Return null in case of an error
        }
    }

    async getRandomData() {
        // Predefined list of book genres for fetching random books
        const queries = [
            "subject:Fiction",
            "subject:Mystery",
            "subject:Romance",
            "subject:Science%20Fiction",
            "subject:Biography"
        ];

        let allBooks = [];

        try {
            // Fetch books from all queries in parallel
            const responses = await Promise.all(
                queries.map(query => fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&key=${apiKey}`)
                    .then(response => response.json()))
            );

            // Collect all books from responses
            responses.forEach(data => {
                if (data.items) {
                    allBooks.push(...data.items);
                }
            });

            // Shuffle and select 4 random books
            const randomBooks = allBooks.sort(() => 0.5 - Math.random()).slice(0, 4);

            return randomBooks;

        } catch (error) {
            console.error("Error fetching daily books:", error);
        }
    }

    async findBookById(bookId) {
        try {
            // Fetch book details by ID
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`);
            const data = await response.json();
            return data; // Return book details
        } catch (error) {
            console.error("Error fetching book:", error);
            return null; // Return null if an error occurs
        }
    }
}