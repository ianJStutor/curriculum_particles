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
10. Running the code at this point removes the ball. There aren't any particles yet

### 02 - Circles

1. 