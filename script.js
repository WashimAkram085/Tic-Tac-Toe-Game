let  playerO = prompt("Please Enter your name playerO.");
let  playerX = prompt("Please Enter your name playerX.");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-game");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");

let turnO = true; //PlayerX, PlayerO
let count = 0;

const winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

const gameReset = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    playerO = prompt("Please Enter your name playerO.");
    playerX = prompt("Please Enter your name playerX.");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O"
            turnO = false;
        }
        else {
            box.innerText = "X"
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            DrawMatch();
        }
    });
});
const enableBoxes = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
const disableBoxes = () => {
    for (box of boxes) {
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    let name = "";
    if (winner === "O") {
        name = playerO;
    } else {
        name = playerX;
    }
    msg.innerText = `Congratulations!! The Winner is ${name}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const DrawMatch = () => {
    msg.innerText = "DRAW!! Please Start a NEW GAME.";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winningPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                //console.log("Winner is ",pos1);
                showWinner(pos1);
                if (count >= 9) {
                    DrawMatch();
                }
            }
        }
    }
}

newGameBtn.addEventListener("click", gameReset);
resetBtn.addEventListener("click", gameReset);
