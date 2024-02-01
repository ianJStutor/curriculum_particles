# Particles 03 (option B): Warp drive

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Files

* <code>index.html</code> - Entry file for every web app
* <code>index.js</code> - JavaScript module for setting up an app
* <code>fullscreenCanvas.js</code> - JavaScript module for managing a full-screen canvas that self adjusts with browser window resizing
* <code>lib.js</code> - helper functions in one library
* <code>warpdrive.js</code> - particle module

## Lesson notes

### 01 -Ludicrous speed

1. Rename <code>particles.js</code> to <code>warpdrive.js</code>. In that <code>warpdrive.js</code> file, start by changing a few settings and adding new ones:
    ```js
    //settings
    const numParticles = 50;
    const minRadius = 2;
    const maxRadius = 5;
    const minSpeed = -1;
    const maxSpeed = 1;
    const acceleration = 1.05;
    const opacity = 0.03;
    ```
    Note the addition of <code>acceleration</code>, a multiplier for both speed and opacity, and <code>opacity</code>, the starting translucency
2. In <code>setupParticles</code>, the <code>console.log()</code> call has been removed. Such logging is useful for debugging but should be deleted when not needed
3. The <code>getParticle</code> function has changed a bit:
    ```js
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
    ```
    * Every particle starts in the center of the canvas
    * The same speed range randomization is applied to both axis velocities. Note that using a polar coordinate system might produce better results, but the student isn't there yet
4. The <code>update</code> function has some significant changes:
    ```js
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
    ```
    * After the position changes by axis velocity, the velocities change by acceleration. Since <code>acceleration</code> is greater than <code>1</code>, the velocities get larger each frame. And since the operation is multiplication, the increase isn't linear, it's parabolic. Particles get faster the further they go from the center
    * Similarly, <code>opacity</code> is multiplied by <code>acceleration</code> until it maxes out at <code>1</code>. Nothing can be more than fully opaque. Particles become more pure white the further they go from the center
    * Since particles are flying off in all directions, <code>update</code> needs to check if a particle has left the canvas on any side. If so, the particle is replaced with a new one
5. The <code>draw</code> function also has some changes:
    ```js
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
    ```
    * <code>save()</code> and <code>restore()</code> permit changes while drawing these particles but won't let these changes affect any other drawing that might be happening outside this module
    * The value for <code>fillStyle</code> is always <code>white</code>
    * The <code>globalAlpha</code> property sets opacity for anything drawn after it's been set; in this case it's set before drawing each particle
6. Running the code at this point produces a sci-fi animation of rocketing past stars. However, more could be done and different effects achieved. Tinker with the values at this point to see what else can be accomplished with this particle system