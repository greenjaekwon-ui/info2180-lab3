document.addEventListener("DOMContentLoaded", function () {
  // ---------- Exercise 1: layout the board ----------
  const squares = document.querySelectorAll("#board div");
  squares.forEach(function (square) {
    square.classList.add("square");
  });

  const status = document.getElementById("status");
  const newGameBtn = document.querySelector(".btn");
  const defaultMessage = status.textContent; // remember original message for reset

  // ---------- Game state ----------
  let state = Array(9).fill("");
  let currentPlayer = "X";
  let gameOver = false;

  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  function checkWinner() {
    for (const [a, b, c] of winningCombos) {
      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }
    return null;
  }

  squares.forEach(function (square, index) {
    // ---------- Exercise 2 + 6: place X/O, no overwriting ----------
    square.addEventListener("click", function () {
      if (gameOver || state[index] !== "") {
        return; // Exercise 6: ignore clicks on filled squares (or after game ends)
      }

      state[index] = currentPlayer;
      square.textContent = currentPlayer;
      square.classList.add(currentPlayer); // "X" or "O" class for colour

      // ---------- Exercise 4: check for winner ----------
      const winner = checkWinner();
      if (winner) {
        status.textContent = "Congratulations! " + winner + " is the Winner!";
        status.classList.add("you-won");
        gameOver = true;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
    });

    // ---------- Exercise 3: hover effect ----------
    square.addEventListener("mouseover", function () {
      square.classList.add("hover");
    });
    square.addEventListener("mouseout", function () {
      square.classList.remove("hover");
    });
  });

  // ---------- Exercise 5: restart the game ----------
  newGameBtn.addEventListener("click", function () {
    state = Array(9).fill("");
    currentPlayer = "X";
    gameOver = false;

    squares.forEach(function (square) {
      square.textContent = "";
      square.classList.remove("X", "O", "hover");
    });

    status.textContent = defaultMessage;
    status.classList.remove("you-won");
  });
});