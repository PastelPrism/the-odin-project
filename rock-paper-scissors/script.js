// 1: is Read only

// 2: write function for getComputerChoice
function getComputerChoice() {
  const randomNumber = Math.random();
  if (randomNumber < 0.33) {
    return "rock";
  } else if (randomNumber < 0.66) {
    return "paper";
  } else {
    return "scissors";
  }
}

// 3: write function for getHumanChoice
function getHumanChoice(choice) {
  return choice.toLowerCase();
}

// 4: Declare score variables
let humanScore = 0;
let computerScore = 0;

// 5 and 6: Play the game
function playRound(humanChoice, computerChoice) {
  humanChoice = humanChoice.toLowerCase();

  if (humanChoice === computerChoice) {
    return `Neat! It's a tie! You both chose ${humanChoice}.`;
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    humanScore++;
    return `You win! ${humanChoice} beats ${computerChoice}.`;
  } else {
    computerScore++;
    return `You lose! ${computerChoice} beats ${humanChoice}.`;
  }
}

function handleChoice(choice) {
  const humanSelection = getHumanChoice(choice);
  const computerSelection = getComputerChoice();
  const resultMessage = playRound(humanSelection, computerSelection);

  updateUI(resultMessage);

  if (humanScore === 5 || computerScore === 5) {
    const winner =
      humanScore > computerScore ? "You're the winner!" : "Oh no, you lost";
    updateUI(winner);
    disableButtons();
  }
}

// Other functions
function updateUI(message) {
  const resultEl = document.getElementById("result");
  const humanScoreEl = document.getElementById("human-score");
  const computerScoreEl = document.getElementById("computer-score");

  if (resultEl) resultEl.textContent = message;
  if (humanScoreEl) humanScoreEl.textContent = humanScore;
  if (computerScoreEl) computerScoreEl.textContent = computerScore;
}

function disableButtons() {
  document.querySelectorAll(".choice-btn").forEach(btn => btn.disabled = true);
}

function restartGame() {
  humanScore = 0;
  computerScore = 0;
  updateUI("Game restarted! You go first.");
  document.querySelectorAll(".choice-btn").forEach(btn => btn.disabled = false);
}

// Node version for testing in terminal
if (typeof window === "undefined") {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function askQuestion(round) {
    readline.question(`Round ${round} - Enter rock, paper, or scissors: `, (answer) => {
      const humanSelection = getHumanChoice(answer);
      const computerSelection = getComputerChoice();
      console.log(playRound(humanSelection, computerSelection));
      console.log(`Score: Human ${humanScore} - Computer ${computerScore}\n`);

      if (round < 5) {
        askQuestion(round + 1);
      } else {
        if (humanScore > computerScore) {
          console.log("You're the winner!");
        } else if (computerScore > humanScore) {
          console.log("Oh no, you lost");
        } else {
          console.log("It's a tie! Try again?");
        }
        readline.close();
      }
    });
  }

  askQuestion(1);
}
