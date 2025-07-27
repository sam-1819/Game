const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const winSound = document.getElementById("winSound");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let running = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

cells.forEach((cell) => cell.addEventListener("click", cellClicked));
restartBtn.addEventListener("click", restartGame);

function cellClicked() {
    const index = this.dataset.index;
    if (board[index] !== "" || !running) return;
    board[index] = currentPlayer;
    this.textContent = currentPlayer;
    this.classList.add(currentPlayer);
    checkWinner();
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
        running = false;
        playWinSound();
        launchConfetti();
    } else if (!board.includes("")) {
        statusText.textContent = `🤝 It's a Draw!`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    running = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    });
}

function launchConfetti() {
    for (let i = 0; i < 35; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        document.body.appendChild(confetti);

        const size = Math.random() * 12 + 8;
        const left = Math.random() * window.innerWidth;
        const color = `hsl(${Math.random() * 360}, 100%, 60%)`;

        confetti.style.width = size + "px";
        confetti.style.height = size + "px";
        confetti.style.left = left + "px";
        confetti.style.bottom = "0px";
        confetti.style.backgroundColor = color;

        setTimeout(() => {
            confetti.remove();
        }, 2000);
    }
}

function playWinSound() {
    winSound.currentTime = 0;
    winSound.play();
}