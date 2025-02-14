const apiKey = 'AIzaSyDN3iG54Fhyz2EITBg8cX-pJmcCNIY0iSM';

export default class GoogleServices {
    constructor(query, maxResult) {
        this.query = query;
        this.maxResult = maxResult;

    }

    async getData() {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${this.query}&maxResults=${this.maxResult}&key=${apiKey}`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            return data;  // Now properly returning the fetched data
        } catch (error) {
            console.error('Error fetching books:', error);
            return null; // Return null or handle errors properly
        }
    }

    async getRandomData() {
        const queries = [
            "subject:Fiction",
            "subject:Mystery",
            "subject:Romance",
            "subject:Science%20Fiction",
            "subject:Biography"
        ];

        let allBooks = [];

        try {
            // Fetch all books in parallel
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

            // Shuffle and pick 4 random books
            const randomBooks = allBooks.sort(() => 0.5 - Math.random()).slice(0, 4);

            // Output the selected books
            //console.log("Randomly selected books:", randomBooks);

            return randomBooks;

        } catch (error) {
            console.error("Error fetching daily books:", error);
        }
    }

    async findBookById(bookId) {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`);
            const data = await response.json();
            return data; 
        } catch (error) {
            console.error("Error fetching book:", error);
            return null; 
        }
    }
}