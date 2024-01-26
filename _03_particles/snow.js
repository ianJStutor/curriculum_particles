//dependencies
import { lerp } from "./lib.js";

//settings
const numParticles = 250;
const minRadius = 5;
const maxRadius = 25;

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
    return {
        x: lerp(0, width, Math.random()),
        y: lerp(0, height, Math.random()),
        r: lerp(minRadius, maxRadius, Math.random())
    };
}

//loop functions
export function update(canvas) {
    if (!particles.length) return setupParticles(canvas);
}

export function draw(ctx) {
    ctx.fillStyle = "#ffffff55";
    for (let { x, y, r } of particles) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2);
        ctx.fill();
    }
}