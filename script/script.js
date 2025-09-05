// 🟢 Der aktuelle Spieler (X beginnt immer)
let currentPlayer = "X";

// 🟢 Spielfeld: 9 Felder (leer am Anfang)
let board = ["", "", "", "", "", "", "", "", ""];

// 🟢 Punktestand für beide Spieler
let player1Score = 0;
let player2Score = 0;

// 🟢 Funktion: Wird aufgerufen, wenn ein Button (Feld) geklickt wird
function play(id) {
  const index = parseInt(id.replace("btn", "")) - 1;
  const button = document.getElementById(id);

  if (board[index] === "") {
    board[index] = currentPlayer;
    button.textContent = currentPlayer;

    if (checkWinner()) {
      if (currentPlayer === "X") player1Score++;
      else player2Score++;
      updateScore();
      disableBoard();
      alert(currentPlayer + " gewinnt!");
      return;
    }

    if (!board.includes("")) {
      alert("Unentschieden!");
      replay();
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// 🟢 Gewinner prüfen
function checkWinner() {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winCombos.some(
    (combo) =>
      board[combo[0]] &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
  );
}

// 🟢 Punktestand aktualisieren
function updateScore() {
  document.getElementById("score1").textContent = player1Score;
  document.getElementById("score2").textContent = player2Score;
}

// 🟢 Spielfeld deaktivieren nach Sieg
function disableBoard() {
  board.forEach((_, i) => {
    document.getElementById("btn" + (i + 1)).disabled = true;
  });
}

// 🟢 Neues Spiel starten (nur Spielfeld leeren, Punkte bleiben)
function replay() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  for (let i = 1; i <= 9; i++) {
    const btn = document.getElementById("btn" + i);
    btn.textContent = "";
    btn.disabled = false;
  }
}

// 🟢 Alles zurücksetzen (inkl. Punktestand)
function start() {
  player1Score = 0;
  player2Score = 0;
  updateScore();
  replay();
}
