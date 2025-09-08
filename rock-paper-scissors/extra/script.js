/**
 * Rock Paper Scissors Game - Enhanced Version
 * Features: Score tracking, round history, retro styling, responsive design
 */

// 2: Computer choice generator with equal probability distribution
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

// 3: Human choice normalizer
function getHumanChoice(choice) {
  return choice.toLowerCase();
}

// 4: Game state variables
let humanScore = 0;
let computerScore = 0;
let roundNumber = 0; 

// Template functions for cleaner HTML generation
function createRoundHistoryHTML(round, human, computer, result) {
  return `<strong>Round ${round}:</strong> You chose <span class="choice-word">${human}</span>, Computer chose <span class="choice-word">${computer}</span> — ${result.message}`;
}

function createChoiceWordSpan(word) {
  return `<span class="choice-word">${word}</span>`;
}

// 5 and 6: Play the game
function playRound(humanChoice, computerChoice) {
  // humanChoice is already lowercase from getHumanChoice()
  
  if (humanChoice === computerChoice) {
    return { message: `It's a tie! You both chose ${createChoiceWordSpan(humanChoice)}.`, outcome: "tie" };
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    humanScore++;
    return { message: `Yay! You did it! You win, because ${createChoiceWordSpan(humanChoice)} beats ${createChoiceWordSpan(computerChoice)}.`, outcome: "win" };
  } else {
    computerScore++;
    return { message: `You didn't, cause you just lost! ${createChoiceWordSpan(computerChoice)} beats ${createChoiceWordSpan(humanChoice)}.`, outcome: "loss" };
  }
}

function handleChoice(choice) {
  const humanSelection = getHumanChoice(choice);
  const computerSelection = getComputerChoice();
  const roundResult = playRound(humanSelection, computerSelection);

  roundNumber++;
  updateUI(roundResult.message);
  addRoundHistory(roundNumber, humanSelection, computerSelection, roundResult);

  if (humanScore === 5 || computerScore === 5) {
    const winner =
      humanScore > computerScore ? "Oh wow, you win the game! You're amazing!" : "Oh no, the computer wins the game, that's no fun.";
    updateUI(winner);
    addRoundHistory("🏆", "-", "-", { message: winner, outcome: "final" });
    disableButtons();
  }
}

// Other functions for UI updates
function updateUI(message) {
  const resultEl = document.getElementById("result");
  const humanScoreEl = document.getElementById("human-score");
  const computerScoreEl = document.getElementById("computer-score");

  if (resultEl) resultEl.innerHTML = message;
  if (humanScoreEl) humanScoreEl.textContent = humanScore;
  if (computerScoreEl) computerScoreEl.textContent = computerScore;
}

function addRoundHistory(round, human, computer, result) {
  const historyList = document.getElementById("history-list");
  if (historyList) {
    const li = document.createElement("li");
    li.innerHTML = createRoundHistoryHTML(round, human, computer, result);
    li.classList.add(`history-${result.outcome}`);
    historyList.appendChild(li);
    historyList.scrollTop = historyList.scrollHeight;
  }
}

function disableButtons() {
  document.querySelectorAll(".choice-btn").forEach(btn => btn.disabled = true);
}

function restartGame() {
  humanScore = 0;
  computerScore = 0;
  roundNumber = 0;
  updateUI("Game started again, now make your move!");
  document.querySelectorAll(".choice-btn").forEach(btn => btn.disabled = false);

  const historyList = document.getElementById("history-list");
  if (historyList) historyList.innerHTML = "";
}
