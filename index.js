//********************************* REFERENCIAS *********************************//

let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box"));
let muestraGanador = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);
//********************************* VARIABLES *********************************//
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;

let espacio = Array(9).fill(null);
const comboGanador = [
  [0, 1, 2],
  [0, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//********************************* FUNCIONES *********************************//
function startGame() {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
}

function boxClicked(e) {
  const id = e.target.id;
  if (!espacio[id]) {
    espacio[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    if (playerWin !== false) {
      playerText = `${currentPlayer} ha ganado!`;
      let winning_block = playerWin();
      console.log(winning_block);
      winning_block.map(
        (box) => (boxes[box].style.backgroundColor = muestraGanador)
      );
    }
  }
}

function playerWin() {
  for (const condicion of comboGanador) {
    let [a, b, c] = condicion;
    if (espacio[a] && espacio[a] == espacio[b] && espacio[a] == espacio[c]) {
      return [a, b, c];
    }
  }
  return false;
}

function restart() {
  espacio.fill(null);
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });
  playerText = "TA TE TI";
  currentPlayer = X_TEXT;
}
restartBtn.addEventListener("click", restart);
startGame();
