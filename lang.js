// Performance optimization: Remove preload class after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('preload');

    // MỚI THÊM: KIỂM TRA NẾU VỪA TỪ TRANG banhkem.html QUAY LẠI
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('step') === 'wishes') {
        const calculatorScreen = document.getElementById('calculatorScreen');
        const birthdayScreen = document.getElementById('birthdayScreen');
        
        if (calculatorScreen) calculatorScreen.style.display = 'none';
        if (birthdayScreen) birthdayScreen.style.display = 'block';

        // Ẩn các phần thừa nếu có, hiện phần thư
        const title = document.querySelector('.birthday-title');
        if(title) title.style.display = 'none';
        
        const dSpecial = document.querySelector('.date-special');
        if(dSpecial) dSpecial.style.display = 'none';
        
        const lClosed = document.getElementById('letterClosed');
        if(lClosed) lClosed.style.display = 'flex';
        
        const lOpened = document.getElementById('letterOpened');
        if(lOpened) lOpened.style.display = 'none';
        
        const backBtn = document.querySelector('.back-btn');
        if(backBtn) backBtn.style.display = 'none';

        const wishesPage = document.getElementById('wishesPage');
        if(wishesPage) wishesPage.style.display = 'block';

        setTimeout(() => {
            if (typeof createEnhancedFireworks === 'function') createEnhancedFireworks();
            if (typeof playSuccessAnimation === 'function') playSuccessAnimation();
            if (typeof launchContinuousConfetti === 'function') launchContinuousConfetti();
        }, 500);
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
        // Đề phòng mảng flowers chưa có, dùng ký tự mặc định
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

// Optimized intervals
const sparkleInterval = setInterval(() => particleSystem.createSparkle(), 500);
const flowerInterval = setInterval(() => particleSystem.createFlower(), 800);

// Calculator functionality
const display = document.getElementById('display');
const calculatorScreen = document.getElementById('calculatorScreen');
const birthdayScreen = document.getElementById('birthdayScreen');

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

const birthdayLines = [
    "Chúc bạn có một ngày sinh nhật thật vui vẻ và ý nghĩa!",
    "Tuổi mới tràn đầy sức khỏe, hạnh phúc và thành công!",
    "Mong rằng mọi ước mơ của bạn sẽ trở thành hiện thực trong năm nay!",
    "🌸 Happy Birthday! 🌸"
];

function typeBirthdayLines(lines, element, done) {
    element.innerHTML = '';
    let idx = 0;
    function nextLine() {
        if (idx < lines.length) {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'message-text';
            element.appendChild(lineDiv);
            let i = 0;
            function typing() {
                if (i <= lines[idx].length) {
                    lineDiv.innerHTML = lines[idx].slice(0, i) + '<span style="border-right:2px solid #ff69b4"></span>';
                    i++;
                    setTimeout(typing, 40);
                } else {
                    lineDiv.innerHTML = lines[idx]; // remove cursor
                    idx++;
                    setTimeout(nextLine, 500);
                }
            }
            typing();
        } else {
            const btn = document.getElementById('openGiftBtn');
            if (btn) btn.style.display = 'inline-block';
            if (done) done();
        }
    }
    nextLine();
}

function openLetter() {
    const lClosed = document.getElementById('letterClosed');
    if (lClosed) lClosed.style.display = 'none';
    const opened = document.getElementById('letterOpened');
    if (opened) {
        opened.style.display = 'flex';
        const messageEl = opened.querySelector('.birthday-message');
        if (messageEl) typeBirthdayLines(birthdayLines, messageEl, function(){});
    }
}

// SỬA HÀM NÀY: NHẬP ĐÚNG PASS -> CHUYỂN SANG BÁNH KEM
function checkPassword() {
    if (display.value === '00000000') { // Bạn tự đổi pass ở đây nhé
        window.location.href = 'banhkem.html';
    } else {
        // Enhanced shake effect
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

document.addEventListener('DOMContentLoaded', () => {
    const card3D = document.querySelector('.card-3d');
    if (card3D) {
        card3D.addEventListener('click', function () {
            this.classList.toggle('active');
        });
        card3D.addEventListener('touchend', function (e) {
            if (e.cancelable) e.preventDefault();
            this.classList.toggle('active');
        });
    }
});

// Chuyển sang gallery trái tim thay vì bức thư
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

// Success animation
function playSuccessAnimation() {
    const cake = document.querySelector('.cake');
    if (cake) {
        cake.style.animation = 'none';
        cake.offsetHeight; // Trigger reflow
        cake.style.animation = 'cakeParty 1s ease-in-out 3';
    }
}

// Confetti function
function launchConfetti() {
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = `hsl(${Math.random()*360},90%,60%)`;
            confetti.style.animationDuration = (Math.random()*1.5+1.5) + 's';
            confetti.style.width = confetti.style.height = (Math.random()*8+6) + 'px';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 2500);
        }, i*18);
    }
}

// Enhanced keyboard support
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

// Performance optimization
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        particleSystem.pause();
        clearInterval(sparkleInterval);
        clearInterval(flowerInterval);
    } else {
        particleSystem.resume();
    }
});

const observerOptions = { threshold: 0.1, rootMargin: '50px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        } else {
            entry.target.style.animationPlayState = 'paused';
        }
    });
}, observerOptions);

setTimeout(() => {
    document.querySelectorAll('.sparkle, .flower').forEach(el => {
        observer.observe(el);
    });
}, 1000);

if(display) display.focus();

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
for (let i = 0; i < 10; i++) createBubble();

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
for (let i = 0; i < 6; i++) createBgHeart();