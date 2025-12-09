const serviciosData = [
    {
        titulo: "Mantenimiento de Hardware",
        descripcion: "Limpieza interna profunda, cambio de pasta térmica, lubricación de ventiladores y diagnóstico de componentes electrónicos para asegurar la vida útil de tu equipo.",
        precio: "Desde $25.00",
        imagen: "images/servicios1.jpg",
        icono: '<i class="fas fa-desktop"></i>'
    },
    {
        titulo: "Instalación de Redes",
        descripcion: "Diseño de cableado estructurado (Cat6/Cat6A), configuración de routers, access points y seguridad perimetral para una conexión estable en tu oficina.",
        precio: "Cotización",
        imagen: "images/servicios2.jpg",
        icono: '<i class="fas fa-network-wired"></i>'
    },
    {
        titulo: "Desarrollo Web",
        descripcion: "Diseño de páginas web corporativas, landing pages efectivas y sistemas de gestión a medida para optimizar tus procesos de negocio.",
        precio: "Cotización",
        imagen: "images/servicios3.jpg",
        icono: '<i class="fas fa-code"></i>'
    },
    {
        titulo: "Recuperación de Datos",
        descripcion: "Servicio de laboratorio avanzado para recuperar información crítica de discos duros dañados, memorias USB o tras ataques de virus.",
        precio: "Desde $40.00",
        imagen: "images/servicios4.jpg", 
        icono: '<i class="fas fa-hdd"></i>'
    },
    {
        titulo: "Licenciamiento de Software",
        descripcion: "Venta e instalación garantizada de licencias originales de Microsoft Windows, Office, Antivirus y programas de diseño profesional.",
        precio: "Consultar",
        imagen: "images/servicios5.jpg",
        icono: '<i class="fas fa-key"></i>'
    },
    {
        titulo: "Soporte Remoto",
        descripcion: "Asistencia técnica inmediata vía internet para resolver problemas de configuración, correo y software al instante sin esperas.",
        precio: "$15.00 / hora",
        imagen: "images/servicios6.jpg",
        icono: '<i class="fas fa-headset"></i>'
    }
];

const galeriaData = [
    { img: "images/galeria1.jpg", titulo: "Reparación Laptop" },
    { img: "images/galeria2.jpg", titulo: "Mantenimiento Servidores" },
    { img: "images/galeria3.jpg", titulo: "Instalación Oficina" },
    { img: "images/galeria4.jpg", titulo: "Limpieza de Componentes" },
    { img: "images/galeria5.jpg", titulo: "Cableado Estructurado" },
    { img: "images/galeria6.jpg", titulo: "Setup Tecnológico" }
];

// --- INICIALIZACIÓN CUANDO CARGA LA PÁGINA ---
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. RENDERIZADO DE SERVICIOS ---
    // Verificamos si existe el contenedor 'servicios-container' antes de intentar llenarlo
    const containerServicios = document.getElementById('servicios-container');
    
    if (containerServicios) {
        // Recorremos el array de datos y creamos el HTML para cada servicio
        serviciosData.forEach(servicio => {
            const card = document.createElement('article');
            card.classList.add('service-card-large');
            
            
            const fallbackImage = "https://placehold.co/600x400?text=Servicio";

            card.innerHTML = `
                <div class="card-img">
                    <img src="${servicio.imagen}" alt="${servicio.titulo}" onerror="this.src='${fallbackImage}'">
                </div>
                <div class="card-content">
                    <div class="icon-box">${servicio.icono}</div>
                    <h3>${servicio.titulo}</h3>
                    <p>${servicio.descripcion}</p>
                    <span class="price-badge">${servicio.precio}</span>
                    <button class="btn-sm">Más Info</button>
                </div>
            `;
            containerServicios.appendChild(card);
        });
    }
    
    const containerGaleria = document.getElementById('galeria-container');
    
    if (containerGaleria) {
        galeriaData.forEach(item => {
            const figure = document.createElement('figure');
            figure.classList.add('gallery-item');
            
            const fallbackImage = "https://placehold.co/600x400?text=Foto+Galeria";

            figure.innerHTML = `
                <img src="${item.img}" alt="${item.titulo}" onerror="this.src='${fallbackImage}'">
                <figcaption class="gallery-overlay">
                    <p>${item.titulo}</p>
                </figcaption>
            `;
            containerGaleria.appendChild(figure);
        });
    }

    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        const icon = themeBtn.querySelector('i');
        if(icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun'); // Cambia
        }
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        let theme = 'light';
        const icon = themeBtn.querySelector('i');
        
        if (body.classList.contains('dark-mode')) {
            theme = 'dark';
            if(icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        } else {
            if(icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
        // Guardamos la preferencia del usuario
        localStorage.setItem('theme', theme);
    });

    // --- 4. MENÚ MÓVIL ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Cambiar icono
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- 5. VALIDACIÓN DE FORMULARIO ---
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que se envíe el formulario real
            
            // Variables de control
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const mensaje = document.getElementById('mensaje');
            let isValid = true;

            // Funciones auxiliares para mostrar/ocultar errores
            const mostrarError = (input, msg) => {
                const group = input.parentElement;
                const small = group.querySelector('small');
                small.textContent = msg;
                small.style.display = 'block';
                input.style.borderColor = '#ef4444'; // Rojo
                isValid = false;
            };

            const limpiarError = (input) => {
                const group = input.parentElement;
                const small = group.querySelector('small');
                small.style.display = 'none';
                input.style.borderColor = '#e0e0e0'; // Gris normal
            };

            // Validación Nombre
            if(nombre.value.trim().length < 3) {
                mostrarError(nombre, 'El nombre debe tener al menos 3 letras');
            } else {
                limpiarError(nombre);
            }

            // Validación Email 
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email.value.trim())) {
                mostrarError(email, 'Por favor ingresa un correo válido');
            } else {
                limpiarError(email);
            }

            // Validación Mensaje 
            if(mensaje.value.trim().length < 10) {
                mostrarError(mensaje, 'El mensaje es muy corto, cuéntanos más.');
            } else {
                limpiarError(mensaje);
            }

            // Si cumple
            if(isValid) {
                alert('¡Gracias! Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto pronto.');
                form.reset(); // Limpia el formulario
            }
        });
    }
});