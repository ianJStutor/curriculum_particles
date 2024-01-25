//dependencies
import { fullscreenCanvas } from "./fullscreenCanvas.js";

//environment
const canvas = document.querySelector("canvas");
const ctx = fullscreenCanvas(canvas, window);

//loop
function loop(t) {
    const { width, height } = canvas;
    //erase
    ctx.clearRect(0, 0, width, height);
    //draw
    testing: {
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${width}×${height}`, width*0.5, height*0.5);
    }
    //repeat
    requestAnimationFrame(loop);
}

//init
requestAnimationFrame(loop);