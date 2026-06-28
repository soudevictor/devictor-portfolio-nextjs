// ============================================================
// DEVICTOR — JavaScript v2.0
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    // ── Elementos ────────────────────────────────────────────
    const body         = document.body;
    const header       = document.getElementById("header");
    const headerLogo   = document.getElementById("header-logo");
    const themeToggle  = document.getElementById("theme-toggle");
    const hamburger    = document.getElementById("hamburger");
    const mobileMenu   = document.getElementById("mobile-menu");
    const mobileClose  = document.getElementById("mobile-close");
    const mobileOverlay= document.getElementById("mobile-overlay");
    const navLinks     = document.querySelectorAll("[data-nav]");
    const mobileLinks  = document.querySelectorAll("[data-mobile-nav]");
    const sections     = document.querySelectorAll("main > section");
    const modal        = document.getElementById("thank-you-modal");
    const modalClose   = document.getElementById("modal-close");
    const form         = document.getElementById("contact-form");

    // ── Tema ─────────────────────────────────────────────────
    function applyTheme(isLight) {
        body.classList.toggle("page--light-theme", isLight);
        updateThemeIcon(isLight);
    }

    function updateThemeIcon(isLight) {
        const sunIcon  = themeToggle.querySelector(".fa-sun");
        const moonIcon = themeToggle.querySelector(".fa-moon");

        if (isLight) {
            sunIcon.style.display  = "inline-block";
            moonIcon.style.display = "none";
            if (headerLogo) headerLogo.src = "./assets/images/logos/Devictor_LogoPreta.png";
        } else {
            sunIcon.style.display  = "none";
            moonIcon.style.display = "inline-block";
            if (headerLogo) headerLogo.src = "./assets/images/logos/Devictor_LogoBranca.png";
        }
    }

    themeToggle?.addEventListener("click", () => {
        const isLight = !body.classList.contains("page--light-theme");
        applyTheme(isLight);
        localStorage.setItem("theme", isLight ? "light" : "dark");
    });

    // Restaurar tema salvo
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") applyTheme(true);

    // ── Header Shrink no Scroll ───────────────────────────────
    const SCROLL_THRESHOLD = 60;

    function handleHeaderScroll() {
        if (window.scrollY > SCROLL_THRESHOLD) {
            header?.classList.add("header--scrolled");
        } else {
            header?.classList.remove("header--scrolled");
        }
    }

    window.addEventListener("scroll", handleHeaderScroll, { passive: true });
    handleHeaderScroll(); // executar no load

    // ── Active Nav Link (Intersection Observer) ───────────────
    const observerOptions = {
        root: null,
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            setActiveLink(id);
        });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));

    function setActiveLink(id) {
        navLinks.forEach((link) => {
            const href = link.getAttribute("href").replace("#", "");
            link.classList.toggle("is-active", href === id);
        });
        mobileLinks.forEach((link) => {
            const href = link.getAttribute("href").replace("#", "");
            link.classList.toggle("is-active", href === id);
        });
    }

    // ── Mobile Menu ───────────────────────────────────────────
    function openMobileMenu() {
        mobileMenu?.classList.add("is-open");
        mobileOverlay?.classList.add("is-open");
        hamburger?.setAttribute("aria-expanded", "true");
        body.style.overflow = "hidden";
    }

    function closeMobileMenu() {
        mobileMenu?.classList.remove("is-open");
        mobileOverlay?.classList.remove("is-open");
        hamburger?.setAttribute("aria-expanded", "false");
        body.style.overflow = "";
    }

    hamburger?.addEventListener("click", openMobileMenu);
    mobileClose?.addEventListener("click", closeMobileMenu);
    mobileOverlay?.addEventListener("click", closeMobileMenu);

    mobileLinks.forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });

    // Fechar com ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMobileMenu();
    });

    // ── Typed.js — Efeito de Digitação ────────────────────────
    if (typeof Typed !== "undefined") {
        new Typed("#typing-text", {
            strings: [
                "Desenvolvedor Front-end",
                "Entusiasta de React.js",
                "Amante de TypeScript",
                "Criador de Interfaces",
            ],
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 1800,
            loop: true,
            smartBackspace: true,
        });
    }

    // ── Animações GSAP ────────────────────────────────────────
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        // Hero — entrada escalonada
        gsap.fromTo(
            ".hero__badge",
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.2 }
        );
        gsap.fromTo(
            ".hero__title",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.4 }
        );
        gsap.fromTo(
            ".hero__subtitle",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.6 }
        );
        gsap.fromTo(
            ".hero__typing",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.75 }
        );
        gsap.fromTo(
            ".hero__cta-group",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.9 }
        );
        gsap.fromTo(
            ".hero__scroll-indicator",
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: "power2.out", delay: 1.4 }
        );

        // Scroll animations — seções
        gsap.utils.toArray(".project-card").forEach((card, i) => {
            gsap.fromTo(
                card,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );
        });

        gsap.utils.toArray(".skill-category").forEach((card, i) => {
            gsap.fromTo(
                card,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    delay: i * 0.08,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 88%",
                        toggleActions: "play none none none",
                    },
                }
            );
        });

        gsap.fromTo(
            ".about__image-container",
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".about__content",
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            }
        );

        gsap.fromTo(
            ".about__text",
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 0.9,
                ease: "power3.out",
                delay: 0.15,
                scrollTrigger: {
                    trigger: ".about__content",
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            }
        );
    }

    // ── Contador Animado (Stats) ──────────────────────────────
    const counters = document.querySelectorAll("[data-count]");

    if (counters.length > 0) {
        const countObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const el     = entry.target;
                    const target = parseInt(el.getAttribute("data-count"), 10);
                    const suffix = el.getAttribute("data-suffix") || "+";
                    animateCounter(el, 0, target, 1200, suffix);
                    countObserver.unobserve(el);
                });
            },
            { threshold: 0.5 }
        );

        counters.forEach((counter) => countObserver.observe(counter));
    }

    function animateCounter(el, start, end, duration, suffix = "+") {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed  = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current  = Math.round(start + (end - start) * eased);

            el.textContent = current + suffix;

            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    // ── Modal ─────────────────────────────────────────────────
    form?.addEventListener("submit", () => {
        sessionStorage.setItem("showThankYouModal", "true");
    });

    const showModal = sessionStorage.getItem("showThankYouModal");
    if (showModal === "true" && modal) {
        modal.showModal();
        sessionStorage.removeItem("showThankYouModal");
    }

    modalClose?.addEventListener("click", () => modal?.close());

    modal?.addEventListener("click", (e) => {
        if (e.target === modal) modal.close();
    });
});
