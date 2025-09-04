class Particle {
  constructor(x, y, color, ctx, area) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.area = area;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;
    this.color = color;
    this.alpha = Math.random() * 0.5 + 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.005;
    if (this.alpha <= 0) {
      this.reset();
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }

  reset() {
    // Start innerhalb des Bereichs (links oder rechts)
    this.x =
      this.area === "left"
        ? Math.random() * window.innerWidth * 0.4
        : Math.random() * window.innerWidth * 0.4 + window.innerWidth * 0.6;
    this.y = Math.random() * window.innerHeight;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;
    this.alpha = Math.random() * 0.5 + 0.5;
  }
}

function particleEffect(canvasId, color, area) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  for (let i = 0; i < 120; i++) {
    let x =
      area === "left"
        ? Math.random() * canvas.width * 0.4
        : Math.random() * canvas.width * 0.4 + canvas.width * 0.6;
    let y = Math.random() * canvas.height;
    particles.push(new Particle(x, y, color, ctx, area));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Links: Blau, Rechts: Rot
particleEffect("blueCanvas", "0,150,255", "left");
particleEffect("redCanvas", "255,50,50", "right");
