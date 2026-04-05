// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let levels = document.querySelector(".levels");
let easyLvl = document.querySelector(".easy");
let normalLvl = document.querySelector(".normal");
let hardLvl = document.querySelector(".hard");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// Setting Levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// Defult Level
let defultLevelName = "Easy";
let defultLevelSeconds = lvls[defultLevelName];

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("easy")) {
    defultLevelName = "Easy";
  } else if (e.target.classList.contains("normal")) {
    defultLevelName = "Normal";
  } else if (e.target.classList.contains("hard")) {
    defultLevelName = "Hard";
  }

  defultLevelSeconds = lvls[defultLevelName];

  lvlNameSpan.innerHTML = defultLevelName;
  secondsSpan.innerHTML = defultLevelSeconds;
  timeLeftSpan.innerHTML = defultLevelSeconds;
});

// Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML = defultLevelName;
secondsSpan.innerHTML = defultLevelSeconds;
timeLeftSpan.innerHTML = defultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disabled Paste Event
input.onpaste = function () {
  return false;
};

// Disabled Drop Event
input.addEventListener("drop", (e) => e.preventDefault());
input.addEventListener("drag", (e) => e.preventDefault());

// Start Game
startButton.onclick = function () {
  this.remove();
  input.focus();
  levels.remove();
  // Generate Word Function
  genWords();
};

function genWords() {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get Word Index
  let wordIndex = words.indexOf(randomWord);
  // Remove Word From Array
  words.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWords.innerHTML = "";
  // Generate Words
  for (let i = 0; i < words.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let text = document.createTextNode(words[i]);
    div.appendChild(text);
    upcomingWords.appendChild(div);
  }
  // Call Strat Play Function
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty Input Field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congratz");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}
