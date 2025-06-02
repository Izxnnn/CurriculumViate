// Navegación con desplazamiento suave y efectos mejorados
document.addEventListener('DOMContentLoaded', function() {
    // Añadir referencia al archivo de animaciones CSS
    const animationStyles = document.createElement('link');
    animationStyles.rel = 'stylesheet';
    animationStyles.href = 'animations.css';
    document.head.appendChild(animationStyles);
    
    // Crear efecto de partículas flotantes en el fondo
    createBackgroundParticles();
    
    // Añadir efecto de parallax al desplazamiento
    initParallaxEffect();
    // Seleccionar todos los enlaces de navegación
    const navLinks = document.querySelectorAll('nav a');
    
    // Añadir evento de clic a cada enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener el destino del enlace (sin el #)
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Desplazamiento suave hacia la sección
            window.scrollTo({
                top: targetSection.offsetTop - 60, // Ajuste para la barra de navegación
                behavior: 'smooth'
            });
            
            // Actualizar la URL
            history.pushState(null, null, `#${targetId}`);
        });
    });
    
    // Añadir efecto de aparición a las secciones
    const sections = document.querySelectorAll('.section');
    
    // Aplicar clases para animaciones
    sections.forEach((section, index) => {
        // Verificar si la sección está visible inicialmente
        if (isElementInViewport(section)) {
            section.classList.add('visible');
            
            // Activar animaciones específicas dentro de cada sección
            activateSectionAnimations(section);
        }
    });
    
    // Función para verificar y animar todas las secciones al desplazarse
    function checkAllSections() {
        sections.forEach(section => {
            if (isElementInViewport(section) && !section.classList.contains('visible')) {
                section.classList.add('visible');
                activateSectionAnimations(section);
            }
        });
    }
    
    // Añadir evento de scroll para verificar todas las secciones
    window.addEventListener('scroll', checkAllSections);
    
    // Verificar secciones al cargar la página
    checkAllSections();
    
    // Función para resaltar la sección activa durante el desplazamiento
    function highlightActiveSection() {
        const scrollPosition = window.scrollY;
        
        // Comprobar qué sección está actualmente en la vista
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`nav a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Añadir clase activa al enlace correspondiente
                correspondingLink.classList.add('active');
                
                // Verificar si la sección ya tiene la clase visible
                if (!section.classList.contains('visible')) {
                    section.classList.add('visible');
                    activateSectionAnimations(section);
                }
            } else {
                // Eliminar clase activa de los demás enlaces
                correspondingLink.classList.remove('active');
            }
        });
    }
    
    // Llamar a la función al cargar la página y al desplazarse
    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection()
    
    // Crear un placeholder para la imagen de perfil si no está disponible
    const profileImg = document.querySelector('.profile-photo img');
    
    profileImg.addEventListener('error', function() {
        this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"%3E%3Crect fill="%23e0e0e0" width="150" height="150"/%3E%3Ctext fill="%23999" font-family="Arial" font-size="14" dy=".35em" text-anchor="middle" x="75" y="75"%3EFoto de Perfil%3C/text%3E%3C/svg%3E';
    });
    
    // Añadir efecto de animación a las barras de habilidades
    const skillBars = document.querySelectorAll('.skill-level');
    
    // Función para animar las barras de habilidades cuando son visibles
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.1; // Aumentamos el área de detección
            
            if (barPosition < screenPosition) {
                bar.style.width = bar.parentElement.getAttribute('data-level') || bar.style.width;
                bar.classList.add('animated');
            }
        });
    }
    
    // Inicialmente ocultar el ancho de las barras
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.parentElement.setAttribute('data-level', width);
        bar.style.setProperty('--skill-level', width);
        bar.style.width = '0';
    });
    
    // Añadir evento de scroll para animar las barras
    window.addEventListener('scroll', animateSkillBars);
    
    // Llamar a la función al cargar la página
    animateSkillBars();
    
    // Función para verificar si un elemento está visible en la ventana
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    }
    
    // Función para activar animaciones específicas dentro de cada sección
    function activateSectionAnimations(section) {
        // Activar animaciones de listas de habilidades
        const skillsLists = section.querySelectorAll('.skills-list');
        skillsLists.forEach(list => list.classList.add('visible'));
        
        // Activar animaciones de proyectos
        const projectsContainer = section.querySelector('.projects-container');
        if (projectsContainer) projectsContainer.classList.add('visible');
        
        // Activar animaciones de redes sociales
        const socialLinks = section.querySelector('.social-links');
        if (socialLinks) socialLinks.classList.add('visible');
        
        // Activar animaciones del formulario de contacto
        const contactForm = section.querySelector('.contact-form');
        if (contactForm) contactForm.classList.add('visible');
        
        // Activar animaciones de contacto directo
        const contactDirect = section.querySelector('.contact-direct');
        if (contactDirect) contactDirect.classList.add('visible');
    }
    
    // Función para crear partículas flotantes en el fondo (mejorada)
function createBackgroundParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'background-particles';
    document.body.prepend(particlesContainer);
    
    // Crear partículas
    for (let i = 0; i < 70; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición aleatoria
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Tamaño aleatorio
        const size = Math.random() * 12 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Opacidad aleatoria
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Color aleatorio (tonos de azul)
        const hue = 200 + Math.random() * 20; // Tonos de azul
        const saturation = 70 + Math.random() * 30;
        const lightness = 60 + Math.random() * 20;
        particle.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.3)`;
        
        // Duración de animación aleatoria (más rápida)
        particle.style.animationDuration = `${3 + Math.random() * 10}s`;
        particle.style.animationDelay = `${Math.random() * 3}s`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Añadir estilos para las partículas
    const particleStyles = document.createElement('style');
    particleStyles.textContent = `
        .background-particles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        }
        
        .particle {
            position: absolute;
            border-radius: 50%;
            animation: floatParticle 15s infinite ease-in-out;
            filter: blur(1px);
        }
        
        @keyframes floatParticle {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(15px, 15px) rotate(90deg); }
            50% { transform: translate(0, 30px) rotate(180deg); }
            75% { transform: translate(-15px, 15px) rotate(270deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
        }
    `;
    document.head.appendChild(particleStyles);
}

