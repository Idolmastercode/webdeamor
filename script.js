// Prevenir menú contextual de navegadores (clic derecho o mantener presionado en móvil)
document.addEventListener('contextmenu', event => event.preventDefault());

let confettiInterval; // Variable para controlar el confeti

const razones = [
    "Que ya eres mayor de edad, aunque siempre serás mi menorsita 🦄",
    "Que me quieres y dependes de mí pq si no te hablo lloras 🦄",
    "Que eres fresita pinky pero también una loba feroz 🦄",
    "Cuando jugamos roblox y abres el corazón conmigo 🦄",
    "Tus tiktoks y stickers raros pero que me hacen reír 🦄",
    "Que eres bien enojona pero también la más dulce 🦄",
    "Que eres pequeñita y tierna 🦄",
    "Tus ojitos hermosos 🦄",
    "Tus cachetitos bonitos 🦄",
    "Tu cabello todo perfecto 🦄",
    "Que llevamos tanto tiempo juntos...",
    "Que al menos cada día me mandas un tiktok...",
    "Que sigues conmigo a pesar de lo dificil que es...",
    "Esas veces que jugabamos hasta la madrugada...",
    "Esos audios, fotos y videos lindos que me mandas a veces...",
    "Que aunque me haces llorar también me haces sonreír...",
    "Que no te rindes a pesar de lo difícil que es...",
    "Que simplemente eres tú, eres perfecta para mí y te quiero con todo mi corazón."
];

const coloresPastel = ['#ffe5ec', '#e0fbfc', '#e5e5ea', '#fcf6bd', '#d9f2b4', '#ffdac1'];

let currentCard = 0;
let isFlipped = false;

const startBtn = document.getElementById('startBtn');
const bgMusic = document.getElementById('bgMusic');
const giftBox = document.getElementById('gift-box');
const nextToCardsBtn = document.getElementById('nextToCardsBtn');

const card3D = document.querySelector('.card-3d');
const cardBack = document.getElementById('cardBack');
const cardNumberEl = document.getElementById('cardNumber');
const cardTextEl = document.getElementById('cardText');

const introScene = document.getElementById('scene-intro');
const giftScene = document.getElementById('scene-gift');
const cardsScene = document.getElementById('scene-cards');
const outroScene = document.getElementById('scene-outro');

startBtn.addEventListener('click', () => {
    bgMusic.play();
    switchScene(introScene, giftScene);
});

// Animación Pop al abrir el regalo
giftBox.addEventListener('click', () => {
    giftBox.classList.add('pop-out'); // Desata la explosión visual

    setTimeout(() => {
        document.getElementById('gift-container').classList.add('hidden');
        
        const photoContainer = document.getElementById('photo-container');
        const bdayText = document.getElementById('bday-text');
        const photo = document.getElementById('girl-photo');
        const hat = document.getElementById('party-hat');

        photoContainer.classList.remove('hidden');
        bdayText.classList.remove('hidden');
        nextToCardsBtn.classList.remove('hidden');

        setTimeout(() => {
            photo.classList.add('circle');
            hat.classList.add('drop');
            throwConfetti();
            startContinuousConfetti(); // Inicia confeti infinito
        }, 50);
    }, 300); // Esperamos a que acabe el "Pop!"
});

nextToCardsBtn.addEventListener('click', () => {
    switchScene(giftScene, cardsScene);
    iniciarReboteDVD(); 
    cardNumberEl.textContent = `Razón 1 / 18`;
    cardTextEl.textContent = razones[0];
});

