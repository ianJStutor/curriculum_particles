//dependencies
import { lerp } from "./lib.js";

//settings
const numParticles = 250;
const minRadius = 5;
const maxRadius = 50;
const minSpeed = 4;
const maxSpeed = 15;

//state
const particles = [];

//setup
function setupParticles(canvas) {
    for (let i=0; i<numParticles; i++) {
        particles[i] = getParticle(canvas);
    }
    console.log(particles);
}

function getParticle({ width, height }) {
    const r = lerp(minRadius, maxRadius, Math.random());
    return {
        x: lerp(0, width, Math.random()),
        y: lerp(-height, -r, Math.random()),
        r,
        vx: 0,
        vy: lerp(minSpeed, maxSpeed, r/maxRadius)
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
    ctx.fillStyle = "#ffffff55";
    for (let { x, y, r } of particles) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2);
        ctx.fill();
    }
}