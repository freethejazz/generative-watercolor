import * as P5 from 'p5';
import seedrandom from 'seedrandom';
import '../main.css';

const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 600;

const BASE_H = 15;
const BASE_S = 10;
const BASE_B = 100;
let STARTER_SEED = undefined;
// let STARTER_SEED = '0.0254234783511281260.087736015742384450.077784111080155390.98183644539868390.59517722476442440.50780271004472020.71284184288079220.187110162331374840.95948667486614790.64437922439550030.6557170691949830.25110803279870125';
// let STARTER_SEED = '0.65852690666072930.50869205347307610.7803889336579350.34053278018056350.76811966454265390.92722513958212540.34940729808154670.84485653576009780.177299326527725840.250850735041893650.344741130812030450.2554023976510958';
// let STARTER_SEED = '0.07209449785589920.99384786157967120.382389391293022130.9584043139481310.67289675201918440.79724100724694640.420050008475147060.5261654564662210.342853255984495340.58867070987686860.14051561403113920.9740082395746739';
// let STARTER_SEED = '0.206657379275805080.98747442688198380.174783294246237040.81759361862395550.0298573230625077960.70433159675950310.16173312618598740.87480114835969540.46844420135840070.097809613154046280.372906645076012570.9875668852955493';
// let STARTER_SEED = '0.80682326240398590.4914455955038880.18103098534162550.74885131455775490.241018357163793160.27645017368831620.050819686573334180.32405028432347510.1691830619126210.71819448323333910.14087623016722090.219430259698341';
// let STARTER_SEED = '0.495510073608584460.55768738117704950.04174736714636150.47033673811743360.42128758068018560.33161111873852610.52813321421550090.456373367477248270.96536059604683120.14535333666791740.93880329492378660.47139784267613055';
// let STARTER_SEED = '0.57719489248809240.87911914265965130.79624874737153250.43548217138683770.19974019475344250.38691292233407770.78519078811262190.57229126803178280.134550202052132830.94208436929805580.85831468915972050.42840112245843825';
// let STARTER_SEED = '0.51725177550308640.76262960087578080.98696846012083130.6031992470186740.68112353365943070.350092534607097050.87250568087927740.421415692000100150.50919430162471170.308818481498618460.89261260862930970.3880693610438733';
// let STARTER_SEED = '0.81647471151279290.391855141027379950.54819537705496270.73410286645594970.679432510653370.59886950364107540.44279406535397380.202521645357577360.82570288392331650.60102213699453340.192625947484325680.7230938641892019';
// let STARTER_SEED = '0.142080045962497130.299175388912685360.46040534635080630.44558065908635710.7408997760001690.6454432865404480.234276400926344720.77497783238453920.062161398256546480.071742842937884020.26228304691198710.1266516120873181';
// let STARTER_SEED = '0.071147057306611130.172222440252960160.86533103735063210.92226557263920930.82386342539871240.22504674310102260.56179335853064530.073363268200428960.153002185782344420.79226134211767960.97241623135314340.9539089208245336';

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

    let x1 = randomNumber(p5.width);
    let y1 = randomNumber(p5.height);
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

  for(let i = radius; i > 0; i -= radius/3) {
    p5.stroke(
      hue,
      100,
      100,
      1
    );
    p5.strokeWeight(i);
    drawCircle(p5, x, y, radius - i);
  }
  for(let i = radius; i > 0; i -= radius/4) {
    p5.stroke(
      hue,
      100,
      100,
      2
    );
    p5.strokeWeight(i);
    drawCircle(p5, x, y, radius - i);
  }
  for(let i = 16; i > 0; i -= 4) {
    p5.stroke(
      hue,
      100,
      100,
      5
    );
    p5.strokeWeight(i);
    drawCircle(p5, x, y, radius - i);
  }
  p5.strokeWeight(1);
  p5.stroke(
    hue,
    100,
    100,
    inner
  );
  drawCircle(p5, x, y, radius);
};

let draw = (p5) => {
  p5.noiseSeed(STARTER_SEED);
  p5.noLoop();
  p5.setup = () => {
    const dw = p5.windowWidth;
    const dh = p5.windowHeight;
    p5.createCanvas(dw, dh);
    p5.colorMode(p5.HSB, 100);

  };
  p5.draw = () => {
    const dw = p5.windowWidth;
    const dh = p5.windowHeight;
    p5.background(BASE_H, BASE_S, BASE_B);
    texturize(p5, 30000);

    for (let i = 0; i < 3; i++) {
      let hue = randomNumber(100);
      let radius = randomNumber(50, 300);
      let x = randomNumber(dw);
      let y = randomNumber(dh);
      // p5.noiseSeed(`${x}${y}${radius}${hue}`);
      drawSpot(p5, x, y, radius, hue);
    }

  };
  // p5.windowResized = () => {
  //   p5.resizeCanvas(p5.windowWidth, p5.windowWidth);
  // };
};

new P5(draw);