// La función de cursor personalizado ha sido eliminada por solicitud del usuario

// Función para inicializar el efecto parallax
function initParallaxEffect() {
    const sections = document.querySelectorAll('.section');
    const profilePhoto = document.querySelector('.profile-photo');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Efecto parallax para la foto de perfil
        if (profilePhoto) {
            profilePhoto.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
        
        // Efecto parallax para las secciones
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionMiddle = sectionTop + sectionHeight / 2;
            const distanceFromMiddle = scrollY + window.innerHeight / 2 - sectionMiddle;
            const parallaxValue = distanceFromMiddle * 0.05;
            
            // Aplicar efecto sutil de parallax
            section.style.transform = `translateY(${parallaxValue}px)`;
        });
    });
}
    
    // Llamar a la función al cargar la página
    animateSkillBars();
    
    // Funcionalidad del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Aquí normalmente enviarías los datos a un servidor
            // Por ahora, solo mostraremos un mensaje de éxito
            
            // Crear mensaje de éxito si no existe
            let successMessage = document.querySelector('.success-message');
            if (!successMessage) {
                successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                contactForm.parentNode.insertBefore(successMessage, contactForm);
            }
            
            // Mostrar mensaje de éxito
            successMessage.textContent = `¡Gracias ${name}! Tu mensaje ha sido enviado correctamente. Me pondré en contacto contigo pronto.`;
            successMessage.style.display = 'block';
            
            // Limpiar el formulario
            contactForm.reset();
            
            // Ocultar el mensaje después de 5 segundos
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        });
    }
});

// Añadir efecto de hover a los elementos de proyectos
const projectItems = document.querySelectorAll('.project-item');
projectItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.03)';
        this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    });
});

// Añadir estilos dinámicos para la navegación
const styleElement = document.createElement('style');
document.head.appendChild(styleElement);

styleElement.textContent = `
    nav a.active {
        background-color: rgba(255, 255, 255, 0.2);
        font-weight: bold;
    }
    
    .skill-level {
        transition: width 1s ease-in-out;
    }
    
    .skill-level.animated {
        transition: width 1s ease-in-out;
    }
    
    @media print {
        nav, footer {
            display: none;
        }
        
        .section {
            display: block !important;
            break-inside: avoid;
            page-break-inside: avoid;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

// Función para crear un archivo PDF del currículum (simulado)
function generatePDF() {
    alert('Esta función generaría un PDF de tu currículum. Implementa la lógica con una biblioteca como jsPDF o html2pdf.');
    // Aquí se implementaría la lógica real para generar un PDF
}

// Detectar si la página se está viendo en modo oscuro
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
}

// Escuchar cambios en el modo de color del sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});