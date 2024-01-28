//dependencies
import { update as particlesUpdate, draw as particlesDraw } from "./particles.js";
import { update as snowUpdate, draw as snowDraw } from "./snow.js";
import { update as warpdriveUpdate, draw as warpdriveDraw } from "./warpdrive.js";
import { update as lavalampUpdate, draw as lavalampDraw } from "./lavalamp.js";

//environment
const width = 300;
const height = 300
const canvases = [...document.querySelectorAll("canvas")];
canvases.forEach(c => {
    c.width = width;
    c.height = height;
});
const [
    particlesCanvas, 
    snowCanvas, 
    warpdriveCanvas, 
    lavalampCanvas
] = canvases;
const contexts = canvases.map(c => c.getContext("2d"));
const [
    particlesCtx,
    snowCtx,
    warpdriveCtx,
    lavalampCtx
] = contexts;

//loop
function loop(t) {
    //erase
    contexts.forEach(ctx => ctx.clearRect(0, 0, width, height));
    //particles
    particlesUpdate(particlesCanvas);
    particlesDraw(particlesCtx);
    snowUpdate(snowCanvas);
    snowDraw(snowCtx);
    warpdriveUpdate(warpdriveCanvas);
    warpdriveDraw(warpdriveCtx);
    lavalampUpdate(lavalampCanvas);
    lavalampDraw(lavalampCtx);
    //repeat
    requestAnimationFrame(loop);
}

//init
function init() {
    requestAnimationFrame(loop);
}

init();