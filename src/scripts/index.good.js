import * as P5 from 'p5';
import seedrandom from 'seedrandom';

const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 600;

const BASE_H = 15;
const BASE_S = 10;
const BASE_B = 100;
// let STARTER_SEED = undefined;
// let STARTER_SEED = '0.0254234783511281260.087736015742384450.077784111080155390.98183644539868390.59517722476442440.50780271004472020.71284184288079220.187110162331374840.95948667486614790.64437922439550030.6557170691949830.25110803279870125';
// let STARTER_SEED = '0.65852690666072930.50869205347307610.7803889336579350.34053278018056350.76811966454265390.92722513958212540.34940729808154670.84485653576009780.177299326527725840.250850735041893650.344741130812030450.2554023976510958';
// let STARTER_SEED = '0.07209449785589920.99384786157967120.382389391293022130.9584043139481310.67289675201918440.79724100724694640.420050008475147060.5261654564662210.342853255984495340.58867070987686860.14051561403113920.9740082395746739';
let STARTER_SEED = '0.206657379275805080.98747442688198380.174783294246237040.81759361862395550.0298573230625077960.70433159675950310.16173312618598740.87480114835969540.46844420135840070.097809613154046280.372906645076012570.9875668852955493';

const getWavyRadiusMultiplier = (r, step) => {
  const depthMultiplier = r * 2/100;
  const frequencyMultiplier = r * 2/3;

  return r - Math.abs(Math.sin(step*frequencyMultiplier) * depthMultiplier);
};

const getExtraNoise = (p5, i, r) => {
  const rate = 40;
  return p5.noise(Math.cos(i/rate) * r, Math.sin(i/rate) * r) * 50;
};

const drawCircle = (p5, x, y, d) => {
  const r = d/2;
  const step = 2 * Math.PI / 360;
  p5.beginShape();


  for(let i = 0; i <= 2 * Math.PI; i += step) {
    p5.vertex(
      x + Math.cos(i) * (getWavyRadiusMultiplier(r, i) + getExtraNoise(p5, i, r)),
      y + Math.sin(i) * (getWavyRadiusMultiplier(r, i) + getExtraNoise(p5, i, r))
    );
  }
  p5.endShape(p5.CLOSE);
};

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
  STARTER_SEED = seeds.join('');
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
    20
  );
  drawCircle(p5, x, y, radius);

  p5.noFill();

  p5.stroke(
    hue,
    100,
    100,
    15
  );
  let inner = randomNumber(6, 10)
  // p5.strokeWeight(radius/inner);
  // drawCircle(p5, x, y, radius - radius/inner - 5);

  for(let i = 24; i > 0; i -= 4) {
    p5.stroke(
      hue,
      100,
      100,
      3
    );
    p5.strokeWeight(i);
    drawCircle(p5, x, y, radius - i);
  }
  p5.strokeWeight(1);
  p5.stroke(
    hue,
    100,
    100,
    20
  );
  drawCircle(p5, x, y, radius);
};

let draw = (p5) => {
  // p5.noiseSeed(STARTER_SEED);
  p5.setup = () => {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    p5.colorMode(p5.HSB, 100);

    p5.background(BASE_H, BASE_S, BASE_B);
    texturize(p5, 30000);

    for (let i = 0; i < 3; i++) {
      let hue = randomNumber(100);
      let radius = randomNumber(50, 300);
      let x = randomNumber(CANVAS_WIDTH);
      let y = randomNumber(CANVAS_HEIGHT);
      // p5.noiseSeed(`${x}${y}${radius}${hue}`);
      drawSpot(p5, x, y, radius, hue);
    }
  };
};

new P5(draw);
