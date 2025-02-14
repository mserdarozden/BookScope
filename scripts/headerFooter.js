import { loadHeaderFooter } from "./utils.mjs";
import HamburgerMenu from "./HamburgerMenu.mjs";

const headerSRC = "../../pages/partials/header.html";
const footerSRC = "../../pages/partials/footer.html";
const navSRC = "../../pages/partials/animated-nav.html";

loadHeaderFooter(headerSRC, footerSRC, navSRC).then(() => {
    const hamburgerElement = document.querySelector("#hamButton");
    const navElement = document.querySelector("#animatedNav");

    if (hamburgerElement && navElement) {
        const hamburgerMenu = new HamburgerMenu(hamburgerElement, navElement);
        hamburgerMenu.init();
    } else {
        console.error("Hamburger menu elements not found.");
    }
});