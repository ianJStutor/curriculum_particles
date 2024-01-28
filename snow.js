//dependencies
import { lerp } from "./lib.js";

//settings
const numParticles = 75;
const minRadius = 5;
const maxRadius = 100;
const minVx = -3;
const maxVx = 3;
const minVy = 2;
const maxVy = 25;

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
    const norm = r/maxRadius;
    return {
        x: lerp(0, width, Math.random()),
        y: lerp(-height, -r, Math.random()),
        r,
        vx: lerp(minVx, maxVx, Math.random()),
        vy: lerp(minVy, maxVy, norm),
        a: 1 - norm
    };
}

//loop functions
export function update(canvas) {
    //setup needed?
    if (!particles.length) return setupParticles(canvas);
    //update particles
    for (let i=0; i<particles.length; i++) {
        let p = particles[i];
        //move
        p.x += p.vx;
        p.y += p.vy;
        //wrap vertically?
        if (p.y > canvas.height + p.r) particles[i] = getParticle(canvas);
    }
}

export function draw(ctx) {
    ctx.save();
    ctx.fillStyle = "#ffffff";
    for (let { x, y, r, a } of particles) {
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2);
        ctx.fill();
    }
    ctx.restore();
}