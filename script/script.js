// javaScript
let turn = "X";
let gameOver = false;
let board = ["", "", "", "", "", "", "", "", "", ""];
let score1 = 0;
let score2 = 0;

plays = {
  player1: ["X", "#0606b5ff", [], 0],
  player2: ["O", "#a30000", [], 0],
};

function play(n) {
  if (gameOver) return;
  const btn = document.getElementById("btn" + n);
  if (btn.textContent !== "") return;

  btn.textContent = turn;
  checkWin();
  turn = turn === "X" ? "O" : "X";
}

function checkWin() {
  const winCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const b = [];
  for (let i = 1; i <= 9; i++) {
    b[i] = document.getElementById("btn" + i).textContent;
  }

  for (const [a, b1, c] of winCombos) {
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
      alert(`Sieg: ${b[a]}`);
      gameOver = true;
      if (b[a] === "X") {
        score1++;
        document.getElementById("score1").textContent = score1;
      } else {
        score2++;
        document.getElementById("score2").textContent = score2;
      }
      return;
    }
  }

  function replay() {
    board = ["", "", "", "", "", "", "", "", "", ""];
    for (let i = 1; i <= 9; i++) {
      document.getElementById("btn" + 1).textContent = "";
    }
    turn = "";
    gameOver = false;
  }

  function start() {
    replay();
    score1 = 0;
    score2 = 0;
    document.getElementById("score1").textContent = "0";
    document.getElementById("score2").textContent = "0";
  }
}
