const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

numAttempts = 0;

const checkGuess = (num) => {
  if (num > secretNumber) {
    if (numAttempts > 1) {
      console.log("Too High!");
    }
    return false;
  }
  if (num < secretNumber) {
    if (numAttempts > 1) {
      console.log("Too Low!");
    }
    return false;
  }
  if (num === secretNumber) {
    console.log("Correct!");
    return true;
  }
};

const askGuess = () => {
  if (numAttempts == 0) {
    console.log("You lose!");
    rl.close();
  } else {
    rl.question("Enter a guess:", (answer) => {
      if (checkGuess(Number(answer))) {
        console.log("You win!");
        rl.close();
      } else {
        numAttempts--;
        askGuess();
      }
    });
  }
};

const randomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const askRange = () => {
  let minNum = 0;
  let maxNum = 0;

  rl.question("Enter a min number:", (answer) => {
    minNum += Number(answer);

    rl.question("Enter a max number:", (answer) => {
      maxNum += Number(answer);
      console.log(`I'm thinking of a number between ${minNum} and ${maxNum}`);
      secretNumber = randomInRange(minNum, maxNum);
      askGuess();
    });
  });
};

const askLimit = () => {
  rl.question("Enter a limit:", (answer) => {
    if (answer > 0 && answer <= 10) {
      numAttempts = Number(answer);
      askRange();
    } else {
      console.log("Attempts must be between 1 and 10");
    }
  });
};

askLimit();
