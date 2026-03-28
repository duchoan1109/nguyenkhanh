// Performance optimization: Remove preload class after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('preload');

    // MỚI THÊM: KIỂM TRA NẾU VỪA TỪ TRANG banhkem.html QUAY LẠI
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('step') === 'wishes') {
        // BỎ QUA HÌNH 1 (birthdayScreen) VÀ QUA GIAI ĐOẠN TIẾP THEO LUÔN
        window.location.href = 'chucmung.html'; 
    }
});

// Optimized particle system
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.maxParticles = 50;
        this.isActive = true;
    }

    createSparkle() {
        if (!this.isActive || this.particles.length >= this.maxParticles) return;
        
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.width = sparkle.style.height = (Math.random() * 4 + 2) + 'px';
        sparkle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(sparkle);
        
        this.particles.push(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
                this.particles = this.particles.filter(p => p !== sparkle);
            }
        }, 5000);
    }

    createFlower() {
        if (!this.isActive || this.particles.length >= this.maxParticles) return;
        
        const flower = document.createElement('div');
        flower.className = 'flower';
        const fList = (typeof flowers !== 'undefined') ? flowers : ['🌸', '🌺', '💖'];
        flower.innerHTML = fList[Math.floor(Math.random() * fList.length)];
        flower.style.left = Math.random() * 100 + '%';
        flower.style.animationDuration = (Math.random() * 4 + 3) + 's';
        flower.style.fontSize = (Math.random() * 15 + 20) + 'px';
        flower.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(flower);
        
        this.particles.push(flower);
        
        setTimeout(() => {
            if (flower.parentNode) {
                flower.remove();
                this.particles = this.particles.filter(p => p !== flower);
            }
        }, 7000);
    }

    pause() {
        this.isActive = false;
        this.particles.forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });
    }

    resume() {
        this.isActive = true;
        this.particles.forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
    }
}

// Initialize particle system
const particleSystem = new ParticleSystem();
const sparkleInterval = setInterval(() => particleSystem.createSparkle(), 500);
const flowerInterval = setInterval(() => particleSystem.createFlower(), 800);

// Calculator functionality
const display = document.getElementById('display');
const calculatorScreen = document.getElementById('calculatorScreen');

function appendToDisplay(value) {
    if (display.value.length < 8) {
        display.value += value;
        createKeyEffect(value);
    }
}

function clearDisplay() {
    display.value = '';
    createKeyEffect();
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
    createKeyEffect();
}

function createKeyEffect(val) {
    const btns = document.querySelectorAll('.btn-number');
    btns.forEach(btn => {
        if (btn.textContent.trim() === val) {
            btn.style.animation = 'keyEffect 0.3s ease';
            setTimeout(() => {
                btn.style.animation = '';
            }, 300);
        }
    });
}

// HÀM KIỂM TRA MẬT KHẨU: CHUYỂN THẲNG QUA BÁNH KEM
function checkPassword() {
    // Thay '00000000' bằng ngày sinh bạn muốn (vd: '15032008')
    if (display.value === '29032008') { 
        window.location.href = 'banhkem.html';
    } else {
        display.style.animation = 'shake 0.6s ease-in-out';
        display.style.borderColor = '#ff4444';
        
        setTimeout(() => {
            alert('🌸 Mật khẩu không đúng! Hãy thử lại nhé! 🌸');
            clearDisplay();
            display.style.animation = '';
            display.style.borderColor = '';
        }, 600);
    }
}

// Chuyển sang giai đoạn tiếp theo (chucmung.html)
function showLetter() {
    const wishesPage = document.getElementById('wishesPage');
    if(wishesPage) {
        wishesPage.style.transition = 'opacity 0.8s ease';
        wishesPage.style.opacity = '0';
    }
    
    setTimeout(() => {
        window.location.href = 'chucmung.html';
    }, 800);
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    if (calculatorScreen && calculatorScreen.style.display === 'none') return;

    const key = event.key;
    if (key >= '0' && key <= '9') {
        event.preventDefault(); 
        appendToDisplay(key);
    } else if (key === 'Enter') {
        event.preventDefault();
        checkPassword();
    } else if (key === 'Escape') {
        event.preventDefault();
        clearDisplay();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});

// Particle optimization on tab change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        particleSystem.pause();
    } else {
        particleSystem.resume();
    }
});

// Hiệu ứng bóng bóng bay
function createBubble() {
    const bubbles = document.getElementById('bubbles');
    if (!bubbles) return;
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = Math.random() * 40 + 30;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = Math.random() * 100 + 'vw';
    bubble.style.animationDuration = (6 + Math.random() * 4) + 's';
    bubbles.appendChild(bubble);
    setTimeout(() => { bubble.remove(); }, 9000);
}
setInterval(createBubble, 700);

// Hiệu ứng trái tim nhỏ bay
function createBgHeart() {
    const bgHearts = document.getElementById('bgHearts');
    if (!bgHearts) return;
    const heart = document.createElement('div');
    heart.className = 'bg-heart';
    const heartTypes = ['💖', '💗', '💞'];
    heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    const size = Math.random() * 18 + 22;
    heart.style.fontSize = size + 'px';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (5 + Math.random() * 4) + 's';
    bgHearts.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 9000);
}
setInterval(createBgHeart, 1200);

// Auto focus display
if(display) display.focus();
