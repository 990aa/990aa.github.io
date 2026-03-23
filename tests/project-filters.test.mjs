import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';

const root = process.cwd();
const htmlPath = path.join(root, 'index.html');
const scriptPath = path.join(root, 'script.js');

const htmlRaw = fs.readFileSync(htmlPath, 'utf8');
const scriptRaw = fs.readFileSync(scriptPath, 'utf8');

const sanitizedHtml = htmlRaw
    .replace(/<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>/g, '')
    .replace(/<script>\s*tailwind\.config[\s\S]*?<\/script>/g, '')
    .replace(/<script src="script\.js" defer><\/script>/g, '');

const dom = new JSDOM(sanitizedHtml, {
    url: 'http://localhost/',
    runScripts: 'dangerously',
    resources: 'usable'
});

const { window } = dom;
const { document } = window;

const injected = document.createElement('script');
injected.textContent = scriptRaw;
document.body.appendChild(injected);

const categoryButtons = Array.from(document.querySelectorAll('.project-category-btn'));
const allCards = Array.from(document.querySelectorAll('#projects .project-card'));

assert.equal(categoryButtons.length, 5, 'Expected 5 project category buttons');
assert.ok(allCards.length >= 11, 'Expected project cards to be present');

function visibleTitles() {
    return allCards
        .filter((card) => !card.classList.contains('is-hidden'))
        .map((card) => card.querySelector('.project-title-group h3')?.textContent?.trim() ?? '');
}

function clickCategory(label) {
    const button = categoryButtons.find((b) => b.textContent?.trim() === label);
    assert.ok(button, `Missing category button: ${label}`);
    button.click();
}

function activeCategoryLabel() {
    const active = categoryButtons.find((b) => b.classList.contains('active'));
    return active?.textContent?.trim() ?? '';
}

const expectedBest = [
    'Kivixa Productivity Workspace',
    'Unsupervised Cipher Cracking',
    'Hospital Operations System',
    'Phantom Local AI Overlay Assistant',
    'NovelCrafter: Fine-Tuned Literary LLM'
];

assert.equal(activeCategoryLabel(), 'Best Projects', 'Best Projects should be active by default');
assert.deepEqual(visibleTitles(), expectedBest, 'Best Projects list does not match expected projects');

clickCategory('AI & LLM Systems');
const aiTitles = visibleTitles();
assert.ok(aiTitles.includes('Kivixa Productivity Workspace'), 'Kivixa should appear in AI & LLM Systems');
assert.ok(aiTitles.includes('Phantom Local AI Overlay Assistant'), 'Phantom should appear in AI & LLM Systems');
assert.ok(aiTitles.includes('NovelCrafter: Fine-Tuned Literary LLM'), 'NovelCrafter should appear in AI & LLM Systems');

clickCategory('Machine Learning & Computer Vision');
const mlTitles = visibleTitles();
assert.ok(mlTitles.includes('Signature Verification System with Explainable AI'), 'Signature Verification should appear in ML/CV');
assert.ok(mlTitles.includes('Real-Time Hand Gesture Recognition System'), 'Hand Gesture should appear in ML/CV');
assert.ok(mlTitles.includes('Hybrid Image Classification: SVM with Deep Feature Extraction'), 'Hybrid Image Classification should appear in ML/CV');

clickCategory('Full-Stack Platforms');
const fullStackTitles = visibleTitles();
assert.ok(fullStackTitles.includes('Hospital Operations System'), 'Hospital Operations should appear in Full-Stack');
assert.ok(fullStackTitles.includes('Vehicle Parking Management System'), 'Vehicle Parking should appear in Full-Stack');

clickCategory('Data Science & Analytics');
const dataTitles = visibleTitles();
assert.ok(dataTitles.includes('Unsupervised Cipher Cracking'), 'Unsupervised Cipher Cracking should appear in Data Science');
assert.ok(dataTitles.includes('Interactive Customer Segmentation & Analytics Engine'), 'Customer Segmentation should appear in Data Science');

clickCategory('Best Projects');
const bestVisibleCards = allCards.filter((card) => !card.classList.contains('is-hidden'));
const firstHeader = bestVisibleCards[0].querySelector('.project-header');
const secondHeader = bestVisibleCards[1].querySelector('.project-header');

assert.ok(firstHeader && secondHeader, 'Need at least two visible cards for accordion test');
firstHeader.click();
assert.ok(bestVisibleCards[0].classList.contains('active'), 'First card should open on click');

secondHeader.click();
assert.ok(!bestVisibleCards[0].classList.contains('active'), 'First card should close when second opens');
assert.ok(bestVisibleCards[1].classList.contains('active'), 'Second card should open on click');

const sidebarLinks = Array.from(document.querySelectorAll('.sidebar-nav a'));
assert.ok(sidebarLinks.some((a) => a.getAttribute('href') === '#projects'), 'Projects sidebar link missing');
assert.ok(sidebarLinks.some((a) => a.getAttribute('href') === '#research'), 'Research sidebar link missing');

console.log('All project category and accordion tests passed.');
