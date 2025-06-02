// Implementación avanzada de cambio de tema (modo oscuro/claro)
// Con detección automática de preferencias del sistema y transiciones suaves

// Función principal para inicializar el cambiador de tema
function initThemeSwitcher() {
    // Crear el botón de cambio de tema
    createThemeToggle();
    
    // Aplicar el tema inicial basado en preferencias del sistema o localStorage
    applyInitialTheme();
    
    // Añadir estilos para la transición suave entre temas
    addThemeTransitionStyles();
    
    // Escuchar cambios en las preferencias del sistema
    listenForSystemPreferenceChanges();
}

// Crear el botón de cambio de tema
function createThemeToggle() {
    // Crear el contenedor del botón
    const themeToggleContainer = document.createElement('div');
    themeToggleContainer.className = 'theme-toggle-container';
    
    // Crear el botón
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Cambiar tema');
    themeToggle.setAttribute('title', 'Cambiar tema');
    
    // Crear los iconos para modo claro y oscuro
    const sunIcon = document.createElement('span');
    sunIcon.className = 'theme-icon sun-icon';
    sunIcon.innerHTML = '<i class="fas fa-sun"></i>';
    
    const moonIcon = document.createElement('span');
    moonIcon.className = 'theme-icon moon-icon';
    moonIcon.innerHTML = '<i class="fas fa-moon"></i>';
    
    // Añadir los iconos al botón
    themeToggle.appendChild(sunIcon);
    themeToggle.appendChild(moonIcon);
    
    // Añadir el botón al contenedor
    themeToggleContainer.appendChild(themeToggle);
    
    // Añadir el contenedor al documento
    document.body.appendChild(themeToggleContainer);
    
    // Añadir estilos para el botón
    const themeToggleStyles = document.createElement('style');
    themeToggleStyles.textContent = `
        .theme-toggle-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        .theme-toggle {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .theme-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
        
        .theme-toggle:active {
            transform: scale(0.95);
        }
        
        .theme-icon {
            position: absolute;
            font-size: 24px;
            transition: all 0.3s ease;
        }
        
        .sun-icon {
            opacity: 0;
            transform: translateY(20px) rotate(90deg);
        }
        
        .moon-icon {
            opacity: 1;
            transform: translateY(0) rotate(0);
        }
        
        [data-theme="dark"] .sun-icon {
            opacity: 1;
            transform: translateY(0) rotate(0);
        }
        
        [data-theme="dark"] .moon-icon {
            opacity: 0;
            transform: translateY(-20px) rotate(-90deg);
        }
        
        [data-theme="dark"] .theme-toggle {
            background: rgba(30, 30, 30, 0.6);
        }
        
        @media print {
            .theme-toggle-container {
                display: none;
            }
        }
    `;
    document.head.appendChild(themeToggleStyles);
    
    // Añadir evento de clic al botón
    themeToggle.addEventListener('click', toggleTheme);
}

// Aplicar el tema inicial
function applyInitialTheme() {
    // Comprobar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // Aplicar el tema guardado
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        // Comprobar preferencias del sistema
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = prefersDarkMode ? 'dark' : 'light';
        
        // Aplicar el tema basado en preferencias del sistema
        document.documentElement.setAttribute('data-theme', theme);
        
        // Guardar el tema en localStorage
        localStorage.setItem('theme', theme);
    }
}

// Añadir estilos para la transición suave entre temas
function addThemeTransitionStyles() {
    const themeTransitionStyles = document.createElement('style');
    themeTransitionStyles.textContent = `
        html {
            transition: color 0.5s ease, background-color 0.5s ease;
        }
        
        * {
            transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        
        /* Estilos para el tema claro (por defecto) */
        :root {
            --bg-color: #f8f9fa;
            --text-color: #333;
            --primary-color: #0077b5;
            --secondary-color: #64ffda;
            --accent-color: #ff6b6b;
            --card-bg: #ffffff;
            --card-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            --nav-bg: rgba(255, 255, 255, 0.8);
            --border-color: #e0e0e0;
            --input-bg: #ffffff;
            --input-border: #ced4da;
            --skill-bar-bg: #e9ecef;
            --particle-color: rgba(0, 119, 181, 0.1);
        }
        
        /* Estilos para el tema oscuro */
        [data-theme="dark"] {
            --bg-color: #121212;
            --text-color: #e0e0e0;
            --primary-color: #64ffda;
            --secondary-color: #0077b5;
            --accent-color: #ff6b6b;
            --card-bg: #1e1e1e;
            --card-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            --nav-bg: rgba(30, 30, 30, 0.8);
            --border-color: #333;
            --input-bg: #2a2a2a;
            --input-border: #444;
            --skill-bar-bg: #333;
            --particle-color: rgba(100, 255, 218, 0.1);
        }
        
        /* Aplicar variables CSS a los elementos */
        body {
            background-color: var(--bg-color);
            color: var(--text-color);
        }
        
        a {
            color: var(--primary-color);
        }
        
        .nav-link {
            color: var(--text-color);
        }
        
        .nav-link.active, .nav-link:hover {
            color: var(--primary-color);
        }
        
        nav {
            background-color: var(--nav-bg);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--border-color);
        }
        
        .section {
            border-bottom: 1px solid var(--border-color);
        }
        
        .skill-level {
            background-color: var(--primary-color);
        }
        
        .skill-bar {
            background-color: var(--skill-bar-bg);
        }
        
        .project-item, .education-item, .experience-item, .language-item {
            background-color: var(--card-bg);
            box-shadow: var(--card-shadow);
            border: 1px solid var(--border-color);
        }
        
        input, textarea {
            background-color: var(--input-bg);
            border: 1px solid var(--input-border);
            color: var(--text-color);
        }
        
        button {
            background-color: var(--primary-color);
            color: var(--bg-color);
        }
        
        .float-particle {
            background-color: var(--particle-color);
        }
    `;
    document.head.appendChild(themeTransitionStyles);
}

// Cambiar entre temas
function toggleTheme() {
    // Obtener el tema actual
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    
    // Cambiar al tema opuesto
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Aplicar el nuevo tema
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Guardar el tema en localStorage
    localStorage.setItem('theme', newTheme);
    
    // Animar el cambio de tema si GSAP está disponible
    if (typeof gsap !== 'undefined') {
        // Animar el botón
        gsap.to('.theme-toggle', {
            rotate: 360,
            duration: 0.5,
            ease: 'power2.out'
        });
        
        // Animar el fondo
        gsap.fromTo('body', 
            { backgroundColor: currentTheme === 'light' ? '#f8f9fa' : '#121212' },
            { 
                backgroundColor: newTheme === 'light' ? '#f8f9fa' : '#121212',
                duration: 0.5,
                ease: 'power2.inOut'
            }
        );
    }
}

// Escuchar cambios en las preferencias del sistema
function listenForSystemPreferenceChanges() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Añadir listener para cambios en las preferencias del sistema
    darkModeMediaQuery.addEventListener('change', (e) => {
        // Solo cambiar el tema si no hay un tema guardado en localStorage
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
        }
    });
}

// Exportar función de inicialización
window.initThemeSwitcher = initThemeSwitcher;