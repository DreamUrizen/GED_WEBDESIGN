fetch('data/projects.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(projects) {
        renderFeatured(projects);
        renderProjects(projects);
    })
    .catch(function(error) {
        console.error('projects.json을 불러오지 못했습니다:', error);
    });

function renderFeatured(projects) {
    const featuredBox = document.querySelector('#featured-project');
    if (!featuredBox) return;

    const featured = projects.find(function(project) {
        return project.featured;
    });

    if (!featured) return;

    featuredBox.innerHTML = `
        <a class="featured-card" href="project.html?id=${featured.id}">
            <div class="featured-img-wrap">
                <img src="${featured.thumbnail}" alt="${featured.title}">
            </div>
            <div class="featured-info">
                <span>Featured Project</span>
                <h3>${featured.title}</h3>
                <p>${featured.role}</p>
                <strong>View Project →</strong>
            </div>
        </a>
    `;
}

function renderProjects(projects) {
    const list = document.querySelector('#project-list');
    list.innerHTML = '';

    projects.forEach(function(project) {
        const li = document.createElement('li');

        li.innerHTML = `
            <a href="project.html?id=${project.id}">
                <div class="project-img-wrap">
                    <img src="${project.thumbnail}" alt="${project.title}">
                </div>
                <div class="card-overlay">
                    <span>View Project</span>
                    <h3>${project.title}</h3>
                </div>
            </a>
        `;

        list.appendChild(li);
    });
}

const navbar = document.querySelector('#navbar');
const topBtn = document.querySelector('.back-to-top-btn');
const cursor = document.querySelector('.custom-cursor');

function handleScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        topBtn.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        topBtn.classList.remove('visible');
    }

    revealOnScroll();
}

window.addEventListener('scroll', handleScroll);

window.addEventListener('mousemove', function(e) {
    if (!cursor) return;
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.body.addEventListener('mouseenter', function(e) {
    if (cursor && e.target.closest && e.target.closest('a')) {
        cursor.classList.add('cursor-active');
    }
}, true);

document.body.addEventListener('mouseleave', function(e) {
    if (cursor && e.target.closest && e.target.closest('a')) {
        cursor.classList.remove('cursor-active');
    }
}, true);

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(function(item) {
        const top = item.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.82) {
            item.classList.add('active');
        }
    });
}

handleScroll();
