export default class HamburgerMenu {
    constructor(hamburgerElement, navElement) {
        this.hamburgerElement = hamburgerElement;
        this.navElement = navElement;
    }

    init() {
        this.addEventListeners();
    }

    toggleClass() {
        this.navElement.classList.toggle('open');
        this.hamburgerElement.classList.toggle('open');
    }

    addEventListeners() {
        this.hamburgerElement.addEventListener('click', () => {
            this.toggleClass();
        });
    }
}