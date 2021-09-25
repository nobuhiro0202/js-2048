document.addEventListener("DOMContentLoaded", () => {
    const gridDisplay = document.querySelector(".grid");
    const scoreDisplay = document.getElementById("score");
    const resultDisplay = document.getElementById("result");
    const width = 4;
    let squares = [];
    scoreDisplay.innerHTML = 0;
    resultDisplay.innerHTML = "Enjoy!";
    let score = 0;
  
    // create a playing board
    function createBoard() {
      for (let i = 0; i < width * width; i++) {
        square = document.createElement("div");
        square.innerHTML = 0;
        gridDisplay.appendChild(square);
        squares.push(square);
      }
      generate();
      generate();
    }
    createBoard();
  
    //generate a number randomly
    function generate() {
      let randomNumber = Math.floor(Math.random() * squares.length);
      if (squares[randomNumber].innerHTML == 0) {
        squares[randomNumber].innerHTML = twoOrFour();
        checkForGameOver();
        tileColor(squares);
      } else generate();
    }
  
    // swipe left
    function moveLeft() {
      for (let i = 0; i < width; i++) {
        let totalOne = squares[0 + i * width].innerHTML;
        let totalTwo = squares[1 + i * width].innerHTML;
        let totalThree = squares[2 + i * width].innerHTML;
        let totalFour = squares[3 + i * width].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];
  
        let filteredRow = row.filter((num) => num);
        let missing = width - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = filteredRow.concat(zeros);
        squares[i * width].innerHTML = newRow[0];
        squares[i * width + 1].innerHTML = newRow[1];
        squares[i * width + 2].innerHTML = newRow[2];
        squares[i * width + 3].innerHTML = newRow[3];
      }
    }
  
    // swipe right
    function moveRight() {
      for (let i = 0; i < width; i++) {
        let totalOne = squares[i * width].innerHTML;
        let totalTwo = squares[1 + i * width].innerHTML;
        let totalThree = squares[2 + i * width].innerHTML;
        let totalFour = squares[3 + i * width].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];
  
        let filteredRow = row.filter((num) => num);
        let missing = width - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = zeros.concat(filteredRow);
        squares[i * width].innerHTML = newRow[0];
        squares[i * width + 1].innerHTML = newRow[1];
        squares[i * width + 2].innerHTML = newRow[2];
        squares[i * width + 3].innerHTML = newRow[3];
      }
    }
  
    // swipe up
    function moveUp() {
      for (let i = 0; i < width; i++) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + width * 1].innerHTML;
        let totalThree = squares[i + width * 2].innerHTML;
        let totalFour = squares[i + width * 3].innerHTML;
        let col = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];
  
        let filteredCol = col.filter((num) => num);
        let missing = width - filteredCol.length;
        let zeros = Array(missing).fill(0);
        let newCol = filteredCol.concat(zeros);
        squares[i].innerHTML = newCol[0];
        squares[i + width * 1].innerHTML = newCol[1];
        squares[i + width * 2].innerHTML = newCol[2];
        squares[i + width * 3].innerHTML = newCol[3];
      }
    }
  
    // swipe down
    function moveDown() {
      for (let i = 0; i < width; i++) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + width * 1].innerHTML;
        let totalThree = squares[i + width * 2].innerHTML;
        let totalFour = squares[i + width * 3].innerHTML;
        let col = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];
  
        let filteredCol = col.filter((num) => num);
        let missing = width - filteredCol.length;
        let zeros = Array(missing).fill(0);
        let newCol = zeros.concat(filteredCol);
        squares[i].innerHTML = newCol[0];
        squares[i + width * 1].innerHTML = newCol[1];
        squares[i + width * 2].innerHTML = newCol[2];
        squares[i + width * 3].innerHTML = newCol[3];
      }
    }
  
    // combine functions
    function combineLeftRow() {
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < (width - 1); j++) {
          if (squares[width * i + j].innerHTML === squares[width * i + j + 1].innerHTML) {
            let combinedTotal =
              parseInt(squares[width * i + j].innerHTML) + parseInt(squares[width * i + j + 1].innerHTML);
            squares[width * i + j].innerHTML = combinedTotal;
            squares[width * i + j + 1].innerHTML = 0;
            score += combinedTotal;
            scoreDisplay.innerHTML = score;
        }
        }
      }
    }
  
    function combineRightRow() {
      for (let i = width; i > 0; i--) {
        for (let j = 0; j < (width - 1); j++) {
          if (squares[width * i - j - 1].innerHTML === squares[width * i - j - 2].innerHTML) {
            let combinedTotal =
              parseInt(squares[width * i - j - 1].innerHTML) + parseInt(squares[width * i - j - 2].innerHTML);
            squares[width * i - j - 1].innerHTML = combinedTotal;
            squares[width * i - j - 2].innerHTML = 0;
            score += combinedTotal;
            scoreDisplay.innerHTML = score;
        }
        }
      }
    }
  
    function combineUpCol() {
      for (let i = 0; i < width * (width - 1); i++) {
        if (squares[i].innerHTML === squares[i + width].innerHTML) {
          let combinedTotal =
            parseInt(squares[i].innerHTML) +
            parseInt(squares[i + width].innerHTML);
          squares[i].innerHTML = combinedTotal;
          squares[i + width].innerHTML = 0;
          score += combinedTotal;
          scoreDisplay.innerHTML = score;
        }
      }
    }
  
    function combineDownCol() {
      for (let i = (width * width - 1); i > (width - 1); i--) {
        if (squares[i].innerHTML === squares[i - width].innerHTML) {
          let combinedTotal =
            parseInt(squares[i].innerHTML) +
            parseInt(squares[i - width].innerHTML);
          squares[i].innerHTML = combinedTotal;
          squares[i - width].innerHTML = 0;
          score += combinedTotal;
          scoreDisplay.innerHTML = score;
        }
      }
    }
  
    // assign keycodes
    function control(e) {
      if (e.keyCode === 39) {
        keyRight();
      } else if (e.keyCode === 37) {
        keyLeft();
      } else if (e.keyCode === 38) {
        keyUp();
      } else if (e.keyCode === 40) {
        keyDown();
      }
    }
    document.addEventListener("keyup", control);
  
    function keyLeft() {
      if (unableLeft()) {
        moveLeft();
        combineLeftRow();
        moveLeft();
        generate();
      }
    }
  
    function keyRight() {
      if (unableRight()) {
        moveRight();
        combineRightRow();
        moveRight();
        generate();
      }
    }
  
    function keyUp() {
      if (unableUp()){
        moveUp();
        combineUpCol();
        moveUp();
        generate();
      }
    }
  
    function keyDown() {
      if (unableDown()) {
        moveDown();
        combineDownCol();
        moveDown();
        generate();
      }
    }
  
    //check can go left
    function unableLeft() {
      let cannotMove = 0;
      for (let i = 0; i < width; i++) {
        let totalOne = squares[i * width].innerHTML;
        let totalTwo = squares[1 + i * width].innerHTML;
        let totalThree = squares[2 + i * width].innerHTML;
        let totalFour = squares[3 + i * width].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];
  
        let filteredRow = row.filter((num) => num);
        if (
          filteredRow.length == 0 ||
          (row[0] != 0 && row[1] == 0 && row[2] == 0 && row[3] == 0) ||
          (row[0] != 0 &&
            row[1] != 0 &&
            row[2] == 0 &&
            row[3] == 0 &&
            row[0] != row[1]) ||
          (row[0] != 0 &&
            row[1] != 0 &&
            row[2] != 0 &&
            row[3] == 0 &&
            row[0] != row[1] &&
            row[1] != row[2]) ||
          (row[0] != 0 &&
            row[1] != 0 &&
            row[2] != 0 &&
            row[3] != 0 &&
            row[0] != row[1] &&
            row[1] != row[2] &&
            row[2] != row[3])
        ) {
          cannotMove++;
        }
      }
      if (cannotMove == width) {
        return false;
      } else {
        return true;
      }
    }
  
    //check can go right
    function unableRight() {
      let cannotMove = 0;
      for (let i = 0; i < width; i++) {
        let totalOne = squares[i * width].innerHTML;
        let totalTwo = squares[1 + i * width].innerHTML;
        let totalThree = squares[2 + i * width].innerHTML;
        let totalFour = squares[3 + i * width].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];
  
        let filteredRow = row.filter((num) => num);
        if (
          filteredRow.length == 0 ||
          (row[0] == 0 && row[1] == 0 && row[2] == 0 && row[3] != 0) ||
          (row[0] == 0 &&
            row[1] == 0 &&
            row[2] != 0 &&
            row[3] != 0 &&
            row[2] != row[3]) ||
          (row[0] == 0 &&
            row[1] != 0 &&
            row[2] != 0 &&
            row[3] != 0 &&
            row[1] != row[2] &&
            row[2] != row[3]) ||
          (row[0] != 0 &&
            row[1] != 0 &&
            row[2] != 0 &&
            row[3] != 0 &&
            row[0] != row[1] &&
            row[1] != row[2] &&
            row[2] != row[3])
        ) {
          cannotMove++;
        }
      }
      if (cannotMove == width) {
        return false;
      } else {
        return true;
      }
    }
  
    //check can go up
    function unableUp() {
      let cannotMove = 0;
      for (let i = 0; i < width; i++) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + width * 1].innerHTML;
        let totalThree = squares[i + width * 2].innerHTML;
        let totalFour = squares[i + width * 3].innerHTML;
        let col = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];
  
        let filteredCol = col.filter((num) => num);
        if (
          filteredCol.length == 0 ||
          (col[0] != 0 && col[1] == 0 && col[2] == 0 && col[3] == 0) ||
          (col[0] != 0 &&
            col[1] != 0 &&
            col[2] == 0 &&
            col[3] == 0 &&
            col[0] != col[1]) ||
          (col[0] != 0 &&
            col[1] != 0 &&
            col[2] != 0 &&
            col[3] == 0 &&
            col[0] != col[1] &&
            col[1] != col[2]) ||
          (col[0] != 0 &&
            col[1] != 0 &&
            col[2] != 0 &&
            col[3] != 0 &&
            col[0] != col[1] &&
            col[1] != col[2] &&
            col[2] != col[3])
        ) {
          cannotMove++;
        }
      }
      if (cannotMove == width) {
        return false;
      } else {
        return true;
      }
    }
  
    // check can go down
    function unableDown() {
      let cannotMove = 0;
      for (let i = 0; i < width; i++) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + width * 1].innerHTML;
        let totalThree = squares[i + width * 2].innerHTML;
        let totalFour = squares[i + width * 3].innerHTML;
        let col = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];
  
        let filteredCol = col.filter((num) => num);
        if (
          filteredCol.length == 0 ||
          (col[0] == 0 && col[1] == 0 && col[2] == 0 && col[3] != 0) ||
          (col[0] == 0 &&
            col[1] == 0 &&
            col[2] != 0 &&
            col[3] != 0 &&
            col[2] != col[3]) ||
          (col[0] == 0 &&
            col[1] != 0 &&
            col[2] != 0 &&
            col[3] != 0 &&
            col[1] != col[2] &&
            col[2] != col[3]) ||
          (col[0] != 0 &&
            col[1] != 0 &&
            col[2] != 0 &&
            col[3] != 0 &&
            col[0] != col[1] &&
            col[1] != col[2] &&
            col[2] != col[3])
        ) {
          cannotMove++;
        }
      }
      if (cannotMove == width) {
        return false;
      } else {
        return true;
      }
    }
  
    // check if there are no zeros on the board to lose
    function checkForGameOver() {
      let zeros = 0;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML == 0) {
          zeros++;
        }
      }
  
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < (width - 1); j++) {
          if (squares[i * width + j].innerHTML == squares[i * width + j + 1].innerHTML) {
            zeros++;
          }
        }
      }
  
      for (let j = 0; j < width * (width - 1); j++) {
        if (squares[j].innerHTML === squares[j + width].innerHTML) {
          zeros++;
        }
      }
  
      if (zeros === 0) {
        resultDisplay.innerHTML = "お疲れ!!you lose...";
        document.removeEventListener("keyup", control);
      }
    }
  
    function tileColor(array) {
      array.forEach((ele) => {
        switch (parseInt(ele.innerHTML)) {
          case 0:
            ele.classList.remove(
              "two",
              "four",
              "eight",
              "sixteen",
              "threetwo",
              "sixfour",
              "onetwoeight"
            );
            ele.classList.add("zero");
            break;
          case 2:
            ele.classList.remove(
              "zero",
              "four",
              "eight",
              "sixteen",
              "threetwo",
              "sixfour",
              "onetwoeight"
            );
            ele.classList.add("two");
            break;
          case 4:
            ele.classList.remove(
              "zero",
              "two",
              "eight",
              "sixteen",
              "threetwo",
              "sixfour",
              "onetwoeight"
            );
            ele.classList.add("four");
            break;
          case 8:
            ele.classList.remove(
              "zero",
              "two",
              "four",
              "sixteen",
              "threetwo",
              "sixfour",
              "onetwoeight"
            );
            ele.classList.add("eight");
            break;
          case 16:
            ele.classList.remove(
              "zero",
              "two",
              "four",
              "eight",
              "threetwo",
              "sixfour",
              "onetwoeight"
            );
            ele.classList.add("sixteen");
            break;
          case 32:
            ele.classList.remove(
              "zero",
              "two",
              "four",
              "eight",
              "sixteen",
              "sixfour",
              "onetwoeight"
            );
            ele.classList.add("threetwo");
            break;
          case 64:
            ele.classList.remove(
              "zero",
              "two",
              "four",
              "eight",
              "sixteen",
              "threetwo",
              "onetwoeight"
            );
            ele.classList.add("sixfour");
            break;
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
            ele.classList.remove(
              "zero",
              "two",
              "four",
              "eight",
              "sixteen",
              "threetwo",
              "sixfour"
            );
            ele.classList.add("onetwoeight");
            break;
        }
      });
    }
  
    function twoOrFour() {
      let num = Math.random();
      let number = num > 0.5 ? 2 : 4;
      return number;
    }
  });
  