import { loadHeaderFooter } from "./utils.mjs";
import HamburgerMenu from "./HamburgerMenu.mjs";

// Define file paths for header, footer, and navigation partials
const headerSRC = "../../pages/partials/header.html";
const footerSRC = "../../pages/partials/footer.html";
const navSRC = "../../pages/partials/animated-nav.html";

// Load header, footer, and navigation elements dynamically
loadHeaderFooter(headerSRC, footerSRC, navSRC).then(() => {
    // Select the hamburger button and navigation menu elements
    const hamburgerElement = document.querySelector("#hamButton");
    const navElement = document.querySelector("#animatedNav");

    // Ensure both elements exist before initializing the hamburger menu
    if (hamburgerElement && navElement) {
        const hamburgerMenu = new HamburgerMenu(hamburgerElement, navElement);
        hamburgerMenu.init(); // Initialize hamburger menu functionality
    } else {
        console.error("Hamburger menu elements not found.");
    }
});