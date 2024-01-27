# Particles 04 (option B): Lava Lamp

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
    const numParticles = 250;
    const minRadius = 5;
    const maxRadius = 100;
    const minVx = -3;
    const maxVx = 3;
    const minVy = 2;
    const maxVy = 25;
    ```
    Note that <code>minSpeed</code> and <code>maxSpeed</code> have been replaced with more specific mins and maxes based on axis velocity. Also, <code>minVx</code> is negative because particles can move to the left as well as to the right. But they don't go up, which is why <code>minVy</code> is positive
2. In <code>setupParticles</code>, the <code>console.log()</code> call has been removed. Such logging is useful for debugging but should be deleted when not needed
3. The <code>getParticle</code> function has changed a bit:
    ```js
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
    ```
    * The value for <code>norm</code> has been given its own variable because it's used twice. 
    * The <code>a</code> property stands for _alpha_, representing opacity on a scale of zero to one. Alpha is the inverse of the normalized radius, meaning larger particles are more transparent. 
    * There's now a real value for <code>vx</code>, although small
4. Note that the <code>update</code> function doesn't change at all
5. The <code>draw</code> function, however, has some changes:
    ```js
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
    ```
    * <code>save()</code> and <code>restore()</code> permits changes while drawing these particles but won't let these changes affect any other drawing that might be happening
    * The value for <code>fillStyle</code> loses its last two characters. The alpha (opacity) will be handled individually for each particle instead of all particles uniformly
    * The <code>globalAlpha</code> property sets opacity for anything drawn after it's been set; in this case it's set before drawing each particle
6. In <code>index.html</code>, change the CSS for the canvas to the following:
    ```js
    canvas { position: absolute; filter: blur(6px); }
    ```
    Note that there is a way to apply a filter to the drawing using the canvas API, but it takes a lot more processing power to do it that way, despite the potentially better effect
7. Running the code at this point produces a much better snow animation than in the previous step. However, more could be done and different effects achieved. Tinker with the values at this point to see what else can be accomplished with this particle system