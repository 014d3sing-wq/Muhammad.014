// --- Three.js Background Animation ---
const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;

// Renderer setup
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create a mesmerizing 3D shape (TorusKnot)
const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 100, 16);
// Using a wireframe or basic material for a clean look
const material = new THREE.MeshBasicMaterial({ 
    color: 0x7d2ae8, // Neon purple accent
    wireframe: true,
    transparent: true,
    opacity: 0.3
});

const shape = new THREE.Mesh(geometry, material);
scene.add(shape);

// Add particles for magical effect
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 700;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    // Spread particles around
    posArray[i] = (Math.random() - 0.5) * 15;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0xffffff,
    transparent: true,
    opacity: 0.5
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Mouse interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
});

// Animation Loop
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Rotate main shape
    shape.rotation.y = elapsedTime * 0.2;
    shape.rotation.x = elapsedTime * 0.1;
    
    // Rotate shape based on mouse
    shape.rotation.x += mouseY * 0.1;
    shape.rotation.y += mouseX * 0.1;

    // Rotate particles slowly
    particlesMesh.rotation.y = -elapsedTime * 0.05;
    particlesMesh.rotation.x = -elapsedTime * 0.02;

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();

// Handle Resize
window.addEventListener('resize', () => {
    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


// --- GSAP Animations ---

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initial Load Animation
const tl = gsap.timeline();

tl.to('.subtitle', { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 })
  .to('.title', { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.6")
  .to('.profession', { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
  .to('.cta-button', { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.4")
  .to('.scroll-indicator', { opacity: 1, duration: 1 }, "-=0.2");


// Scroll Animations for Skills
gsap.utils.toArray('.skill-card').forEach((card, i) => {
    gsap.to(card, {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 70%',
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        delay: i * 0.1
    });
});

// Scroll Animations for About & Projects
gsap.from('.about-content', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 70%'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
});

gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 70%',
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: i * 0.2
    });
});

// Optional: animate 3D model color on scroll
gsap.to(material.color, {
    scrollTrigger: {
        trigger: ".skills",
        start: "top center",
        end: "bottom center",
        scrub: true
    },
    r: 0, // change to cyan/blue
    g: 0.8,
    b: 1
});

// --- Multilingual Support ---
const translations = {
    tg: {
        "logo": "AM.",
        "nav-home": "Асосӣ",
        "nav-about": "Дар бораи ман",
        "nav-skills": "Маҳоратҳо",
        "nav-projects": "Лоиҳаҳо",
        "nav-contact": "Тамос",
        "hero-subtitle": "Салом, ман",
        "hero-title": "Абдурахмонзода Мухаммад",
        "hero-profession": "Дизайнери графикӣ",
        "cta-start": "Оғози Ҳамкорӣ",
        "scroll-indicator": "Ба поён ҳаракат кунед",
        "about-title": "Дар бораи ман",
        "about-text": "Ман як тарроҳи графикии эҷодкор ҳастам, ки ба сохтани дизайнҳои муосир ва ҷолиб диққати махсус медиҳам. Ҳадафи ман табдил додани ғояҳои шумо ба асарҳои беназири визуалӣ мебошад.",
        "stat-1-num": "3+",
        "stat-1-text": "Соли таҷриба",
        "stat-2-num": "50+",
        "stat-2-text": "Лоиҳаҳои анҷомёфта",
        "stat-3-num": "20+",
        "stat-3-text": "Мизоҷони хушбахт",
        "skills-title": "Маҳоратҳои Ман",
        "skills-desc": "Абзорҳое, ки ман барои эҷоди асарҳои санъат истифода мебарам",
        "projects-title": "Лоиҳаҳои Ман",
        "projects-desc": "Намунаи корҳои беҳтарини ман",
        "proj-1-title": "Брендинг",
        "proj-1-desc": "Тарроҳии логотип ва услуби корпоративӣ",
        "proj-2-title": "Тарроҳии UI/UX",
        "proj-2-desc": "Тарроҳии интерфейс барои барномаҳои мобилӣ",
        "proj-3-title": "Графика барои SMM",
        "proj-3-desc": "Постҳо ва сторисҳои эҷодӣ барои шабакаҳои иҷтимоӣ",
        "contact-title": "Омодаед лоиҳаи наверо оғоз кунем?",
        "contact-desc": "Биёед ғояҳои шуморо ба воқеият табдил диҳем.",
        "cta-email": "Ба ман нависед",
        "footer": "© 2026 Абдурахмонзода Мухаммад. Ҳамаи ҳуқуқҳо маҳфузанд."
    },
    ru: {
        "logo": "AM.",
        "nav-home": "Главная",
        "nav-about": "Обо мне",
        "nav-skills": "Навыки",
        "nav-projects": "Проекты",
        "nav-contact": "Контакты",
        "hero-subtitle": "Привет, я",
        "hero-title": "Абдурахмонзода Мухаммад",
        "hero-profession": "Графический Дизайнер",
        "cta-start": "Начать сотрудничество",
        "scroll-indicator": "Прокрутите вниз",
        "about-title": "Обо мне",
        "about-text": "Я креативный графический дизайнер, уделяющий особое внимание созданию современных и привлекательных дизайнов. Моя цель - превратить ваши идеи в уникальные визуальные произведения.",
        "stat-1-num": "3+",
        "stat-1-text": "Года опыта",
        "stat-2-num": "50+",
        "stat-2-text": "Завершенных проектов",
        "stat-3-num": "20+",
        "stat-3-text": "Счастливых клиентов",
        "skills-title": "Мои Навыки",
        "skills-desc": "Инструменты, которые я использую для создания произведений искусства",
        "projects-title": "Мои Проекты",
        "projects-desc": "Примеры моих лучших работ",
        "proj-1-title": "Брендинг",
        "proj-1-desc": "Дизайн логотипа и фирменный стиль",
        "proj-2-title": "UI/UX Дизайн",
        "proj-2-desc": "Дизайн интерфейса для мобильных приложений",
        "proj-3-title": "Графика для SMM",
        "proj-3-desc": "Креативные посты и сторис для социальных сетей",
        "contact-title": "Готовы начать новый проект?",
        "contact-desc": "Давайте воплотим ваши идеи в реальность.",
        "cta-email": "Написать мне",
        "footer": "© 2026 Абдурахмонзода Мухаммад. Все права защищены."
    },
    en: {
        "logo": "AM.",
        "nav-home": "Home",
        "nav-about": "About Me",
        "nav-skills": "Skills",
        "nav-projects": "Projects",
        "nav-contact": "Contact",
        "hero-subtitle": "Hello, I am",
        "hero-title": "Abdurakhmonzoda Muhammad",
        "hero-profession": "Graphic Designer",
        "cta-start": "Start Collaboration",
        "scroll-indicator": "Scroll down",
        "about-title": "About Me",
        "about-text": "I am a creative graphic designer with a special focus on creating modern and engaging designs. My goal is to turn your ideas into unique visual artworks.",
        "stat-1-num": "3+",
        "stat-1-text": "Years Experience",
        "stat-2-num": "50+",
        "stat-2-text": "Completed Projects",
        "stat-3-num": "20+",
        "stat-3-text": "Happy Clients",
        "skills-title": "My Skills",
        "skills-desc": "Tools I use to create works of art",
        "projects-title": "My Projects",
        "projects-desc": "Examples of my best work",
        "proj-1-title": "Branding",
        "proj-1-desc": "Logo design and corporate identity",
        "proj-2-title": "UI/UX Design",
        "proj-2-desc": "Interface design for mobile applications",
        "proj-3-title": "Graphics for SMM",
        "proj-3-desc": "Creative posts and stories for social media",
        "contact-title": "Ready to start a new project?",
        "contact-desc": "Let's turn your ideas into reality.",
        "cta-email": "Email Me",
        "footer": "© 2026 Abdurakhmonzoda Muhammad. All rights reserved."
    }
};

const langButtons = document.querySelectorAll('.lang-btn');
const translatableElements = document.querySelectorAll('[data-i18n]');

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        langButtons.forEach(b => b.classList.remove('active'));
        // Add active class to clicked
        btn.classList.add('active');
        
        const lang = btn.getAttribute('data-lang');
        document.documentElement.lang = lang; // Update html lang attribute
        
        // Update all translatable elements
        translatableElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // simple fade effect during text change
                gsap.to(el, {
                    opacity: 0,
                    duration: 0.2,
                    onComplete: () => {
                        el.textContent = translations[lang][key];
                        gsap.to(el, {opacity: 1, duration: 0.2});
                    }
                });
            }
        });
    });
});
