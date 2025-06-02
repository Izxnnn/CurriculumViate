// Efectos 3D con Three.js para el portafolio profesional
// Basado en las tendencias modernas de diseño web 2024

// Variables globales
let scene, camera, renderer;
let cube, controls;
let container;

// Inicializar la escena 3D
function init3DScene() {
    // Crear contenedor para la escena 3D
    container = document.createElement('div');
    container.id = 'scene-container';
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100vh';
    container.style.zIndex = '-1';
    container.style.overflow = 'hidden';
    container.style.pointerEvents = 'none';
    document.body.prepend(container);

    // Crear escena
    scene = new THREE.Scene();
    
    // Configurar cámara
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;
    
    // Configurar renderizador
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Fondo transparente
    container.appendChild(renderer.domElement);
    
    // Añadir luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Crear geometría 3D decorativa
    createDecorative3DElements();
    
    // Manejar redimensionamiento de ventana
    window.addEventListener('resize', onWindowResize);
    
    // Iniciar animación
    animate();
}

// Crear elementos 3D decorativos
function createDecorative3DElements() {
    // Crear grupo de esferas flotantes
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);
    
    // Crear varias esferas con diferentes tamaños y posiciones
    const sphereGeometry = new THREE.SphereGeometry(0.2, 24, 24);
    
    // Crear material con efecto de vidrio (glassmorphism)
    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x88ccff,
        metalness: 0.1,
        roughness: 0.2,
        transmission: 0.9, // Transparencia
        thickness: 0.5,    // Grosor del vidrio
        envMapIntensity: 1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });
    
    // Crear material alternativo para algunas esferas
    const altMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffaa88,
        metalness: 0.1,
        roughness: 0.2,
        transmission: 0.9,
        thickness: 0.5,
        envMapIntensity: 1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });
    
    // Crear 15 esferas con posiciones aleatorias
    for (let i = 0; i < 15; i++) {
        const material = Math.random() > 0.5 ? glassMaterial : altMaterial;
        const sphere = new THREE.Mesh(sphereGeometry, material);
        
        // Posición aleatoria
        sphere.position.x = (Math.random() - 0.5) * 10;
        sphere.position.y = (Math.random() - 0.5) * 10;
        sphere.position.z = (Math.random() - 0.5) * 5 - 2; // Mantener detrás para no interferir
        
        // Tamaño aleatorio
        const scale = Math.random() * 0.8 + 0.2;
        sphere.scale.set(scale, scale, scale);
        
        // Añadir a la escena
        sphereGroup.add(sphere);
        
        // Guardar velocidad de animación para cada esfera
        sphere.userData.speedX = (Math.random() - 0.5) * 0.01;
        sphere.userData.speedY = (Math.random() - 0.5) * 0.01;
        sphere.userData.speedRotation = (Math.random() - 0.5) * 0.01;
    }
}

// Manejar redimensionamiento de ventana
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animar la escena
function animate() {
    requestAnimationFrame(animate);
    
    // Animar cada esfera
    scene.traverse(function(object) {
        if (object instanceof THREE.Mesh && object.geometry instanceof THREE.SphereGeometry) {
            // Mover la esfera
            object.position.x += object.userData.speedX;
            object.position.y += object.userData.speedY;
            
            // Rotar la esfera
            object.rotation.x += object.userData.speedRotation;
            object.rotation.y += object.userData.speedRotation;
            
            // Invertir dirección si llega a los límites
            if (Math.abs(object.position.x) > 5) {
                object.userData.speedX *= -1;
            }
            if (Math.abs(object.position.y) > 5) {
                object.userData.speedY *= -1;
            }
        }
    });
    
    // Efecto de parallax con el movimiento del ratón
    if (mouseX !== undefined && mouseY !== undefined) {
        scene.rotation.y = (mouseX - window.innerWidth / 2) * 0.0001;
        scene.rotation.x = (mouseY - window.innerHeight / 2) * 0.0001;
    }
    
    renderer.render(scene, camera);
}

// Seguimiento de la posición del ratón para efecto parallax
let mouseX, mouseY;
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// Inicializar cuando se cargue el script de Three.js
function initThreeEffects() {
    // Verificar si Three.js está cargado
    if (typeof THREE === 'undefined') {
        // Cargar Three.js desde CDN
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = init3DScene;
        document.head.appendChild(script);
    } else {
        // Three.js ya está cargado
        init3DScene();
    }
}

// Exportar función de inicialización
window.initThreeEffects = initThreeEffects;