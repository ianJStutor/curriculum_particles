//dependencies
import { fullscreenCanvas } from "./fullscreenCanvas.js";
import { lerp } from "./lib.js";

//environment
const canvas = document.querySelector("canvas");
const ctx = fullscreenCanvas(canvas, window);

//ball state
const ball = {};

function resetBall() {
    const { width, height } = canvas;
    ball.x = width * 0.5;
    ball.y = height * 0.5;
    const minBallSpeed = 10;
    const maxBallSpeed = 20;
    const angle = lerp(0, Math.PI*2, Math.random());
    const speed = lerp(minBallSpeed, maxBallSpeed, Math.random());
    ball.vx = speed * Math.cos(angle);
    ball.vy = speed * Math.sin(angle);
    const minBallRadius = 10;
    const maxBallRadius = 25;
    ball.r = lerp(minBallRadius, maxBallRadius, Math.random());
    ball.color = "teal";
    ball.life = 250;
}

//loop
function loop(t) {
    const { width, height } = canvas;
    //erase
    ctx.clearRect(0, 0, width, height);
    //update
    ball.life--;
    if (ball.life <= 0) resetBall();
    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.x < ball.r) {
        ball.x = ball.r;
        ball.vx *= -1;
    }
    else if (ball.x > width - ball.r) {
        ball.x = width - ball.r;
        ball.vx *= -1;
    }
    if (ball.y < ball.r) {
        ball.y = ball.r;
        ball.vy *= -1;
    }
    else if (ball.y > height - ball.r) {
        ball.y = height - ball.r;
        ball.vy *= -1;
    }
    //draw
    const { color, x, y, r } = ball;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fill();
    //repeat
    requestAnimationFrame(loop);
}

//init
function init() {
    resetBall();
    requestAnimationFrame(loop);
}

init();