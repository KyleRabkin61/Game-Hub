// create grid
let board;
let playerO = "O";
let playerX = "X";
let currentPlayer = true; //player) = true, playerX = false
let gameOver = false;

for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
        let tile = document.createElement("span")
        tile.classList.add("tile");
        tile.id = `${r}-${c}`

        if (c === 0 || c === 1) {
            tile.classList.add("vertical-line")
        } if (r === 0 || r === 1) {
            tile.classList.add("horizontal-line")
        }

        tile.addEventListener("click", setTile)

        document.getElementById("board").appendChild(tile);
    }
}

function setTile() {
    if (gameOver) {
        return
    }

    if (currentPlayer && this.textContent === "") {
        this.textContent = playerO;
        this.classList.add("no-pointer");
        currentPlayer = !currentPlayer;
    } else if (!currentPlayer && this.textContent === "") {
        this.textContent = playerX;
        this.classList.add("no-pointer");
        currentPlayer = !currentPlayer;
    }

    checkWinner();
}

function checkWinner() {
    // horizontal win
    for (let r = 0; r < 3; r++) {
        if (document.getElementById(`${r}-0`).textContent === document.getElementById(`${r}-1`).textContent &&
            document.getElementById(`${r}-1`).textContent === document.getElementById(`${r}-2`).textContent &&
            document.getElementById(`${r}-0`).textContent != "") {
            gameOver = true;
            winner();
            return; // stop further checking
        }
    }

    // vertical win
    for (let c = 0; c < 3; c++) {
        if (document.getElementById(`0-${c}`).textContent === document.getElementById(`1-${c}`).textContent &&
            document.getElementById(`1-${c}`).textContent === document.getElementById(`2-${c}`).textContent &&
            document.getElementById(`0-${c}`).textContent != "") {
            gameOver = true;
            winner();
            return;
        }
    }

    // diagonal win
    if (document.getElementById('0-0').textContent === document.getElementById('1-1').textContent &&
        document.getElementById('1-1').textContent === document.getElementById('2-2').textContent &&
        document.getElementById('0-0').textContent != "") {
        gameOver = true;
        winner();
        return;
    }

    if (document.getElementById('0-2').textContent === document.getElementById('1-1').textContent &&
        document.getElementById('1-1').textContent === document.getElementById('2-0').textContent &&
        document.getElementById('0-2').textContent != "") {
        gameOver = true;
        winner();
        return;
    }

    // tie check (only if game is NOT over)
    if (!gameOver) {
        let count = 0;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (document.getElementById(`${r}-${c}`).textContent !== "") {
                    count++;
                }
            }
        }

        if (count === 9) {
            gameOver = true; // prevent more moves
            document.getElementById("winner").textContent = "No winner, the game is a tie!";
            document.getElementById("playAgain").style.display = "block";
        }
    }
}


function winner() {

    currentPlayer = !currentPlayer;
    if (currentPlayer) {
        document.getElementById("winner").textContent = "Player O wins!"
    } else {
        document.getElementById("winner").textContent = "Player X wins!"
    }

    document.getElementById("playAgain").style.display = "block";
}

function playGame() {
    document.getElementById("board").style.display = "grid";
    document.getElementById("playButton").style.display = "none";
}

function playAgain() {
    gameOver = false;
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            currentPlayer = true;
            let temp = document.getElementById(`${r}-${c}`)
            temp.textContent = "";
            temp.classList.remove('no-pointer');
        }
    }
    document.getElementById("winner").textContent = "";
    document.getElementById("playAgain").style.display = "none"
}