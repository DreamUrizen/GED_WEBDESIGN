
const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');

if (!projectId) {
    window.location.href = 'index.html';
}

fetch('data/projects.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(projects) {
        const project = projects.find(function(p) {
            return p.id === projectId;
        });

        if (!project) {
            window.location.href = 'index.html';
            return;
        }

        renderDetail(project);
    })
    .catch(function(error) {
        console.error('projects.json을 불러오지 못했습니다:', error);
    });

function renderDetail(project) {
    document.title = project.title + ' — LI YANGFAN';

    document.querySelector('#detail-title').textContent = project.title;
    document.querySelector('#detail-role').textContent = project.role;
    document.querySelector('#detail-description').textContent = project.description;

    const imagesEl = document.querySelector('#detail-images');
    if (project.detailImages) {
        project.detailImages.forEach(function(src) {
            const img = document.createElement('img');
            img.src = src;
            img.alt = project.title + ' 상세 이미지';
            img.className = 'detail-img';
            imagesEl.appendChild(img);
        });
    }
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