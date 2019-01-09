import * as P5 from 'p5';

const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 600;

const BASE_H = 15;
const BASE_S = 10;
const BASE_B = 100;


let texturize = (p5, density) => {
  for(let i = 0; i < density; i++) {
    p5.stroke(
      BASE_H,
      BASE_S - Math.random() * 5,
      BASE_B - Math.random() * 8,
      Math.random() * 10 + 75
    );

    let x1 = Math.random() * CANVAS_WIDTH;
    let y1 = Math.random() * CANVAS_HEIGHT;
    let theta = Math.random() * 2 * Math.PI;
    let segmentLength = Math.random() * 5 + 2;
    let x2 = Math.cos(theta) * segmentLength + x1;
    let y2 = Math.sin(theta) * segmentLength + y1;

    p5.line(x1, y1, x2, y2);
  }
};

let draw = (p5) => {
  p5.setup = () => {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    p5.colorMode(p5.HSB, 100);
    p5.frameRate(5);

    p5.background(BASE_H, BASE_S, BASE_B);
    // const NUM_DOTS = 400;
    // for(let i = 0; i < NUM_DOTS; i++) {
    //   let x = Math.random() * CANVAS_WIDTH;
    //   let y = Math.random() * CANVAS_HEIGHT;
    //   let r = 5 + Math.random() * 10;
    //   p5.ellipse(x, y, r, r);
    // }

    texturize(p5, 30000);
  };
};

new P5(draw);
