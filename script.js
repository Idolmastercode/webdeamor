// Variables para controlar los intervalos y poder detenerlos
let rainInterval = null;
let loadingInterval = null;

// FUNCIÓN PRINCIPAL DE NAVEGACIÓN
function nextSlide(slideNumber) {
    // 1. Limpieza de la slide anterior
    stopEffects();

    // 2. Cambio visual de slide
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => slide.classList.remove('active'));
    
    const currentSlide = document.getElementById('slide' + slideNumber);
    if(currentSlide) {
        currentSlide.classList.add('active');
        
        // 3. CAMBIO DE TEMA DEL FONDO
        changeBackground(slideNumber);

        // 4. ACTIVAR MINIJUEGO DE LA SLIDE ACTUAL
        switch(slideNumber) {
            case 2:
                startRain();
                break;
            case 3:
                startChat();
                break;
            case 5:
                startLoading();
                break;
            case 6:
                startTypewriter("Eres la casualidad más bonita de mi vida. Gracias por existir. 💖");
                break;
        }
    }
}

// Función para cambiar el fondo (Body Class)
function changeBackground(slideNumber) {
    const body = document.body;
    body.className = ''; // Borra clases anteriores
    
    switch(slideNumber) {
        case 2: body.classList.add('theme-sky'); break;
        case 3: body.classList.add('theme-night'); break;
        case 4: body.classList.add('theme-sunset'); break;
        case 5: body.classList.add('theme-tech'); break;
        case 6: body.classList.add('theme-love'); break;
        default: break; // Slide 1 usa el default
    }
}

// Función para detener efectos al cambiar de slide
function stopEffects() {
    if(rainInterval) clearInterval(rainInterval);
    if(loadingInterval) clearInterval(loadingInterval);
    document.querySelectorAll('.falling-emoji').forEach(e => e.remove());
}

// --- MINIJUEGOS ---

// SLIDE 2: Lluvia
function startRain() {
    const emojis = ['🦄', '☁️', '✨', '🌈', '🍭'];
    rainInterval = setInterval(() => {
        const div = document.createElement('div');
        div.classList.add('falling-emoji');
        div.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        div.style.left = Math.random() * 100 + 'vw';
        div.style.animationDuration = (Math.random() * 2 + 3) + 's';
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 5000);
    }, 400);
}

// SLIDE 3: Chat
function startChat() {
    setTimeout(() => document.getElementById('msg1').classList.add('show'), 500);
    setTimeout(() => document.getElementById('msg2').classList.add('show'), 1500);
    setTimeout(() => document.getElementById('msg3').classList.add('show'), 2500);
    setTimeout(() => document.getElementById('btn-chat').style.display = 'inline-block', 3500);
}

// SLIDE 5: Barra de Carga
function startLoading() {
    let width = 0;
    const bar = document.getElementById('love-bar');
    loadingInterval = setInterval(() => {
        if(width >= 100) {
            clearInterval(loadingInterval);
            bar.innerHTML = "¡DESBORDADO! 💖";
            document.getElementById('result-text').style.opacity = 1;
            document.getElementById('btn-final').style.display = 'inline-block';
        } else {
            width++;
            bar.style.width = width + '%';
            bar.style.innerText = width + '%';
        }
    }, 40);
}

// SLIDE 6: Máquina de Escribir
function startTypewriter(text) {
    const element = document.getElementById('typewriter-text');
    element.innerHTML = "";
    let i = 0;
    function type() {
        if(i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    type();
}