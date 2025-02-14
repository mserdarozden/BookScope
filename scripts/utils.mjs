//Loading header and footer

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
    //console.log("rendering...")
    const htmlStrings = list.map(templateFn);
    //console.log(templateFn);
    // if clear is true we need to clear out the contents of the parent.
    if (clear) {
      parentElement.innerHTML = "";
    }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
    ;
  }

export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.insertAdjacentHTML("afterbegin", template);
    if (callback) {
        callback(data);
    }
}

async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

// function to dynamically load the header and footer into a page
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

// retrieve data from localstorage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

//Check if it is a new day
export function isNewDay() {
    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const lastCheckedDay = localStorage.getItem('lastCheckedDay');
    if (lastCheckedDay !== today) {
        localStorage.setItem('lastCheckedDay', today); // Update last checked day
        return true;
    }
    return false;
}

export function getParams(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
  
    return urlParams.get(param);;
  }
