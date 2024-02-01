# Particles 03 (option C): Lava lamp

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Files

* <code>index.html</code> - Entry file for every web app
* <code>index.js</code> - JavaScript module for setting up an app
* <code>fullscreenCanvas.js</code> - JavaScript module for managing a full-screen canvas that self adjusts with browser window resizing
* <code>lib.js</code> - helper functions in one library
* <code>lavalamp.js</code> - particle module

## Lesson notes

### 01 - Makin' magma

1. Rename <code>particles.js</code> to <code>lavalamp.js</code>. In that <code>lavalamp.js</code> file, start by changing a few settings and adding new ones:
    ```js
    //settings
    const numParticles = 50;
    const minRadius = 10;
    const maxRadius = 150;
    const minSpeed = 0.25;
    const maxSpeed = 0.75;
    const color = "orangered";
    ```
    * Note that <code>minSpeed</code> and <code>maxSpeed</code> are both positive values. If this range is applied to both axis velocities, then particles will always move down and to the right at first, right?
    * <code>color</code> is now a global setting, which seems like a good idea. That way, there's no need to hunt for the value (in <code>draw</code>, maybe) when you want to change the color
2. In <code>setupParticles</code>, the <code>console.log()</code> call has been removed. Such logging is useful for debugging but should be deleted when not needed
3. The <code>getParticle</code> function has changed a bit:
    ```js
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
    ```
    * The value for <code>r</code> has been given its own variable because it's used multiple times 
    * The axis velocities are given a random value in the min-max range, then randomly multiplied by <code>1</code> or <code>-1</code>. Why this complexity? It would be simpler to randomize between a negative value and a positive one, but that method would allow for <code>0</code> values or near it, making the particles move very slowly, if at all. This method makes sure there's at least a minimum velocity in any direction. Note that using angles and a vector-based system would also avoid this issue, but students aren't ready for that yet
    * Point out that each particle has its own <code>color</code> property, even though it's always the same depending on the global setting
4. The <code>update</code> function has changed quite a bit:
    ```js
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
    ```
    It looks like a lot, but really the only change is that Pong-style collision detection has been implemented instead of any wrapping
5. The <code>draw</code> function has a minor change:
    ```js
    export function draw(ctx) {
        for (let { x, y, r, color } of particles) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI*2);
            ctx.fill();
        }
    }
    ```
    The value for <code>fillStyle</code> is the <code>color</color> global setting since it's set onto each particle
6. In <code>index.html</code>, change the CSS for the canvas to the following:
    ```css
    canvas { 
        position: absolute; 
        background: black;
        filter: blur(20px) contrast(40); 
    }
    ```
    * The addition of <code>background: black;</code> is required both for the <code>canvas</code> and the <code>body</code>; otherwise, the filter (metaball) effect won't work properly
    * Note that there is a way to apply a filter to the drawing using the canvas API, but it takes a lot more processing power to do it that way, despite the potentially better possible effects. Then again, this could also be done using pixel replacement or even a shader, but students aren't ready for either of those yet
7. Running the code at this point produces a neat lava lamp effect. However, more could be done and different effects achieved. Tinker with the values at this point to see what else can be accomplished with this particle system