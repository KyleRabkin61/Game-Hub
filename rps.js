let rock = {
    name: "Rock",
    active: false
};

let paper = {
    name: "Paper",
    active: false
};

let scissors = {
    name: "Scissors",
    active: false
};

let playerScore = 0;
let compScore = 0;
let round = 1;

function playGame() {
    document.getElementById('game').style.display = 'flex';
    document.getElementById('scoreboard').style.display = 'flex';
    document.getElementById('playButton').style.display = 'none';
}

function playRock() {
    rock.active = true;
    paper.active = false;
    scissors.active = false;

    document.querySelectorAll('.player-choice img').forEach(img => {
        img.classList.remove('active-choice');
    });

    document.getElementById('rock').classList.add('active-choice');

    document.getElementById('weapon').textContent = 'You chose Rock.';
}

function playPaper() {
    paper.active = true;
    rock.active = false;
    scissors.active = false;

    document.querySelectorAll('.player-choice img').forEach(img => {
        img.classList.remove('active-choice');
    });

    document.getElementById('paper').classList.add('active-choice');

    document.getElementById('weapon').textContent = 'You chose Paper.';
}

function playScissors() {
    scissors.active = true;
    rock.active = false;
    paper.active = false;

    document.querySelectorAll('.player-choice img').forEach(img => {
        img.classList.remove('active-choice');
    });

    document.getElementById('scissors').classList.add('active-choice');

    document.getElementById('weapon').textContent = 'You chose Scissors.';
}

function computerChoice() {
    let randomNumber = Math.floor(Math.random() * 3);

    if (randomNumber === 0) {
        return "Rock";
    } else if (randomNumber === 1) {
        return "Paper";
    } else {
        return "Scissors";
    }
}

function lockIn() {
    let playerChoice;

    if (rock.active) {
        playerChoice = rock.name;
    }

    if (paper.active) {
        playerChoice = paper.name;
    }

    if (scissors.active) {
        playerChoice = scissors.name;
    }

    if (!playerChoice) {
        document.getElementById('compChoiceImg').src = "";
        document.getElementById('result').innerHTML = "You did not make a choice, please choose rock, paper, or scissors";
        return;
    }

    let compChoice = computerChoice();
    document.getElementById('compChoiceImg').style.opacity = 1;
    document.getElementById('compChoiceImg').src = `rps-img/${compChoice.toLowerCase()}.png`;

    let winMsgs = [
        `You chose ${playerChoice}, the computer chose ${compChoice}. You win this round!`,
        `Victory! Your ${playerChoice} beats the computer's ${compChoice}.`,
        `Congrats! ${playerChoice} defeats ${compChoice} — you take the win!`
    ];

    let loseMsgs = [
        `You chose ${playerChoice}, the computer chose ${compChoice}. You lose this round.`,
        `Oh no! ${compChoice} beats your ${playerChoice}.`,
        `Defeat! Your ${playerChoice} couldn’t beat ${compChoice}.`
    ];

    let tieMsgs = [
        `You both chose ${playerChoice}. It’s a tie!`,
        `Stalemate! ${playerChoice} equals ${compChoice}.`,
        `Draw! Neither wins as you picked ${playerChoice} and the computer picked ${compChoice}.`
    ];

    let randomNumMsg = Math.floor(Math.random() * 3);

    if ((playerChoice === "Rock" && compChoice === "Scissors") ||
        (playerChoice === "Scissors" && compChoice === "Paper") ||
        (playerChoice === "Paper" && compChoice === "Rock")) {

        document.getElementById('result').innerHTML = winMsgs[randomNumMsg];
        playerScore++;
        document.getElementById('playerCounterText').innerHTML = `Player Score:<br>${playerScore}`;
        round++;
        document.getElementById('roundText').textContent = `Round: ${round}`;

    } else if ((playerChoice === "Rock" && compChoice === "Paper") ||
               (playerChoice === "Paper" && compChoice === "Scissors") ||
               (playerChoice === "Scissors" && compChoice === "Rock")) {

        document.getElementById('result').innerHTML = loseMsgs[randomNumMsg];
        compScore++;
        document.getElementById('compCounterText').innerHTML = `Computer Score:<br>${compScore}`;
        round++;
        document.getElementById('roundText').textContent = `Round: ${round}`;

    } else if (playerChoice === compChoice) {
        document.getElementById('result').innerHTML = tieMsgs[randomNumMsg];
        round++;
        document.getElementById('roundText').textContent = `Round: ${round}`;
    }

    document.getElementById('weapon').textContent = 'Choose Your Weapon.';

    endGame();

    // reset choices
    rock.active = false;
    paper.active = false;
    scissors.active = false;

    document.querySelectorAll('.player-choice img').forEach(img => {
        img.classList.remove('active-choice');
    });
}

function endGame() {
    if (playerScore === 3 || compScore === 3) {
        if (playerScore > compScore) {
            document.getElementById('endResult').textContent = `The final score is ${playerScore} - ${compScore}, you win! Play again?`;
        } else {
            document.getElementById('endResult').textContent = `The final score is ${playerScore} - ${compScore}, you lose! Play again?`;
        }

        document.getElementById('playerChoiceSection').style.display = "none";
        document.getElementById('computerChoiceRow').style.display = "none";
        document.getElementById('lockIn').style.display = "none";
        document.getElementById('playAgain').style.display = "block";
    }
}

function reset() {
    playerScore = 0;
    compScore = 0;
    round = 1;

    document.getElementById('playerCounterText').innerHTML = `Player Score:<br>${playerScore}`;
    document.getElementById('compCounterText').innerHTML = `Computer Score:<br>${compScore}`;
    document.getElementById('roundText').textContent = `Round: ${round}`;

    document.getElementById('playerChoiceSection').style.display = "flex";
    document.getElementById('computerChoiceRow').style.display = "flex";
    document.getElementById('weapon').textContent = 'Choose Your Weapon.';
    document.getElementById('lockIn').style.display = "block";
    document.getElementById('playAgain').style.display = "none";

    document.getElementById('endResult').textContent = "";
    document.getElementById('compChoiceImg').style.opacity = 0;
    document.getElementById('compChoiceImg').src = "rps-img/rock.png";image
}
