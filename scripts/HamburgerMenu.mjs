export default class HamburgerMenu {
    constructor(hamburgerElement, navElement) {
        this.hamburgerElement = hamburgerElement; // The button element that toggles the menu
        this.navElement = navElement; // The navigation element to be toggled
    }

    // Initialize the hamburger menu by adding event listeners
    init() {
        this.addEventListeners();
    }

    // Toggle the 'open' class on both elements to show or hide the menu
    toggleClass() {
        this.navElement.classList.toggle('open');
        this.hamburgerElement.classList.toggle('open');
    }

    // Add event listener to toggle the menu when the hamburger button is clicked
    addEventListeners() {
        this.hamburgerElement.addEventListener('click', () => {
            this.toggleClass();
        });
    }
}
