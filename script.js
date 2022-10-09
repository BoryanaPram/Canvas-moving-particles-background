const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particles;

function Particle(x, y, directionX, directionY, size, color, filled) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
    this.filled = filled;
}

Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    if(this.filled == true) {
        ctx.fillStyle = this.color;
        ctx.fill();
    } else {
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}

Particle.prototype.update = function() {

    // particles.forEach(other => {
    //     if(other != this) { 
    //         if(collideCircle(this, other)) {
    //             this.directionX = -this.directionX;
    //             this.directionY = -this.directionY;
    //         }
    //     }
    // })

    if(this.x + this.size > canvas.width ||
    this.x - this.size < 0) {
        this.directionX = -this.directionX;
    }
    
    if(this.y + this.size > canvas.height ||
    this.y - this.size < 0) {
        this.directionY = -this.directionY;
    }

    this.x += this.directionX;
    this.y += this.directionY;
    this.draw()
}

function init() {
    particles = [];
    let colors = ['white', 'orange'];

    for(let i = 0; i < 100; i++) {
        let size = Math.random() * 20;
        let x = Math.random() * (innerWidth - size * 2);
        let y = Math.random() * (innerHeight - size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = colors[Math.floor(Math.random() * colors.length)];
        let filled = Math.random() < 0.5;

        particles.push(new Particle(x, y, directionX, directionY, size, color, filled));
    }
}

function animate() {

    
    for(let i = 0; i < particles.length; i++) {
        for(let j = 0; j < particles.length; j++) {
            if(i == j) continue;
            if(collideCircle(particles[i], particles[j])) {
                particles[i].directionX = -particles[i].directionX;
                particles[i].directionY = -particles[i].directionY;
            }
        }
    }

    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for(let i = 0; i < particles.length; i++) {
        particles[i].update();
    }
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function collideCircle(circle1, circle2) {
    let distance_x = circle1.x - circle2.x;
    let distance_y = circle1.y - circle2.y;
    let radii_sum = circle1.size - circle2.size;
    if(Math.sqrt(distance_x * distance_x + distance_y * distance_y) <= radii_sum * radii_sum)
        return true;

    return false;
}