// 1. KIỂM TRA CHUYỂN HƯỚNG TỨC THÌ (Chạy trước khi DOM kịp hiển thị)
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('step') === 'wishes') {
    // Chuyển thẳng sang trang tiếp theo, không lưu lại lịch sử trang máy tính
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

// 3. CHỨC NĂNG MÁY TÍNH NHẬP MÃ
const display = document.getElementById('display');

function appendToDisplay(value) {
    if (display.value.length < 8) {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// HÀM KIỂM TRA MẬT KHẨU
function checkPassword() {
    // Thay '00000000' bằng ngày sinh đúng của bạn
    if (display.value === '29032008') { 
        window.location.href = 'banhkem.html';
    } else {
        // Hiệu ứng rung khi sai
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

// 4. KHỞI TẠO KHI TRANG LOAD XONG
document.addEventListener('DOMContentLoaded', () => {
    // Xóa class preload để hiện nội dung
    document.body.classList.remove('preload');
    
    // Tự động focus vào ô nhập nếu có thể
    if(display) display.focus();
});

// Hỗ trợ phím cứng (Bàn phím máy tính)
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendToDisplay(e.key);
    if (e.key === 'Enter') checkPassword();
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearDisplay();
});

// Tối ưu hiệu năng khi ẩn tab
document.addEventListener('visibilitychange', () => {
    if (document.hidden) particleSystem.pause();
    else particleSystem.resume();
});
