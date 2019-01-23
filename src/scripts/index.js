import * as P5 from 'p5';
import seedrandom from 'seedrandom';

const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 600;

const BASE_H = 15;
const BASE_S = 10;
const BASE_B = 100;
// const STARTER_SEED = undefined;
const STARTER_SEED = '0.9957501644823340.95269969042220850.97959346981259250.94626703899465710.11296706034261920.136906097352855220.89076470612657010.94772240899396930.2741413777103240.62710803966414360.84934390825906540.36647019895987565';


// Creates a seeded random number generator
const random = ((seed) => {
  if (seed) {
    console.log(`Using user-defined seed: ${seed}`);
    return seedrandom(seed);
  }

  let seeds = [];
  let rnd = seedrandom();
  for(let i = 0; i < 12; i++) {
    seeds.push(rnd());
  }
  console.log(`Using seed: ${seeds.join('')}`);
  return seedrandom(seeds.join(''));
})(STARTER_SEED);

// Creates a random number.
//
// If one argument is given, return a random number between 0 and that argument.
// If two arguments are given, return a random number between the two arguments.
const randomNumber = (low, high) => {
  if(!high) {
    high = low;
    low = 0;
  }

  return random() * (high - low) + low;
};

let texturize = (p5, density) => {
  for(let i = 0; i < density; i++) {
    p5.stroke(
      BASE_H,
      BASE_S - randomNumber(5),
      BASE_B - randomNumber(8),
      randomNumber(75, 85)
    );

    let x1 = randomNumber(CANVAS_WIDTH);
    let y1 = randomNumber(CANVAS_HEIGHT);
    let theta = randomNumber(2 * Math.PI);
    let segmentLength = randomNumber(2, 7);
    let x2 = Math.cos(theta) * segmentLength + x1;
    let y2 = Math.sin(theta) * segmentLength + y1;

    p5.line(x1, y1, x2, y2);
  }
};

const drawSpot = (p5, x, y, radius, hue) => {
  p5.fill(
    hue,
    100,
    100,
    10
  );
  p5.ellipse(x, y, radius, radius);

  p5.noFill();
  for(let i = 6; i > 0; i--) {
    p5.stroke(
      hue,
      100,
      100,
      3
    );
    p5.strokeWeight(i);
    p5.ellipse(x, y, radius - i, radius - i);
  }
  p5.strokeWeight(1);
  p5.stroke(
    hue,
    100,
    100,
    20
  );
  p5.ellipse(x, y, radius, radius);
};

let draw = (p5) => {
  p5.setup = () => {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    p5.colorMode(p5.HSB, 100);

    p5.background(BASE_H, BASE_S, BASE_B);
    texturize(p5, 30000);

    for (let i = 0; i < 10; i++) {
      let hue = randomNumber(100);
      let radius = randomNumber(50, 300);
      let x = randomNumber(CANVAS_WIDTH);
      let y = randomNumber(CANVAS_HEIGHT);
      drawSpot(p5, x, y, radius, hue);
    }
  };
};

new P5(draw);
