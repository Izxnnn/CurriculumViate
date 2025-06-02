// Archivo para crear un fondo interactivo para la web del CV
// Utiliza particles.js para crear un efecto de partículas en el fondo

// Función para inicializar el fondo interactivo
function initInteractiveBackground() {
    // Crear el contenedor para el fondo interactivo
    const backgroundContainer = document.createElement('div');
    backgroundContainer.id = 'particles-js';
    backgroundContainer.style.position = 'fixed';
    backgroundContainer.style.top = '0';
    backgroundContainer.style.left = '0';
    backgroundContainer.style.width = '100%';
    backgroundContainer.style.height = '100%';
    backgroundContainer.style.zIndex = '-1';
    backgroundContainer.style.pointerEvents = 'none';
    document.body.prepend(backgroundContainer);

    // Cargar particles.js si no está ya cargado
    if (typeof particlesJS === 'undefined') {
        loadParticlesJS();
    } else {
        configureParticles();
    }

    // Añadir estilos CSS para el fondo
    addBackgroundStyles();
}

// Función para cargar particles.js desde CDN
function loadParticlesJS() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.onload = configureParticles;
    document.head.appendChild(script);
}

// Función para configurar las partículas
function configureParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#0077b5'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#0077b5',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

// Función para añadir estilos CSS para el fondo
function addBackgroundStyles() {
    // Crear elemento de estilo
    const style = document.createElement('style');
    style.textContent = `
        body {
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        }
        
        #particles-js {
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        }
        
        /* Añadir efecto de desenfoque a las secciones para mejorar la legibilidad */
        .section {
            backdrop-filter: blur(5px);
            background-color: rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        /* Efecto de cristal para las tarjetas */
        .experience-item, .education-item, .skill-category, .language-item {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
        }
    `;
    document.head.appendChild(style);
}

// Función para crear un efecto de ondas en el fondo
function createWaveEffect() {
    const waveContainer = document.createElement('div');
    waveContainer.className = 'wave-container';
    waveContainer.style.position = 'fixed';
    waveContainer.style.bottom = '0';
    waveContainer.style.left = '0';
    waveContainer.style.width = '100%';
    waveContainer.style.height = '200px';
    waveContainer.style.zIndex = '-2';
    waveContainer.style.pointerEvents = 'none';
    document.body.appendChild(waveContainer);

    // Crear 3 ondas con diferentes velocidades y opacidades
    for (let i = 1; i <= 3; i++) {
        const wave = document.createElement('div');
        wave.className = `wave wave-${i}`;
        waveContainer.appendChild(wave);
    }

    // Añadir estilos para las ondas
    const waveStyles = document.createElement('style');
    waveStyles.textContent = `
        .wave-container {
            overflow: hidden;
        }
        
        .wave {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 200%;
            height: 100%;
            background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg"><path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="%230077b5"/></svg>');
            background-size: 1200px 100%;
            animation: wave-animation 25s linear infinite;
            transform: translateX(0);
        }
        
        .wave-2 {
            animation-duration: 15s;
            opacity: 0.5;
            animation-delay: -5s;
        }
        
        .wave-3 {
            animation-duration: 20s;
            opacity: 0.2;
            animation-delay: -2s;
        }
        
        @keyframes wave-animation {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
    `;
    document.head.appendChild(waveStyles);
}

// Función para añadir efectos de luz
function addLightEffects() {
    // Crear elementos de luz
    for (let i = 1; i <= 5; i++) {
        const light = document.createElement('div');
        light.className = 'light-effect';
        light.style.position = 'fixed';
        light.style.borderRadius = '50%';
        light.style.filter = 'blur(80px)';
        light.style.zIndex = '-3';
        light.style.pointerEvents = 'none';
        
        // Posición y tamaño aleatorios
        const size = Math.random() * 300 + 100;
        light.style.width = `${size}px`;
        light.style.height = `${size}px`;
        light.style.top = `${Math.random() * 100}%`;
        light.style.left = `${Math.random() * 100}%`;
        
        // Color aleatorio entre azul y celeste
        const hue = Math.random() * 30 + 200; // Entre 200 y 230 (azules)
        light.style.backgroundColor = `hsla(${hue}, 80%, 60%, 0.15)`;
        
        // Animación
        light.style.animation = `float ${Math.random() * 10 + 20}s ease-in-out infinite`;
        
        document.body.appendChild(light);
    }
}

// Inicializar todos los efectos de fondo
function initAllBackgroundEffects() {
    initInteractiveBackground();
    createWaveEffect();
    addLightEffects();
}

// Exportar función de inicialización
window.initInteractiveBackground = initAllBackgroundEffects;