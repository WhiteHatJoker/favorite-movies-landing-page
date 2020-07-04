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
const navBar = document.getElementById('navbar__list');
const sections = document.querySelectorAll('main section');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function buildList(listItem, index) {
    const newList = document.createElement('li');
    const listName = listItem.getAttribute('data-nav');
    const listId = listItem.getAttribute('id');
    newList.setAttribute("data-navlist", listId);
    newList.innerHTML = `<a href='#${listId}'>${listName}</a>`;
    fragment.appendChild(newList);
}

function addSectionClass(section) {
    const box = section.getBoundingClientRect();
    const currentSectionId = section.getAttribute('id');
    const currentNavLink = document.querySelector(`#navbar__list li[data-navlist="${currentSectionId}"]`);
    if (box.top <= 750 && box.bottom >= 750) {
        section.classList.add('active-section');
        currentNavLink.classList.add('active-link');
    } else {
        section.classList.remove('active-section');
        currentNavLink.classList.remove('active-link');
    }
}

function buildScroll(menuLink) {
    menuLink.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('it is running');
        document.querySelector(menuLink.getAttribute("href")).scrollIntoView({
            behavior: 'smooth'
        });
    });
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav() {
    sections.forEach(buildList);
    navBar.appendChild(fragment);
}


// Add class 'active' to section when near top of viewport
function makeActive() {
    sections.forEach(addSectionClass);
}

// Scroll to anchor ID using scrollTO event
function scrollToAnchor() {
    const links = document.querySelectorAll('#navbar__list li a');
    links.forEach(buildScroll);
} 

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();
// Scroll to section on link click
scrollToAnchor();

// Set sections as active
document.addEventListener('scroll',() => { makeActive();});
