//dependencies
import { lerp } from "./lib.js";

//settings
const numParticles = 50;
const minRadius = 2;
const maxRadius = 5;
const minSpeed = -1;
const maxSpeed = 1;
const acceleration = 1.05;
const opacity = 0.03;

//state
const particles = [];

//setup
function setupParticles(canvas) {
    for (let i=0; i<numParticles; i++) {
        particles[i] = getParticle(canvas);
    }
}

function getParticle({ width, height }) {
    return {
        x: width/2,
        y: height/2,
        r: lerp(minRadius, maxRadius, Math.random()),
        vx: lerp(minSpeed, maxSpeed, Math.random()),
        vy: lerp(minSpeed, maxSpeed, Math.random()),
        opacity
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
        //move and accelerate, change opacity
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= acceleration;
        p.vy *= acceleration;
        p.opacity = Math.min(1, p.opacity * acceleration);
        //off screen?
        if (
            p.x + p.r < 0 ||
            p.x - p.r > width ||
            p.y + p.r < 0 ||
            p.y - p.r > height
        ) particles[i] = getParticle(canvas);
    }
}

export function draw(ctx) {
    ctx.save();
    for (let { x, y, r, opacity } of particles) {
        ctx.globalAlpha = opacity;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2);
        ctx.fill();
    }
    ctx.restore();
}