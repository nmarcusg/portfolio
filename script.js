function easeIn() {
    document.body.classList.add('loaded');
}

function fadeInContent() {
    const content = document.getElementById('content');
    content.classList.remove('loaded');
    void content.offsetWidth;
    content.classList.add('loaded');
  }

// function interactiveName(){
// const nameElement = document.getElementById('interactive-name');
//   const letters = nameElement.textContent.split('');
//   nameElement.innerHTML = letters
//     .map(char => {
//       if (char === ' ') return '&nbsp;';
//       return `<span class="letter">${char}</span>`;
//     })
//     .join('');
// }

async function loadPage(path) {
    const routes = {
        "/": "/pages/home.html",
        "/about": "/pages/about.html",
        "/projects": "/pages/projects.html",
        "/lectures": "/pages/lectures.html",
        "/activities": "/pages/activities.html",
    };

    const file = routes [path] || "404.html";

    try {
        const res = await fetch(file);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const html = await res.text();
        document.getElementById('content').innerHTML = html;
        fadeInContent();
    } catch (err) {
        document.getElementById('content').innerHTML = `<h1>Page Not Found</h1>`;
    }
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

window.onload = () => {
    document.body.classList.add('loaded');

    setupNavigation();

    loadPage(location.pathname);    

    // interactiveName();
}