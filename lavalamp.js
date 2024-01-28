//dependencies
import { lerp } from "./lib.js";

//settings
const numParticles = 25;
const minRadius = 10;
const maxRadius = 50;
const minSpeed = 0.05;
const maxSpeed = 0.25;
const color = "orangered";

//state
const particles = [];

//setup
function setupParticles(canvas) {
    for (let i=0; i<numParticles; i++) {
        particles[i] = getParticle(canvas);
    }
}

function getParticle({ width, height }) {
    const r = lerp(minRadius, maxRadius, Math.random());
    return {
        x: lerp(r, width - r, Math.random()),
        y: lerp(r, height - r, Math.random()),
        r,
        vx: lerp(minSpeed, maxSpeed, Math.random()) * Math.random() < 0.5 ? 1 : -1,
        vy: lerp(minSpeed, maxSpeed, Math.random()) * Math.random() < 0.5 ? 1 : -1,
        color
    };
}

//loop functions
export function update(canvas) {
    //setup needed?
    if (!particles.length) return setupParticles(canvas);
    //update particles
    const { width, height } = canvas;
    for (let i=0; i<particles.length; i++) {
        let p = particles[i];
        //move
        p.x += p.vx;
        p.y += p.vy;
        //pong bounce?
        if (p.x < p.r) {
            p.x = p.r;
            p.vx *= -1;
        }
        else if (p.x > width - p.r) {
            p.x = width - p.r;
            p.vx *= -1;
        }
        if (p.y < p.r) {
            p.y = p.r;
            p.vy *= -1;
        }
        else if (p.y > height - p.r) {
            p.y = height - p.r;
            p.vy *= -1;
        }
    }
}

export function draw(ctx) {
    for (let { x, y, r, color } of particles) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2);
        ctx.fill();
    }
}