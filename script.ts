function toggleProject(header: HTMLElement): void {
    const card = header.closest('.project-card') as HTMLElement | null;
    if (!card) {
        return;
    }

    const isActive = card.classList.contains('active');
    document.querySelectorAll<HTMLElement>('.project-card.active').forEach((c) => c.classList.remove('active'));

    if (!isActive) {
        card.classList.add('active');
    }
}

function toggleResearch(header: HTMLElement): void {
    const card = header.closest('.research-card') as HTMLElement | null;
    if (!card) {
        return;
    }

    const isActive = card.classList.contains('active');
    document.querySelectorAll<HTMLElement>('.research-card.active').forEach((c) => c.classList.remove('active'));

    if (!isActive) {
        card.classList.add('active');
    }
}

const sections = document.querySelectorAll<HTMLElement>('main section[id]');
const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link');

function onScroll(): void {
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

const hamburger = document.getElementById('hamburgerBtn') as HTMLButtonElement | null;
const sidebar = document.getElementById('sidebar') as HTMLElement | null;
const overlay = document.getElementById('sidebarOverlay') as HTMLElement | null;

function openSidebar(): void {
    if (!sidebar || !overlay) {
        return;
    }

    sidebar.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeSidebar(): void {
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

(window as Window & {
    toggleProject: (header: HTMLElement) => void;
    toggleResearch: (header: HTMLElement) => void;
}).toggleProject = toggleProject;

(window as Window & {
    toggleProject: (header: HTMLElement) => void;
    toggleResearch: (header: HTMLElement) => void;
}).toggleResearch = toggleResearch;

export {};
