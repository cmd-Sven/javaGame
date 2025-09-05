let currentPlayer = "O"; // Jedi = X, Sith = O
let gameActive = false;
let board = ["", "", "", "", "", "", "", "", ""];

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
  document.querySelectorAll(".select").forEach((btn) => {
    btn.innerHTML = "";
    btn.disabled = false;
  });

  const container = document.querySelector(".container");
  container.classList.add("visible");

  document.getElementById("duelSound").play();
}

const iconJ =
  '<img style="width:55px" src="./images/icons8-jedi-96.png" alt="J">';

const iconS =
  '<img style="width:55px" src="./images/icons8-sith-96.png" alt"S">';

function play(id) {
  if (!gameActive) return;

  const index = parseInt(id.replace("btn", "")) - 1;
  if (board[index] !== "") return;

  board[index] = currentPlayer;
  const btn = document.getElementById(id);
  btn.innerHTML = currentPlayer === "O" ? iconS : iconJ;
  btn.disabled = true;

  document.getElementById("laserSound").play();

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

  // Spielerwechsel
  currentPlayer = currentPlayer === "O" ? "X" : "O";
}

function checkWinner() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => board[index] === currentPlayer);
  });
}

function updatePoints() {
  if (currentPlayer === "O") {
    let points = parseInt(document.getElementById("point1").innerText);
    document.getElementById("point2").innerText = points + 1;
  } else {
    let points = parseInt(document.getElementById("point2").innerText);
    document.getElementById("point1").innerText = points + 1;
  }
}

function replay() {
  gameActive = false;
  board = ["", "", "", "", "", "", "", "", ""];
  document.querySelectorAll(".select").forEach((btn) => {
    btn.innerHTML = "";
    btn.disabled = true;
  });
  document.getElementById("duelSound").pause();
  document.getElementById("duelSound").currentTime = 0;

  const container = document.querySelector(".container");
  container.classList.remove("visible"); // Container ausblenden
}

function showMessage(message) {
  const msgBox = document.createElement("div");
  msgBox.className = "message-box";
  msgBox.innerText = message;
  document.body.appendChild(msgBox);
  setTimeout(() => msgBox.remove(), 2000);
}
