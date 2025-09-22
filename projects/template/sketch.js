function setup() {
  const canvasSize = Math.min(windowWidth, windowHeight) * 0.6;
  createCanvas(canvasSize, canvasSize).parent(document.body);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(210, 40, 95);

  const t = millis() / 2000;
  const layers = 12;

  for (let i = 0; i < layers; i++) {
    const angle = (TWO_PI * i) / layers + t;
    const radius = width * 0.25 + sin(t + i) * width * 0.1;
    const x = width / 2 + cos(angle) * radius;
    const y = height / 2 + sin(angle) * radius;

    fill((t * 60 + i * 30) % 360, 80, 100, 90);
    const size = width * 0.12 + sin(t * 2 + i) * width * 0.05;
    circle(x, y, size);
  }
}

function windowResized() {
  const canvasSize = Math.min(windowWidth, windowHeight) * 0.6;
  resizeCanvas(canvasSize, canvasSize);
}
