# Snow 03: Particles

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Files

* <code>index.html</code> - Entry file for every web app
* <code>index.js</code> - JavaScript module for setting up an app
* <code>fullscreenCanvas.js</code> - JavaScript module for managing a full-screen canvas that self adjusts with browser window resizing
* <code>lib.js</code> - helper functions in one library

## Lesson notes

### 01 - Module

1. Review modules and why they're a good idea in engineering
2. Start calling the <code>ball</code> from the last lesson a "particle" and explain there could be more than one--in fact, an entire particle system. This abstraction is a very good use case for an external module
3. Create <code>snow.js</code> and provide two empty (for now) function exports, <code>update</code> and <code>draw</code>. <code>update</code> takes <code>canvas</code> as a parameter, and <code>draw</code> takes <code>ctx</code> as a parameter. Note: <code>update</code> will eventually also take <code>t</code> as a parameter, but the student isn't ready for that yet
4. Add a dependency for the <code>lerp</code> function
5. In <code>index.js</code>, add the new imports to the dependencies and remove <code>lerp</code>, which won't be needed in this animation-control JavaScript file
6. Delete the whole "ball state" section, the <code>ball</code> object and the <code>resetBall</code> function. These will be completely rewritten in the particle module
7. In the <code>loop</code> function, move <code>const { width, height } = canvas;</code> into the "erase" section; these variables will no longer be used elsewhere in this function
8. Delete the entire "update" and "draw" sections and replace with the following:
    ```js
    //particles
    update(canvas);
    draw(ctx);
    ```
    The animation loop calls the particle functions each frame but otherwise has no responsibility for them
9. In the <code>init</code> function, delete <code>resetBall();</code> since that function has also been deleted. Replace with <code>update(canvas);</code>, which triggers the particle setup
10. Running the code at this point removes the ball and there's nothing left to see. There aren't any particles yet

### 02 - Circles

1. In <code>snow.js</code>, add new sections: "settings", "state", "setup", and "loop functions"
2. "settings" are constants that define the boundaries of the system and each particle; "state" is an array containing all particles. Add code to these sections:
    ```js
    //settings
    const numParticles = 250;
    const minRadius = 5;
    const maxRadius = 25;

    //state
    const particles = [];
    ```
3. "setup" has two functions, <code>setupParticles</code> and <code>getParticle</code>. Add code to these functions:
    ```js
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
    ```
    Review basic syntax and <code>lerp</code>, if necessary
4. "loop functions" holds the exported functions, <code>update</code> and <code>draw</code>:
    ```js
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
    ```
5. For now, <code>update</code> has one responsibility, to call <code>setupParticles</code> if it hasn't already been called. Point out that the <code>canvas</code> argument is passed along to <code>setupParticles</code>, where it is passed along to <code>getParticle</code> so positioning can stay within the canvas boundaries
6. The <code>draw</code> function loops through all the particles and draws a semi-transparent white circle on the context. Point out that the last two characters in the <code>fillColor</code> hex value represent opacity
7. Running the code at this point produces a random distribution of stationary, transluscent circles. Refreshing the page changes the distribution, but there are always the same number of circles, defined by the <code>numParticles</code> setting

### 03 - Movement

