// Animaciones avanzadas con GSAP para el portafolio profesional
// Basado en las tendencias modernas de diseño web 2024

// Función principal para inicializar todas las animaciones GSAP
function initGSAPAnimations() {
    // Verificar si GSAP está cargado
    if (typeof gsap === 'undefined') {
        // Cargar GSAP desde CDN
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.onload = function() {
            // Cargar plugins adicionales de GSAP
            const scrollTriggerScript = document.createElement('script');
            scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
            scrollTriggerScript.onload = setupAnimations;
            document.head.appendChild(scrollTriggerScript);
        };
        document.head.appendChild(script);
    } else {
        // GSAP ya está cargado
        setupAnimations();
    }
}

// Configurar todas las animaciones
function setupAnimations() {
    // Registrar el plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animación de entrada para el header
    animateHeader();
    
    // Animaciones para secciones al hacer scroll
    animateSections();
    
    // Animaciones para elementos de navegación
    animateNavigation();
    
    // Animaciones para proyectos
    animateProjects();
    
    // Animaciones para habilidades
    animateSkills();
    
    // Animaciones para el formulario de contacto
    animateContactForm();
    
    // Animaciones para elementos interactivos
    setupInteractiveAnimations();
}

// Animación de entrada para el header
function animateHeader() {
    const headerElements = document.querySelectorAll('#inicio h1, #inicio h2, #inicio p, #inicio .profile-photo');
    
    gsap.fromTo(headerElements, 
        { y: 50, opacity: 0 },
        { 
            y: 0, 
            opacity: 1, 
            stagger: 0.2, 
            duration: 1.2, 
            ease: "power3.out",
            clearProps: "all"
        }
    );
}

// Animaciones para secciones al hacer scroll
function animateSections() {
    // Seleccionar todas las secciones excepto la primera
    const sections = document.querySelectorAll('section:not(#inicio)');
    
    sections.forEach(section => {
        // Animar el título de la sección
        const sectionTitle = section.querySelector('h2');
        if (sectionTitle) {
            gsap.fromTo(sectionTitle,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        }
        
        // Animar el contenido de la sección
        const sectionContent = section.querySelectorAll('p, .skill-item, .project-item, .contact-form, .social-links a');
        if (sectionContent.length > 0) {
            gsap.fromTo(sectionContent,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                        toggleActions: "play none none none"
                    }
                }
            );
        }
    });
}

// Animaciones para elementos de navegación
function animateNavigation() {
    const navItems = document.querySelectorAll('nav a');
    
    gsap.fromTo(navItems,
        { y: -20, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.5
        }
    );
    
    // Efecto hover mejorado para elementos de navegación
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                scale: 1.1,
                color: '#64ffda',
                duration: 0.3,
                ease: "power1.out"
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                scale: 1,
                color: '',
                duration: 0.3,
                ease: "power1.in"
            });
        });
    });
}

// Animaciones para proyectos
function animateProjects() {
    const projectItems = document.querySelectorAll('.project-item');
    
    // Configurar animación al hacer hover en proyectos
    projectItems.forEach(item => {
        const projectImage = item.querySelector('img');
        const projectInfo = item.querySelector('.project-info');
        
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                y: -10,
                boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                duration: 0.3,
                ease: "power2.out"
            });
            
            if (projectImage) {
                gsap.to(projectImage, {
                    scale: 1.05,
                    duration: 0.5,
                    ease: "power1.out"
                });
            }
            
            if (projectInfo) {
                gsap.to(projectInfo, {
                    y: -5,
                    opacity: 1,
                    duration: 0.3,
                    ease: "power1.out"
                });
            }
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                y: 0,
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                duration: 0.3,
                ease: "power2.in"
            });
            
            if (projectImage) {
                gsap.to(projectImage, {
                    scale: 1,
                    duration: 0.5,
                    ease: "power1.in"
                });
            }
            
            if (projectInfo) {
                gsap.to(projectInfo, {
                    y: 0,
                    opacity: 0.9,
                    duration: 0.3,
                    ease: "power1.in"
                });
            }
        });
    });
}

// Animaciones para habilidades
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Animar las barras de progreso de habilidades
    skillItems.forEach(item => {
        const skillBar = item.querySelector('.skill-bar-fill');
        if (skillBar) {
            const skillLevel = skillBar.getAttribute('data-level') || '80';
            
            gsap.fromTo(skillBar,
                { width: '0%' },
                {
                    width: `${skillLevel}%`,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        }
    });
    
    // Efecto hover para habilidades
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                backgroundColor: 'rgba(100, 255, 218, 0.1)',
                scale: 1.02,
                duration: 0.3,
                ease: "power1.out"
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                backgroundColor: 'transparent',
                scale: 1,
                duration: 0.3,
                ease: "power1.in"
            });
        });
    });
}

// Animaciones para el formulario de contacto
function animateContactForm() {
    const formElements = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form button');
    
    // Animar elementos del formulario al entrar en viewport
    gsap.fromTo(formElements,
        { y: 20, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.contact-form',
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );
    
    // Efecto de focus para campos del formulario
    formElements.forEach(element => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.addEventListener('focus', () => {
                gsap.to(element, {
                    boxShadow: "0 0 0 2px rgba(100, 255, 218, 0.5)",
                    duration: 0.3,
                    ease: "power1.out"
                });
            });
            
            element.addEventListener('blur', () => {
                gsap.to(element, {
                    boxShadow: "none",
                    duration: 0.3,
                    ease: "power1.in"
                });
            });
        }
    });
    
    // Animación para el botón de envío
    const submitButton = document.querySelector('.contact-form button[type="submit"]');
    if (submitButton) {
        submitButton.addEventListener('mouseenter', () => {
            gsap.to(submitButton, {
                backgroundColor: '#64ffda',
                color: '#112240',
                scale: 1.05,
                duration: 0.3,
                ease: "power1.out"
            });
        });
        
        submitButton.addEventListener('mouseleave', () => {
            gsap.to(submitButton, {
                backgroundColor: 'transparent',
                color: '#64ffda',
                scale: 1,
                duration: 0.3,
                ease: "power1.in"
            });
        });
    }
}

// Configurar animaciones interactivas adicionales
function setupInteractiveAnimations() {
    // Animación para el scroll hacia abajo en la sección de inicio
    const scrollDownIcon = document.querySelector('.scroll-down-icon');
    if (scrollDownIcon) {
        gsap.to(scrollDownIcon, {
            y: 10,
            repeat: -1,
            yoyo: true,
            duration: 1,
            ease: "power1.inOut"
        });
    }
    
    // Animación para los enlaces sociales
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                y: -5,
                scale: 1.2,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        });
    });
    
    // Efecto de texto de máquina de escribir para el subtítulo
    const subtitle = document.querySelector('#inicio h2');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        
        const tl = gsap.timeline({delay: 1});
        
        tl.to(subtitle, {duration: 0.1, opacity: 1});
        
        for (let i = 0; i < text.length; i++) {
            tl.to(subtitle, {
                duration: 0.05,
                text: text.substring(0, i + 1),
                ease: "none"
            });
        }
    }
}

// Exportar función de inicialización
window.initGSAPAnimations = initGSAPAnimations;