const AGENT_COUNT = 900;
const agents = [];
const wrapMargin = 24;
let fieldSeed;

function setup() {
  const canvasSize = Math.min(windowWidth, windowHeight) * 0.75;
  const canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent("sketch-holder");
  pixelDensity(1);
  colorMode(HSB, 360, 100, 100, 1);
  noiseDetail(4, 0.5);
  fieldSeed = random(1000);

  background(220, 70, 5);

  agents.length = 0;
  for (let i = 0; i < AGENT_COUNT; i++) {
    agents.push(new Agent());
  }
}

function draw() {
  noStroke();
  fill(220, 70, 5, 0.08);
  rect(0, 0, width, height);

  const time = fieldSeed + millis() * 0.00005;
  for (const agent of agents) {
    agent.step(time);
  }
}

function windowResized() {
  const canvasSize = Math.min(windowWidth, windowHeight) * 0.75;
  resizeCanvas(canvasSize, canvasSize);
  background(220, 70, 5);
  for (const agent of agents) {
    agent.reset();
  }
}

class Agent {
  constructor() {
    this.reset();
  }

  reset() {
    this.pos = createVector(random(width), random(height));
    this.prev = this.pos.copy();
    this.heading = random(TWO_PI);
    this.life = random(200, 360);
    this.maxLife = this.life;
    this.hueOffset = random(360);
  }

  step(time) {
    this.prev.set(this.pos);

    const flowAngle = sampleFlow(this.pos.x, this.pos.y, time);
    this.heading = rotateTowards(this.heading, flowAngle, 0.15);

    const speedNoise = noise(this.pos.x * 0.003, this.pos.y * 0.003, time * 0.6);
    const speed = 0.4 + speedNoise * 2.4;
    this.pos.x += Math.cos(this.heading) * speed;
    this.pos.y += Math.sin(this.heading) * speed;

    this.life -= 1;

    const trailHue = (this.hueOffset + degrees(flowAngle) * 0.5) % 360;
    const alpha = constrain(map(this.life, 0, this.maxLife, 0, 0.7) + 0.15, 0.05, 0.8);
    stroke(trailHue, 70, 100, alpha);
    strokeWeight(0.9);
    line(this.prev.x, this.prev.y, this.pos.x, this.pos.y);

    if (this.shouldRespawn()) {
      this.reset();
    }
  }

  shouldRespawn() {
    return (
      this.life <= 0 ||
      this.pos.x < -wrapMargin ||
      this.pos.x > width + wrapMargin ||
      this.pos.y < -wrapMargin ||
      this.pos.y > height + wrapMargin
    );
  }
}

function sampleFlow(x, y, time) {
  const scale1 = 0.0015;
  const scale2 = 0.0007;
  const n1 = noise(x * scale1, y * scale1, time);
  const n2 = noise(x * scale2 + 120, y * scale2 - 85, time * 0.6 + 50);
  const angle = TAU * n1 + PI * (n2 - 0.5);
  return angle;
}

function rotateTowards(current, target, amount) {
  const difference = Math.atan2(Math.sin(target - current), Math.cos(target - current));
  return current + difference * amount;
}
