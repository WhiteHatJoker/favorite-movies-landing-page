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
const header = document.querySelector('.page__header');
const scrollToTopButton = document.getElementById('js-top');
let isScrolling;
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
    newList.innerHTML = `<a href='#${listId}' class='menu__link'>${listName}</a>`;
    fragment.appendChild(newList);
}

function addSectionClass(section) {
    const box = section.getBoundingClientRect();
    const currentSectionId = section.getAttribute('id');
    const currentNavLink = document.querySelector(`#navbar__list li[data-navlist="${currentSectionId}"]`);
    if (box.top <= 590 && box.bottom >= 590) {
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

// Hide header when there is no scroll
function hideHeader() {
    header.style.display = "flex";
    window.clearTimeout( isScrolling );
	isScrolling = setTimeout(() => {
        header.style.display = "none";
	}, 1000);
}

// Show back to top button
function showBackToTop() {
    const currentScroll = window.scrollY;
    if (currentScroll>0) {
        scrollToTopButton.className = "top-link show";
    } else {
        scrollToTopButton.className = "top-link hide";
    }
}
// Scroll to top when button is clicked
function scrollToTop() {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c>0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 10);
    }
  };
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();
// Scroll to section on link click
scrollToAnchor();

document.addEventListener('scroll',(event) => {
    // Set sections as active 
    makeActive();
    // Hide header when there is no scroll
    hideHeader();
    // Show back to top button when enough scroll
    showBackToTop();
});

// Move to top when back to top button clicked
scrollToTopButton.addEventListener('click', (event) => {
    event.preventDefault();
    scrollToTop();
})
