let currentPlayer = "X"; // Jedi = X, Sith = O
let gameActive = false;
let board = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8], // Reihen
  [0,3,6], [1,4,7], [2,5,8], // Spalten
  [0,4,8], [2,4,6]           // Diagonalen
];

function start() {
  gameActive = true;
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  document.querySelectorAll(".select").forEach(btn => {
    btn.innerText = "";
    btn.disabled = false;
  });
  document.getElementById("duelSound").play();
}

function play(id) {
  if (!gameActive) return;

  const index = parseInt(id.replace("btn", "")) - 1;
  if (board[index] !== "") return;

  board[index] = currentPlayer;
  const btn = document.getElementById(id);
  btn.innerText = currentPlayer === "X" ? "⚔️" : "💀"; 
  btn.disabled = true;

  document.getElementById("laserSound").play();

  if (checkWinner()) {
    gameActive = false;
    updatePoints();
    alert((currentPlayer === "X" ? "Jedi" : "Sith") + " gewinnt!");
    return;
  }

  if (!board.includes("")) {
    gameActive = false;
    alert("Unentschieden!");
    return;
  }

  // Spielerwechsel
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

function updatePoints() {
  if (currentPlayer === "X") {
    let points = parseInt(document.getElementById("point1").innerText);
    document.getElementById("point1").innerText = points + 1;
  } else {
    let points = parseInt(document.getElementById("point2").innerText);
    document.getElementById("point2").innerText = points + 1;
  }
}

function replay() {
  gameActive = false;
  board = ["", "", "", "", "", "", "", "", ""];
  document.querySelectorAll(".select").forEach(btn => {
    btn.innerText = "";
    btn.disabled = true;
  });
  document.getElementById("duelSound").pause();
  document.getElementById("duelSound").currentTime = 0;
}
