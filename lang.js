// 1. KIỂM TRA CHUYỂN HƯỚNG TỨC THÌ (Ưu tiên chạy trước mọi thứ)
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('step') === 'wishes') {
    // Chuyển thẳng sang trang tiếp theo (ví dụ banhkem.html hoặc chucmung.html tùy bạn muốn)
    window.location.replace('banhkem.html'); 
}

// 2. LOGIC VẼ TRÁI TIM CHI TIẾT (Khôi phục nguyên bản)
let rid = null;
const SVG_NS = "http://www.w3.org/2000/svg";
let pathlength;
let subpaths = [];

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('preload');
    
    // Khởi tạo các thông số vẽ trái tim khi DOM đã sẵn sàng
    const shape = document.getElementById("shape");
    if (shape) {
        pathlength = shape.getTotalLength();
        let d = shape.getAttribute("d");
        let n = d.match(/C/gi).length;
        let pos = 0;

        for (let i = 0; i < n; i++) {
            let newpos = d.indexOf("C", pos + 1);
            if (i > 0) {
                subpaths.push(new subPath(d.substring(0, newpos)));
            }
            pos = newpos;
        }
        subpaths.push(new subPath(d));
    }
});

class subPath {
    constructor(d) {
        this.d = d;
        this.get_PointsRy();
        this.previous = subpaths.length > 0 ? subpaths[subpaths.length - 1] : null;
        this.measurePath();
        this.get_M_Point();
        this.get_lastCubicBezier();
    }
    get_PointsRy() {
        this.pointsRy = [];
        let temp = this.d.split(/[A-Z,a-z\s,]/).filter(v => v);
        temp.map(item => { this.pointsRy.push(parseFloat(item)); });
    }
    measurePath() {
        let path = document.createElementNS(SVG_NS, "path");
        path.setAttributeNS(null, "d", this.d);
        this.pathLength = path.getTotalLength();
    }
    get_M_Point() {
        if (this.previous) {
            let p = this.previous.pointsRy;
            let l = p.length;
            this.M_point = [p[l - 2], p[l - 1]];
        } else {
            let p = this.pointsRy;
            this.M_point = [p[0], p[1]];
        }
    }
    get_lastCubicBezier() {
        let lastIndexOfC = this.d.lastIndexOf("C");
        let temp = this.d.substring(lastIndexOfC + 1).split(/[\s,]/).filter(v => v);
        let _temp = [];
        temp.map(item => { _temp.push(parseFloat(item)); });
        this.lastCubicBezier = [this.M_point];
        for (let i = 0; i < _temp.length; i += 2) {
            this.lastCubicBezier.push(_temp.slice(i, i + 2));
        }
    }
}

function get_T(t, index) {
    let lengthAtT = pathlength * t;
    if (index > 0) {
        return (lengthAtT - subpaths[index].previous.pathLength) /
               (subpaths[index].pathLength - subpaths[index].previous.pathLength);
    }
    return lengthAtT / subpaths[index].pathLength;
}

function getBezierPoints(t, points) {
    let helperPoints = [];
    for (let i = 1; i < 4; i++) {
        helperPoints.push(lerp(points[i - 1], points[i], t));
    }
    helperPoints.push(lerp(helperPoints[0], helperPoints[1], t));
    helperPoints.push(lerp(helperPoints[1], helperPoints[2], t));
    helperPoints.push(lerp(helperPoints[3], helperPoints[4], t));
    return [points[0], helperPoints[0], helperPoints[3], helperPoints[5]];
}

function lerp(A, B, t) {
    return [(B[0] - A[0]) * t + A[0], (B[1] - A[1]) * t + A[1]];
}

function drawCBezier(points, index) {
    let d = (index > 0) ? subpaths[index].previous.d : `M${points[0][0]},${points[0][1]} C`;
    for (let i = 1; i < 4; i++) {
        d += ` ${points[i][0]},${points[i][1]} `;
    }
    document.getElementById("partialPath").setAttributeNS(null, "d", d);
}

// 3. HỆ THỐNG HẠT (SPARKLES & FLOWERS)
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
        document.body.appendChild(flower);
        this.particles.push(flower);
        setTimeout(() => { if (flower.parentNode) flower.remove(); }, 7000);
    }
}
const particleSystem = new ParticleSystem();
setInterval(() => particleSystem.createSparkle(), 500);
setInterval(() => particleSystem.createFlower(), 800);

// 4. MÁY TÍNH & MẬT KHẨU
const display = document.getElementById('display');
function appendToDisplay(val) { if (display.value.length < 8) display.value += val; }
function clearDisplay() { display.value = ''; }

function checkPassword() {
    if (display.value === '29032008') { // Thay mật khẩu của bạn tại đây
        window.location.href = 'banhkem.html';
    } else {
        display.style.animation = 'shake 0.6s ease';
        setTimeout(() => {
            alert('Sai ngày sinh rồi kìa!');
            clearDisplay();
            display.style.animation = '';
        }, 600);
    }
}

// 5. GÕ CHỮ & VẼ TRÁI TIM (Khi chuyển sang giai đoạn chúc mừng)
function startHeartAnimation() {
    let t = 0;
    function Typing() {
        if (t >= 1) return;
        t += 0.0025;
        let index;
        for (index = 0; index < subpaths.length; index++) {
            if (subpaths[index].pathLength >= pathlength * t) break;
        }
        let T = get_T(t, index);
        let newPoints = getBezierPoints(T, subpaths[index].lastCubicBezier);
        drawCBezier(newPoints, index);
        requestAnimationFrame(Typing);
    }
    requestAnimationFrame(Typing);
}

// Lưu ý: Nếu bạn dùng file HTML có nút "Mở quà nè", hãy gọi startHeartAnimation() bên trong hàm showLetter()
function showLetter() {
    // Logic ẩn hiện màn hình và bắt đầu vẽ trái tim
    document.getElementById('wishesPage').style.display = 'none';
    document.getElementById('theSvg').style.display = 'block';
    startHeartAnimation();
}
