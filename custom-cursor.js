// Cursor personalizado moderno para el portafolio profesional
// Basado en las tendencias modernas de diseño web 2024

// Función principal para inicializar el cursor personalizado
function initCustomCursor() {
    // Crear elementos del cursor personalizado
    const cursorOuter = document.createElement('div');
    cursorOuter.className = 'cursor-outer';
    document.body.appendChild(cursorOuter);
    
    const cursorInner = document.createElement('div');
    cursorInner.className = 'cursor-inner';
    document.body.appendChild(cursorInner);
    
    // Añadir estilos CSS para el cursor personalizado
    const cursorStyles = document.createElement('style');
    cursorStyles.textContent = `
        body {
            cursor: none;
        }
        
        a, button, input, textarea, .project-card, .social-link, .skill-item, .submit-btn {
            cursor: none;
        }
        
        .cursor-outer {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(0, 119, 181, 0.5);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            transition: width 0.2s ease-out, height 0.2s ease-out, border-color 0.2s ease-out;
            z-index: 9999;
            mix-blend-mode: difference;
        }
        
        .cursor-inner {
            position: fixed;
            width: 8px;
            height: 8px;
            background-color: #0077b5;
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            transition: width 0.1s ease-out, height 0.1s ease-out, background-color 0.1s ease-out;
            z-index: 9999;
        }
        
        .cursor-hover {
            width: 60px;
            height: 60px;
            border-color: rgba(0, 168, 232, 0.5);
            background-color: rgba(0, 119, 181, 0.1);
        }
        
        .cursor-inner-hover {
            width: 12px;
            height: 12px;
            background-color: #00a8e8;
        }
        
        .cursor-click {
            transform: translate(-50%, -50%) scale(0.8);
        }
        
        /* Ocultar cursor en dispositivos táctiles */
        @media (hover: none) and (pointer: coarse) {
            .cursor-outer, .cursor-inner {
                display: none;
            }
            
            body, a, button, input, textarea, .project-card, .social-link, .skill-item, .submit-btn {
                cursor: auto;
            }
        }
    `;
    document.head.appendChild(cursorStyles);
    
    // Variables para el seguimiento del cursor
    let mouseX = 0;
    let mouseY = 0;
    let outerX = 0;
    let outerY = 0;
    let innerX = 0;
    let innerY = 0;
    
    // Elementos interactivos que activarán el efecto hover
    const interactiveElements = 'a, button, input, textarea, .project-card, .social-link, .skill-item, .submit-btn';
    
    // Función para actualizar la posición del cursor
    function updateCursorPosition() {
        // Calcular la posición del cursor exterior con efecto de suavizado
        outerX += (mouseX - outerX) * 0.1;
        outerY += (mouseY - outerY) * 0.1;
        cursorOuter.style.left = `${outerX}px`;
        cursorOuter.style.top = `${outerY}px`;
        
        // Calcular la posición del cursor interior con efecto de suavizado más rápido
        innerX += (mouseX - innerX) * 0.2;
        innerY += (mouseY - innerY) * 0.2;
        cursorInner.style.left = `${innerX}px`;
        cursorInner.style.top = `${innerY}px`;
        
        // Continuar la animación
        requestAnimationFrame(updateCursorPosition);
    }
    
    // Iniciar la animación
    updateCursorPosition();
    
    // Evento para seguir el cursor
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Eventos para elementos interactivos
    document.querySelectorAll(interactiveElements).forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorOuter.classList.add('cursor-hover');
            cursorInner.classList.add('cursor-inner-hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursorOuter.classList.remove('cursor-hover');
            cursorInner.classList.remove('cursor-inner-hover');
        });
    });
    
    // Evento para el clic
    document.addEventListener('mousedown', function() {
        cursorOuter.classList.add('cursor-click');
        cursorInner.classList.add('cursor-click');
    });
    
    document.addEventListener('mouseup', function() {
        cursorOuter.classList.remove('cursor-click');
        cursorInner.classList.remove('cursor-click');
    });
    
    // Evento para cuando el cursor sale de la ventana
    document.addEventListener('mouseleave', function() {
        cursorOuter.style.opacity = '0';
        cursorInner.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', function() {
        cursorOuter.style.opacity = '1';
        cursorInner.style.opacity = '1';
    });
    
    // Detectar si es un dispositivo táctil
    function isTouchDevice() {
        return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
    }
    
    // Desactivar el cursor personalizado en dispositivos táctiles
    if (isTouchDevice()) {
        cursorOuter.style.display = 'none';
        cursorInner.style.display = 'none';
        document.body.style.cursor = 'auto';
        
        document.querySelectorAll(interactiveElements).forEach(element => {
            element.style.cursor = 'pointer';
        });
    }
}

// Exportar función de inicialización
window.initCustomCursor = initCustomCursor;