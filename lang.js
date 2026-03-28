// 1. KIỂM TRA CHUYỂN HƯỚNG & TRÁNH VÒNG LẶP
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('step') === 'wishes') {
    // Nếu từ bánh kem quay lại, đợi HTML load xong rồi vẽ trái tim luôn
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof nextStage === "function") {
            nextStage(); 
        }
    });
}

// 2. LOGIC VẼ TRÁI TIM TOÁN HỌC
let rid = null;
const SVG_NS = "http://www.w3.org/2000/svg";
let pathlength;
let subpaths = [];

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('preload');
    const shape = document.getElementById("shape");
    if (shape) {
        pathlength = shape.getTotalLength();
        let d = shape.getAttribute("d");
        let n = d.match(/C/gi).length;
        let pos = 0;
        for (let i = 0; i < n; i++) {
            let newpos = d.indexOf("C", pos + 1);
            if (i > 0) subpaths.push(new subPath(d.substring(0, newpos)));
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
            this.M_point = [p[p.length - 2], p[p.length - 1]];
        } else {
            this.M_point = [this.pointsRy[0], this.pointsRy[1]];
        }
    }
    get_lastCubicBezier() {
        let lastIndexOfC = this.d.lastIndexOf("C");
        let temp = this.d.substring(lastIndexOfC + 1).split(/[\s,]/).filter(v => v);
        this.lastCubicBezier = [this.M_point];
        for (let i = 0; i < temp.length; i += 2) {
            this.lastCubicBezier.push([parseFloat(temp[i]), parseFloat(temp[i+1])]);
        }
    }
}

function get_T(t, index) {
    let lenAtT = pathlength * t;
    if (index > 0) return (lenAtT - subpaths[index-1].pathLength) / (subpaths[index].pathLength - subpaths[index-1].pathLength);
    return lenAtT / subpaths[index].pathLength;
}

function lerp(A, B, t) { return [(B[0] - A[0]) * t + A[0], (B[1] - A[1]) * t + A[1]]; }

function getBezierPoints(t, p) {
    let h = [];
    for (let i = 1; i < 4; i++) h.push(lerp(p[i-1], p[i], t));
    h.push(lerp(h[0], h[1], t), lerp(h[1], h[2], t));
    h.push(lerp(h[3], h[4], t));
    return [p[0], h[0], h[3], h[5]];
}

function drawCBezier(points, index) {
    let d = (index > 0) ? subpaths[index-1].d : `M${points[0][0]},${points[0][1]} C`;
    for (let i = 1; i < 4; i++) d += ` ${points[i][0]},${points[i][1]} `;
    const partial = document.getElementById("partialPath");
    if (partial) partial.setAttributeNS(null, "d", d);
}

// 3. HỆ THỐNG HẠT
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.maxParticles = 50;
    }
    createSparkle() {
        if (this.particles.length >= this.maxParticles) return;
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        document.body.appendChild(sparkle);
        this.particles.push(sparkle);
        setTimeout(() => { sparkle.remove(); this.particles.shift(); }, 5000);
    }
}
const ps = new ParticleSystem();
setInterval(() => ps.createSparkle(), 500);

// 4. MÁY TÍNH & MẬT KHẨU
function appendToDisplay(val) {
    const d = document.getElementById('display');
    if (d && d.value.length < 8) d.value += val;
}
function clearDisplay() {
    const d = document.getElementById('display');
    if (d) d.value = '';
}

function checkPassword() {
    const d = document.getElementById('display');
    // Mật khẩu đúng của bạn
    if (d && d.value === '29032008') { 
        window.location.href = 'banhkem.html';
    } else {
        d.style.animation = 'shake 0.6s ease';
        setTimeout(() => {
            alert('Sai ngày sinh rồi kìa!');
            clearDisplay();
            d.style.animation = '';
        }, 600);
    }
}

// 5. KÍCH HOẠT VẼ TRÁI TIM
function startHeartAnimation() {
    let t = 0;
    function Typing() {
        if (t >= 1) return;
        t += 0.0025;
        let idx = subpaths.findIndex(s => s.pathLength >= pathlength * t);
        if (idx === -1) idx = subpaths.length - 1;
        drawCBezier(getBezierPoints(get_T(t, idx), subpaths[idx].lastCubicBezier), idx);
        requestAnimationFrame(Typing);
    }
    requestAnimationFrame(Typing);
}
