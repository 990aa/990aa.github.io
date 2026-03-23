function toggleProject(header) {
    const card = header.closest('.project-card');
    if (!card) {
        return;
    }

    const isActive = card.classList.contains('active');
    document.querySelectorAll('.project-card.active').forEach((c) => c.classList.remove('active'));

    if (!isActive) {
        card.classList.add('active');
    }
}

function setProjectCategory(category) {
    projectCategoryButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.projectCategory === category);
    });

    projectCards.forEach((card) => {
        const categories = (card.dataset.categories ?? '').split(/\s+/).filter(Boolean);
        const visible = categories.includes(category);

        card.classList.toggle('is-hidden', !visible);
        if (!visible) {
            card.classList.remove('active');
        }
    });
}

function toggleResearch(header) {
    const card = header.closest('.research-card');
    if (!card) {
        return;
    }

    const isActive = card.classList.contains('active');
    document.querySelectorAll('.research-card.active').forEach((c) => c.classList.remove('active'));

    if (!isActive) {
        card.classList.add('active');
    }
}

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const projectCards = document.querySelectorAll('#projects .project-card');
const projectCategoryButtons = document.querySelectorAll('.project-category-btn');

function onScroll() {
    let current = '';

    sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;
        if (top <= 120) {
            current = section.getAttribute('id') ?? '';
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

projectCategoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const category = button.dataset.projectCategory;
        if (category) {
            setProjectCategory(category);
        }
    });
});

setProjectCategory('best-projects');

const hamburger = document.getElementById('hamburgerBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');

function openSidebar() {
    if (!sidebar || !overlay) {
        return;
    }

    sidebar.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    if (!sidebar || !overlay) {
        return;
    }

    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

if (hamburger) {
    hamburger.addEventListener('click', openSidebar);
}

if (overlay) {
    overlay.addEventListener('click', closeSidebar);
}

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 860) {
            closeSidebar();
        }
    });
});

window.toggleProject = toggleProject;
window.toggleResearch = toggleResearch;
