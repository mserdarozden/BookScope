export default class WikiServices {
    constructor() {
        // List of famous authors to be used for fetching random author data
        this.famousAuthors = [
            "William Shakespeare", "Leo Tolstoy", "Jane Austen", "Mark Twain", "Charles Dickens",
            "Fyodor Dostoevsky", "George Orwell", "Virginia Woolf", "J.R.R. Tolkien", "Ernest Hemingway",
            "Gabriel García Márquez", "Franz Kafka", "Homer", "James Joyce", "Harper Lee",
            "Miguel de Cervantes", "Emily Dickinson", "Herman Melville", "Victor Hugo", "Dante Alighieri",
            "J.K. Rowling", "Agatha Christie", "Oscar Wilde", "Edgar Allan Poe", "Toni Morrison",
            "Marcel Proust", "John Steinbeck", "Arthur Conan Doyle", "Aldous Huxley", "C.S. Lewis",
            "F. Scott Fitzgerald", "Kurt Vonnegut", "Walt Whitman", "H.P. Lovecraft", "Albert Camus",
            "Jean-Paul Sartre", "Stephen King", "Alexandre Dumas", "Rudyard Kipling", "Anton Chekhov",
            "Philip K. Dick", "Isaac Asimov", "Ray Bradbury", "George R.R. Martin", "Robert Louis Stevenson",
            "Mary Shelley", "Bram Stoker", "Emily Brontë", "Charlotte Brontë", "Jules Verne",
            "Voltaire", "T.S. Eliot", "H.G. Wells", "Henry James", "Jack London",
            "James Baldwin", "Chinua Achebe", "Maya Angelou", "Haruki Murakami", "J.D. Salinger",
            "E.M. Forster", "John Milton", "Plato", "Friedrich Nietzsche", "Karl Marx",
            "Noam Chomsky", "Simone de Beauvoir", "Sylvia Plath", "Margaret Atwood", "Salman Rushdie",
            "Kazuo Ishiguro", "Orhan Pamuk", "Isabel Allende", "Paulo Coelho", "Umberto Eco",
            "Milan Kundera", "Alice Munro", "José Saramago", "Chimamanda Ngozi Adichie", "Vladimir Nabokov",
            "Jorge Luis Borges", "Italo Calvino", "Roberto Bolaño", "Thomas Mann", "Hermann Hesse",
            "Johann Wolfgang von Goethe", "Bertolt Brecht", "Elfriede Jelinek", "Franz Werfel", "Erich Maria Remarque",
            "Yasunari Kawabata", "Kenzaburō Ōe", "Banana Yoshimoto", "Jun'ichirō Tanizaki", "Murasaki Shikibu",
            "Laozi", "Mo Yan", "Naguib Mahfouz", "Taha Hussein", "Khalil Gibran",
            "Yaşar Kemal", "Nazım Hikmet", "Elif Shafak", "Ahmet Hamdi Tanpınar", "Peyami Safa"
        ];
    }

    // Fetch author data from Wikipedia API
    async getData(query) {
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data; // Return the fetched data
        } catch (error) {
            console.error('Error fetching author data:', error);
            return null; // Return null in case of an error
        }
    }

    // Fetch random author data from the predefined list
    async getRandomData() {
        // Select 4 random authors from the list
        const queries = this.famousAuthors.sort(() => 0.5 - Math.random()).slice(0, 4);

        try {
            // Fetch data for all selected authors in parallel
            const responses = await Promise.all(
                queries.map(async (query) => {
                    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
                    if (!response.ok) return null; // Skip if response is not successful
                    return response.json();
                })
            );

            // Filter out unsuccessful responses
            const randomAuthors = responses.filter(author => author !== null);
            return randomAuthors;

        } catch (error) {
            console.error("Error fetching random authors:", error);
            return [];
        }
    }
}
