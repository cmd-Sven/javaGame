// ################## Animations des Hintergrundes via MATH */

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

/* #### Sound abspielen für Cursor Click inklsuive Funken#### */

const sound = document.getElementById("laserSound");

document.addEventListener("click", (e) => {
  // 🔊 Sound abspielen
  sound.currentTime = 0;
  sound.play();

  // ✨ Funken erzeugen
  for (let i = 0; i < 8; i++) {
    const spark = document.createElement("div");
    spark.classList.add("spark");

    // Position an Maus
    spark.style.left = e.pageX + "px";
    spark.style.top = e.pageY + "px";

    // irgendwohin die Funken fliegen lassen
    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 20;
    const x = Math.cos(angle) * distance + "px";
    const y = Math.sin(angle) * distance + "px";
    spark.style.setProperty("--x", x);
    spark.style.setProperty("--y", y);

    document.body.appendChild(spark);

    // auch wieder entfernen ... fast vergessen xD
    spark.addEventListener("animationend", () => spark.remove());
  }
});

/* ############### Lichtschwertwechsel nach Click ############## */
const cursor = document.getElementById("custom-cursor");
const saberRed = document.getElementById("saber-red");
const saberBlue = document.getElementById("saber-blue");

let useRed = true;

// Mausbewegung → Cursor folgt
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Klick → Lichtschwert wechseln + faden
document.addEventListener("click", () => {
  useRed = !useRed;
  if (useRed) {
    saberRed.classList.add("visible");
    saberBlue.classList.remove("visible");
  } else {
    saberBlue.classList.add("visible");
    saberRed.classList.remove("visible");
  }
});
