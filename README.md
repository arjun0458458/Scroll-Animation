Scroll Animation

A small frontend assignment.

## What it does
- Shows a welcome headline and four statistic cards.
- The car moves across the road as you scroll.
- A green strip grows behind the car.
- The cards have a subtle reveal animation.


## Tools
React, CSS, JavaScript, GSAP and ScrollTrigger.

## Run locally
1. Install Node.js.
2. Open this folder in VS Code.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL shown in your terminal.

## How the animation works
The `ScrollTrigger` watches the hero section. The car's horizontal `x` position is linked to scroll progress using `scrub: 1`. The green trail uses a scale transform so it grows with the same scroll progress. This means the animation can move forward or backward when the user scrolls.