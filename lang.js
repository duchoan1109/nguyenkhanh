// 1. KIỂM TRA CHUYỂN HƯỚNG TỨC THÌ
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('step') === 'wishes') {
    window.location.replace('banhkem.html'); 
}

// 2. HỆ THỐNG HẠT (SPARKLES & FLOWERS)
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
        flower.innerHTML = ['🌸', '🌺', '💖'][Math.floor(Math.random() * 3)];
        flower.style.left = Math.random() * 100 + '%';
        flower.style.animationDuration = (Math.random() * 4 + 3) + 's';
        flower.style.fontSize = (Math.random() * 15 + 20) + 'px';
        document.body.appendChild(flower);
        this.particles.push(flower);
        setTimeout(() => {
            if (flower.parentNode) {
                flower.remove();
                this.particles = this.particles.filter(p => p !== flower);
            }
        }, 7000);
    }
    pause() { this.isActive = false; }
    resume() { this.isActive = true; }
}
const particleSystem = new ParticleSystem();
setInterval(() => particleSystem.createSparkle(), 500);
setInterval(() => particleSystem.createFlower(), 800);

// 3. CHỨC NĂNG MÁY TÍNH (SỬA LỖI KHÔNG NHẬN DISPLAY)
function appendToDisplay(value) {
    const display = document.getElementById('display');
    if (display && display.value.length < 8) {
        display.value += value;
    }
}

function clearDisplay() {
    const display = document.getElementById('display');
    if (display) display.value = '';
}

function deleteLast() {
    const display = document.getElementById('display');
    if (display) display.value = display.value.slice(0, -1);
}

// HÀM KIỂM TRA MẬT KHẨU
function checkPassword() {
    const display = document.getElementById('display');
    if (!display) return;

    // Đã cập nhật mật khẩu theo yêu cầu của bạn
    if (display.value === '29032008') { 
        window.location.href = 'banhkem.html';
    } else {
        display.style.animation = 'shake 0.6s ease-in-out';
        display.style.borderColor = '#ff4444';
        
        setTimeout(() => {
            alert('🌸 Sai ngày sinh rồi kìa! Nhập lại đi nhé. 🌸');
            clearDisplay();
            display.style.animation = '';
            display.style.borderColor = '';
        }, 600);
    }
}

// 4. KHỞI TẠO
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('preload');
    const display = document.getElementById('display');
    if(display) display.focus();
});

// Hỗ trợ phím cứng
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendToDisplay(e.key);
    if (e.key === 'Enter') checkPassword();
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearDisplay();
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) particleSystem.pause();
    else particleSystem.resume();
});
