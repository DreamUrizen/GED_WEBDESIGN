fetch('data/projects.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(projects) {
        renderProjects(projects);
    })
    .catch(function(error) {
        console.error('projects.json을 불러오지 못했습니다:', error);
    });


function renderProjects(projects) {
    const list = document.querySelector('#project-list');
    list.innerHTML = '';

    projects.forEach(function(project) {
        const li = document.createElement('li');
        if (project.featured) {
            li.classList.add('featured');
        }


        li.innerHTML = `
            <a href="project.html?id=${project.id}">
                <img src="${project.thumbnail}" alt="${project.title}">
                <div class="card-overlay">
                    <h3>${project.title}</h3>
                </div>
            </a>
        `;

        list.appendChild(li);
    });
}

const navbar = document.querySelector('#navbar');
const topBtn = document.querySelector('.back-to-top-btn');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        topBtn.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        topBtn.classList.remove('visible');
    }
});


const cursor = document.querySelector('.custom-cursor');

window.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.body.addEventListener('mouseenter', function(e) {
    if (e.target.closest && e.target.closest('#projects li')) {
        cursor.style.transform = 'translate(-50%, -50%) scale(3)';
        cursor.style.backgroundColor = 'rgba(0, 123, 255, 0.2)';
    }
}, true);

document.body.addEventListener('mouseleave', function(e) {
    if (e.target.closest && e.target.closest('#projects li')) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = '#00d9ff';
    }
}, true);