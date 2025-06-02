// Efectos de scroll y revelación avanzados para el portafolio profesional
// Basado en las tendencias modernas de diseño web 2024

// Función principal para inicializar los efectos de scroll
function initScrollRevealEffects() {
    // Verificar si GSAP está cargado
    if (typeof gsap === 'undefined') {
        console.warn('GSAP no está cargado. Los efectos de scroll avanzados requieren GSAP.');
        return;
    }
    
    // Verificar si ScrollTrigger está cargado
    if (typeof ScrollTrigger === 'undefined') {
        // Intentar cargar ScrollTrigger
        const scrollTriggerScript = document.createElement('script');
        scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
        scrollTriggerScript.onload = setupScrollEffects;
        document.head.appendChild(scrollTriggerScript);
    } else {
        setupScrollEffects();
    }
}

// Configurar efectos de scroll
function setupScrollEffects() {
    // Registrar el plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Crear efecto de scroll suave para toda la página
    setupSmoothScroll();
    
    // Configurar animaciones de revelación para secciones
    setupSectionReveal();
    
    // Configurar animaciones para elementos específicos
    setupElementAnimations();
    
    // Configurar efecto de parallax avanzado
    setupParallaxEffect();
    
    // Configurar indicador de progreso de scroll
    setupScrollProgress();
}

// Configurar scroll suave para toda la página
function setupSmoothScroll() {
    // Crear contenedor para el scroll suave
    const smoothWrapper = document.createElement('div');
    smoothWrapper.className = 'smooth-scroll-wrapper';
    
    // Mover todo el contenido del body al wrapper
    const bodyChildren = Array.from(document.body.children);
    bodyChildren.forEach(child => {
        // No mover los scripts ni el preloader
        if (child.tagName !== 'SCRIPT' && !child.classList.contains('preloader')) {
            smoothWrapper.appendChild(child);
        }
    });
    
    // Añadir el wrapper al body
    document.body.appendChild(smoothWrapper);
    
    // Añadir estilos para el scroll suave
    const smoothScrollStyles = document.createElement('style');
    smoothScrollStyles.textContent = `
        body {
            overflow: hidden;
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }
        
        .smooth-scroll-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            overflow: visible;
            will-change: transform;
        }
        
        .scroll-progress-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background-color: rgba(0, 0, 0, 0.1);
            z-index: 1000;
        }
        
        .scroll-progress-bar {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #0077b5, #64ffda);
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(smoothScrollStyles);
    
    // Variables para el scroll suave
    let currentY = 0;
    let targetY = 0;
    const ease = 0.1; // Factor de suavizado (0.1 = 10% de la distancia por frame)
    
    // Función para actualizar el scroll suave
    function updateSmoothScroll() {
        // Calcular la nueva posición con efecto de suavizado
        currentY += (targetY - currentY) * ease;
        
        // Aplicar la transformación
        gsap.set('.smooth-scroll-wrapper', { y: -currentY });
        
        // Continuar la animación
        requestAnimationFrame(updateSmoothScroll);
    }
    
    // Iniciar la animación
    updateSmoothScroll();
    
    // Actualizar la altura del wrapper cuando cambia el contenido
    function updateHeight() {
        document.body.style.height = `${smoothWrapper.scrollHeight}px`;
    }
    
    // Actualizar la altura inicialmente y cuando cambia el tamaño de la ventana
    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    // Evento para actualizar la posición objetivo al hacer scroll
    window.addEventListener('scroll', function() {
        targetY = window.scrollY;
    });
    
    // Crear indicador de progreso de scroll
    const progressContainer = document.createElement('div');
    progressContainer.className = 'scroll-progress-container';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    
    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);
    
    // Actualizar la barra de progreso al hacer scroll
    window.addEventListener('scroll', function() {
        const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
    });
}

// Configurar animaciones de revelación para secciones
function setupSectionReveal() {
    // Seleccionar todas las secciones
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        // Crear timeline para cada sección
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Animar el título de la sección
        const sectionTitle = section.querySelector('h2');
        if (sectionTitle) {
            tl.fromTo(sectionTitle, 
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                0
            );
        }
        
        // Animar el contenido de la sección
        const sectionContent = section.querySelectorAll('p, .skill-item, .project-item, .education-item, .experience-item, .language-item, .contact-form, .social-links a');
        if (sectionContent.length > 0) {
            tl.fromTo(sectionContent,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out' },
                0.2
            );
        }
    });
}

// Configurar animaciones para elementos específicos
function setupElementAnimations() {
    // Animar la foto de perfil con efecto de rotación 3D
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        gsap.to(profilePhoto, {
            rotationY: 360,
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: profilePhoto,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    }
    
    // Animar las barras de habilidades
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        const width = bar.style.width || bar.getAttribute('data-level') || '0%';
        
        gsap.fromTo(bar,
            { width: '0%' },
            {
                width: width,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: bar,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Animar los enlaces sociales
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach((link, index) => {
        gsap.fromTo(link,
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                delay: index * 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: link.parentElement,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Animar el formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const formElements = contactForm.querySelectorAll('input, textarea, button');
        
        gsap.fromTo(formElements,
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: contactForm,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
}

// Configurar efecto de parallax avanzado
function setupParallaxEffect() {
    // Seleccionar elementos para aplicar parallax
    const parallaxElements = document.querySelectorAll('.profile-photo, .about-image img, .project-image img');
    
    parallaxElements.forEach(element => {
        // Crear efecto de parallax al hacer scroll
        gsap.to(element, {
            y: '20%',
            ease: 'none',
            scrollTrigger: {
                trigger: element.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
    
    // Efecto de parallax para el fondo
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        // Crear un fondo de parallax para cada sección
        const parallaxBg = document.createElement('div');
        parallaxBg.className = 'parallax-bg';
        section.prepend(parallaxBg);
        
        // Añadir estilos para el fondo de parallax
        gsap.set(parallaxBg, {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.03,
            backgroundImage: 'radial-gradient(circle at 50% 50%, #0077b5 0%, transparent 70%)',
            backgroundSize: '100% 100%',
            zIndex: -1
        });
        
        // Animar el fondo con efecto de parallax
        gsap.to(parallaxBg, {
            backgroundSize: '200% 200%',
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
}

// Configurar indicador de progreso de scroll
function setupScrollProgress() {
    // Ya implementado en setupSmoothScroll()
}

// Exportar función de inicialización
window.initScrollRevealEffects = initScrollRevealEffects;