card3D.addEventListener('click', () => {
    if (!isFlipped) {
        card3D.classList.add('is-flipped');
        isFlipped = true;
    } else {
        currentCard++;
        
        if (currentCard < razones.length) {
            card3D.classList.remove('is-flipped');
            isFlipped = false;
            
            let randomColor = coloresPastel[Math.floor(Math.random() * coloresPastel.length)];
            cardBack.style.backgroundColor = randomColor;

            setTimeout(() => {
                cardNumberEl.textContent = `Razón ${currentCard + 1} / 18`;
                cardTextEl.textContent = razones[currentCard];
            }, 300); 
            
        } else {
            // --- AQUÍ ESTÁ LA MAGIA DEL FINAL QUE FALTABA ---
            
            // 1. Apagamos el generador de confeti y borramos el que esté cayendo
            clearInterval(confettiInterval);
            document.querySelectorAll('.particle').forEach(p => p.remove());

            // 2. Ocultamos los animales
            document.getElementById('bouncing-sheep').style.display = 'none';
            document.getElementById('bouncing-unicorn').style.display = 'none';

            // 3. Activamos la capa negra suavemente
            document.getElementById('fade-to-black').classList.add('active');

            // 4. Bajamos la música
            fadeAudioOut();

            // 5. Mostramos el mensaje final
            switchScene(cardsScene, outroScene);
        }
    }
});

function switchScene(from, to) {
    from.classList.remove('active');
    setTimeout(() => {
        from.classList.add('hidden');
        to.classList.remove('hidden');
        void to.offsetWidth; 
        to.classList.add('active');
    }, 1000); 
}

function throwConfetti() {
    const colors = ['#ff4b72', '#ffdde1', '#fff', '#ffd700', '#ff8c00'];
    const emojis = ['🎈', '✨', '🎉'];
    
    for (let i = 0; i < 70; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');
        
        if(Math.random() > 0.5) {
            particle.style.width = Math.random() * 10 + 5 + 'px';
            particle.style.height = Math.random() * 20 + 10 + 'px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        } else {
            particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.fontSize = Math.random() * 20 + 10 + 'px';
        }

        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = Math.random() * 3 + 2 + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        document.body.appendChild(particle);
        setTimeout(() => { particle.remove(); }, 5000);
    }
}

function iniciarReboteDVD() {
    const animales = [
        { el: document.getElementById('bouncing-sheep'), x: 50, y: 50, dx: 3, dy: 2.5 },
        { el: document.getElementById('bouncing-unicorn'), x: 200, y: 150, dx: -2, dy: 3.5 }
    ];

    function animar() {
        animales.forEach(anim => {
            // Si el elemento está oculto, no calculamos físicas para ahorrar recursos
            if (anim.el.style.display === 'none') return; 

            const rect = anim.el.getBoundingClientRect();
            
            if (anim.x + rect.width >= window.innerWidth || anim.x <= 0) {
                anim.dx *= -1; 
            }
            if (anim.y + rect.height >= window.innerHeight || anim.y <= 0) {
                anim.dy *= -1; 
            }

            anim.x += anim.dx;
            anim.y += anim.dy;
            
            anim.el.style.transform = `translate(${anim.x}px, ${anim.y}px)`;
        });
        
        requestAnimationFrame(animar);
    }
    
    animar();
}

// Generador de Confeti Continuo
function startContinuousConfetti() {
    const colors = ['#ff4b72', '#ffdde1', '#fff', '#ffd700', '#ff8c00'];
    const emojis = ['🎈', '✨', '🎉'];
    
    confettiInterval = setInterval(() => {
        let particle = document.createElement('div');
        particle.classList.add('particle');
        
        if(Math.random() > 0.5) {
            particle.style.width = Math.random() * 10 + 5 + 'px';
            particle.style.height = Math.random() * 20 + 10 + 'px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        } else {
            particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.fontSize = Math.random() * 20 + 10 + 'px';
        }

        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = Math.random() * 3 + 2 + 's';
        
        document.body.appendChild(particle);
        
        setTimeout(() => { particle.remove(); }, 5000);
    }, 150);
}

// Función para hacer un "Fade Out" al audio (bajar volumen suavemente)
function fadeAudioOut() {
    let vol = 1.0;
    const fadeInterval = setInterval(() => {
        if (vol > 0.15) { 
            vol -= 0.05;
            bgMusic.volume = vol.toFixed(2);
        } else {
            clearInterval(fadeInterval);
        }
    }, 200); 
}