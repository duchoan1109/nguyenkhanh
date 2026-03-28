// 1. CHẶN HIỂN THỊ MÁY TÍNH NẾU ĐẾN TỪ TRANG BÁNH KEM
const urlParams = new URLSearchParams(window.location.search);
const tuBanhKemVe = document.referrer.includes('banhkem.html') || urlParams.get('step') === 'wishes';

if (tuBanhKemVe) {
    // Nếu vừa ở trang bánh kem về, ép trình duyệt sang trang chucmung.html ngay
    window.location.replace('chucmung.html'); 
}

// 2. HỆ THỐNG HẠT VÀ HIỆU ỨNG (Giữ nguyên của bạn)
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
        setTimeout(() => { if (sparkle.parentNode) sparkle.remove(); }, 5000);
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
        setTimeout(() => { if (flower.parentNode) flower.remove(); }, 7000);
    }
}
const particleSystem = new ParticleSystem();
setInterval(() => particleSystem.createSparkle(), 500);
setInterval(() => particleSystem.createFlower(), 800);

// 3. MÁY TÍNH NHẬP MÃ
const display = document.getElementById('display');

function appendToDisplay(value) {
    if (display && display.value.length < 8) {
        display.value += value;
    }
}

function clearDisplay() {
    if (display) display.value = '';
}

function deleteLast() {
    if (display) display.value = display.value.slice(0, -1);
}

// KIỂM TRA MẬT KHẨU
function checkPassword() {
    if (display.value === '29032008') { 
        window.location.href = 'banhkem.html';
    } else {
        display.style.animation = 'shake 0.6s ease-in-out';
        display.style.borderColor = '#ff4444';
        setTimeout(() => {
            alert('🌸 Mật khẩu không đúng! 🌸');
            clearDisplay();
            display.style.animation = '';
            display.style.borderColor = '';
        }, 600);
    }
}

// KHỞI TẠO
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('preload');
    if(display) display.focus();
});

// Hỗ trợ bàn phím
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendToDisplay(e.key);
    if (e.key === 'Enter') checkPassword();
});
