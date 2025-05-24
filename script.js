const routes = {
    "/": "/pages/home.html",
    "/about": "/pages/about.html",
    "/projects": "/pages/projects.html",
    "/lectures": "/pages/lectures.html",
    "/activities": "/pages/activities.html",
};

window.addEventListener('popstate', () => {
    loadPage(location.pathname);
});

function easeIn() {
    document.body.classList.add('loaded');
}

function pageTransition() {
    const content = document.getElementById('content');
    content.classList.remove('loaded');
    setTimeout(() => {
        content.classList.add('fadeout');
    }, timeout = 250);
    void content.offsetWidth;
    setTimeout(() => {
        content.classList.add('loaded');
    }, timeout = 250);
    setTimeout(() => {
        content.classList.remove('fadeout');
    }, timeout = 500);
  }
  
function interactiveName(){
const nameElement = document.getElementById('interactive-name');
const letters = nameElement.textContent.split('');
  nameElement.innerHTML = letters
  .map(char => {
      if (char === ' ') return '&nbsp;';
      return `<span class="letter">${char}</span>`;
    })
    .join('');
}

function setupNavigation() {
    document.body.addEventListener('click', e => {
        if (e.target.matches('a[data-link]')) {
            e.preventDefault();
            const path = e.target.getAttribute('href');
            history.pushState(null, '', path);
            loadPage(path);
        }
    });
}

async function loadPage(path) {
    const file = routes[path] || routes['/'];

    try {
        const res = await fetch(file);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const html = await res.text();
        document.getElementById('content').innerHTML = html;
        pageTransition();
        if (path === '/') {
            interactiveName();
        }
    } catch (err) {
        console.error('Error loading page:', err);
        window.location.pathname = '/';
    }
}


window.onload = () => {
    document.body.classList.add('loaded');
    setupNavigation();

    const path = window.location.pathname;
    if (path !== '/' && !Object.keys(routes).includes(path)) {
        window.location.pathname = '/';
        return;
    }

    loadPage(location.pathname);    

}