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
