// Preloader moderno para el portafolio profesional
// Basado en las tendencias modernas de diseño web 2024

// Función principal para inicializar el preloader
function initPreloader() {
    // Crear elementos del preloader
    const preloaderContainer = document.createElement('div');
    preloaderContainer.className = 'preloader';
    document.body.prepend(preloaderContainer);
    
    // Crear el contenido del preloader
    preloaderContainer.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">
                <span>IMV</span>
            </div>
            <div class="preloader-progress-container">
                <div class="preloader-progress-bar"></div>
            </div>
            <div class="preloader-text">Cargando experiencia interactiva...</div>
        </div>
    `;
    
    // Añadir estilos CSS para el preloader
    const preloaderStyles = document.createElement('style');
    preloaderStyles.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #112240, #0a192f);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.8s ease, visibility 0.8s ease;
        }
        
        .preloader-content {
            text-align: center;
            max-width: 80%;
        }
        
        .preloader-logo {
            margin-bottom: 2rem;
            position: relative;
            display: inline-block;
        }
        
        .preloader-logo span {
            font-size: 3rem;
            font-weight: 700;
            color: #64ffda;
            letter-spacing: 2px;
            position: relative;
            display: inline-block;
            animation: pulse-glow 2s infinite alternate;
        }
        
        .preloader-logo::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #64ffda, transparent);
            animation: line-animation 2s infinite;
        }
        
        .preloader-progress-container {
            width: 300px;
            height: 4px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            margin: 0 auto 1.5rem auto;
            overflow: hidden;
        }
        
        .preloader-progress-bar {
            height: 100%;
            width: 0%;
            background-color: #64ffda;
            border-radius: 4px;
            transition: width 0.5s ease;
        }
        
        .preloader-text {
            color: rgba(255, 255, 255, 0.7);
            font-size: 1rem;
            letter-spacing: 1px;
            animation: fade-in-out 2s infinite alternate;
        }
        
        @keyframes pulse-glow {
            0% { text-shadow: 0 0 5px rgba(100, 255, 218, 0.5); }
            100% { text-shadow: 0 0 20px rgba(100, 255, 218, 0.8), 0 0 30px rgba(100, 255, 218, 0.6); }
        }
        
        @keyframes line-animation {
            0% { transform: scaleX(0.1); opacity: 0.2; }
            50% { transform: scaleX(1); opacity: 1; }
            100% { transform: scaleX(0.1); opacity: 0.2; }
        }
        
        @keyframes fade-in-out {
            0% { opacity: 0.5; }
            100% { opacity: 1; }
        }
        
        body.loaded .preloader {
            opacity: 0;
            visibility: hidden;
        }
    `;
    document.head.appendChild(preloaderStyles);
    
    // Elementos del preloader
    const progressBar = document.querySelector('.preloader-progress-bar');
    
    // Simular progreso de carga
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${progress}%`;
        
        if (progress === 100) {
            clearInterval(progressInterval);
            
            // Pequeña pausa antes de ocultar el preloader
            setTimeout(() => {
                document.body.classList.add('loaded');
                
                // Eliminar el preloader del DOM después de la transición
                setTimeout(() => {
                    preloaderContainer.remove();
                }, 800);
            }, 500);
        }
    }, 200);
    
    // Asegurarse de que el preloader se oculte incluso si la carga es muy rápida
    window.addEventListener('load', () => {
        progress = 100;
        progressBar.style.width = '100%';
        
        clearInterval(progressInterval);
        
        setTimeout(() => {
            document.body.classList.add('loaded');
            
            setTimeout(() => {
                preloaderContainer.remove();
            }, 800);
        }, 500);
    });
}

// Exportar función de inicialización
window.initPreloader = initPreloader;