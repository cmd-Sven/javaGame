// script/script.js
let currentPlayer = "O"; // Jedi = X, Sith = O
let gameActive = false;
let board = ["", "", "", "", "", "", "", "", ""];
let moveCount = 0;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Reihen
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Spalten
  [0, 4, 8],
  [2, 4, 6], // Diagonalen
];

function start() {
  gameActive = true;
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "O";
  moveCount = 0;

  document.querySelectorAll(".select").forEach((btn) => {
    btn.innerHTML = "";
    btn.disabled = false;
  });

  const container = document.querySelector(".container");
  container.classList.add("visible");

  updateTurnIndicator(); // Turn-Anzeige aktualisieren

  const duel = document.getElementById("duelSound");
  if (duel) {
    duel.currentTime = 0;
    duel.play();
  }
}

function play(id) {
  if (!gameActive) return;

  const index = parseInt(id.replace("btn", "")) - 1;
  if (board[index] !== "") return;

  // Symbol setzen
  board[index] = currentPlayer;
  const btn = document.getElementById(id);

  const img = document.createElement("img");
  img.src =
    currentPlayer === "O"
      ? "./images/icons8-sith-96.png"
      : "./images/icons8-jedi-96.png";
  img.alt = currentPlayer === "O" ? "Sith" : "Jedi";
  img.width = 48;
  img.height = 48;
  img.classList.add("player-icon");

  btn.innerHTML = "";
  btn.appendChild(img);
  btn.disabled = true;

  moveCount++;

  const laser = document.getElementById("laserSound");
  if (laser) {
    laser.currentTime = 0;
    laser.play();
  }

  // ---------- Popup nach jedem 2. Zug ----------
  if (moveCount % 2 === 0) {
    gameActive = false; // während Popup blockieren

    setTimeout(() => {
      showDicePopup(() => {
        // Nach Popup weiter prüfen
        if (checkWinner()) {
          gameActive = false;
          updatePoints();
          showMessage((currentPlayer === "O" ? "Sith" : "Jedi") + " gewinnt!");
          return;
        }

        if (!board.includes("")) {
          gameActive = false;
          showMessage("Unentschieden!");
          return;
        }

        // Spielerwechsel und Turn-Anzeige aktualisieren
        currentPlayer = currentPlayer === "O" ? "X" : "O";
        updateTurnIndicator();
        gameActive = true;
      });
    }, 1000); // Verzögerung 1s
    return;
  }

  // ---------- Normale Auswertung (ohne Popup) ----------
  if (checkWinner()) {
    gameActive = false;
    updatePoints();
    showMessage((currentPlayer === "O" ? "Sith" : "Jedi") + " gewinnt!");
    return;
  }

  if (!board.includes("")) {
    gameActive = false;
    showMessage("Unentschieden!");
    return;
  }

  // Spielerwechsel und Turn-Anzeige aktualisieren
  currentPlayer = currentPlayer === "O" ? "X" : "O";
  updateTurnIndicator();
}

function checkWinner() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => board[index] === currentPlayer);
  });
}

function updatePoints() {
  if (currentPlayer === "O") {
    let points = parseInt(document.getElementById("point2").innerText) || 0;
    document.getElementById("point2").innerText = points + 1;
  } else {
    let points = parseInt(document.getElementById("point1").innerText) || 0;
    document.getElementById("point1").innerText = points + 1;
  }
}

function replay() {
  gameActive = false;
  board = ["", "", "", "", "", "", "", "", ""];
  moveCount = 0;

  document.querySelectorAll(".select").forEach((btn) => {
    btn.innerHTML = "";
    btn.disabled = true;
  });

  const duel = document.getElementById("duelSound");
  if (duel) {
    duel.pause();
    duel.currentTime = 0;
  }

  const container = document.querySelector(".container");
  container.classList.remove("visible");

  updateTurnIndicator();
}

function showMessage(message) {
  const msgBox = document.createElement("div");
  msgBox.className = "message-box";
  msgBox.innerText = message;
  document.body.appendChild(msgBox);
  setTimeout(() => msgBox.remove(), 2000);
}

/* ---------------- TURN INDICATOR ---------------- */
function updateTurnIndicator() {
  const indicator = document.getElementById("turn-indicator");
  if (!indicator) return;

  if (currentPlayer === "O") {
    indicator.innerText = "Sith ist am Zug!";
    indicator.className = "turn-indicator sith";
  } else {
    indicator.innerText = "Jedi ist am Zug!";
    indicator.className = "turn-indicator jedi";
  }
}

/* ---------------- DICE POPUP & LOGIK ---------------- */
function showDicePopup(callback) {
  const overlay = document.createElement("div");
  overlay.className = "dice-overlay";

  const modal = document.createElement("div");
  modal.className = "dice-modal";

  const title = document.createElement("h2");
  title.innerText = "Würfeln...";
  modal.appendChild(title);

  const face = document.createElement("div");
  face.className = "dice-face";
  face.innerText = "-";
  modal.appendChild(face);

  const info = document.createElement("p");
  info.className = "dice-info";
  info.innerText = "Der zehnseitige Würfel startet in Kürze...";
  modal.appendChild(info);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  const startDelay = 700;
  const animationDuration = 4000;

  let rollInterval;
  setTimeout(() => {
    rollInterval = setInterval(() => {
      face.innerText = Math.floor(Math.random() * 10) + 1;
    }, 100);

    setTimeout(() => {
      clearInterval(rollInterval);
      const final = Math.floor(Math.random() * 10) + 1;
      face.innerText = final;

      applyDiceResult(final);

      setTimeout(() => {
        if (overlay && overlay.parentNode)
          overlay.parentNode.removeChild(overlay);
        if (typeof callback === "function") callback();
      }, 1000);
    }, animationDuration);
  }, startDelay);
}

function applyDiceResult(result) {
  const maxButtons = board.length;
  if (result >= 1 && result <= maxButtons) {
    const targetIndex = result - 1;
    board[targetIndex] = "";
    const targetBtn = document.getElementById(`btn${result}`);
    if (targetBtn) {
      targetBtn.innerHTML = "";
      targetBtn.disabled = false;
    }
    showMessage(`Wurf: ${result} → Feld ${result} gelöscht.`);
  } else {
    const randomIndex = Math.floor(Math.random() * maxButtons);
    board[randomIndex] = "";
    const targetBtn = document.getElementById(`btn${randomIndex + 1}`);
    if (targetBtn) {
      targetBtn.innerHTML = "";
      targetBtn.disabled = false;
    }
    showMessage(
      `Wurf: ${result} → zufälliges Feld ${randomIndex + 1} gelöscht.`
    );
  }
}
