/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const fragment = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function buildList(listItem, index) {
    const newList = document.createElement('li');
    const listName = listItem.getAttribute('data-nav');
    const listId = listItem.getAttribute('id');
    newList.innerHTML = `<a href='#${listId}' data-navlist="${listId}">${listName}</a>`;
    fragment.appendChild(newList);
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav() {
    const sections = document.querySelectorAll('main section');
    const navBar = document.getElementById('navbar__list');
    sections.forEach(buildList);
    navBar.appendChild(fragment);
}


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    buildNav();
});
// Scroll to section on link click

// Set sections as active


