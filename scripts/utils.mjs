// Utility functions for rendering and loading templates

// Function to render a list using a template function
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
    const htmlStrings = list.map(templateFn);
    // If clear is true, remove existing content before inserting new items
    if (clear) {
        parentElement.innerHTML = "";
    }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Function to render a template with optional callback function
export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.insertAdjacentHTML("afterbegin", template);
    if (callback) {
        callback(data);
    }
}

// Function to load an HTML template from a given path
async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

// Function to dynamically load the header, footer, and navigation into a page
export async function loadHeaderFooter(headerSRC, footerSRC, navSRC) {
    const headerTemplate = await loadTemplate(headerSRC);
    const headerElement = document.querySelector("#header");

    const footerTemplate = await loadTemplate(footerSRC);
    const footerElement = document.querySelector("#footer");

    const navTemplate = await loadTemplate(navSRC);
    const navElement = document.querySelector("#animatedNav");

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
    renderWithTemplate(navTemplate, navElement);
}

// Function to load a modal template dynamically
export async function loadModal() {
    const modalTemplate = await loadTemplate("../../pages/partials/author-modal.html");
    const modalElement = document.querySelector("#authorModal");
    renderWithTemplate(modalTemplate, modalElement);
}

// Retrieve data from local storage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Check if it is a new day and update the stored date accordingly
export function isNewDay() {
    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const lastCheckedDay = localStorage.getItem('lastCheckedDay');
    if (lastCheckedDay !== today) {
        localStorage.setItem('lastCheckedDay', today); // Update last checked day
        return true;
    }
    return false;
}

// Function to retrieve URL parameters by key
export function getParams(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}