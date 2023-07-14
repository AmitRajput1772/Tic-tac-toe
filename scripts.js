const gameInfo = document.querySelector(".game-Info");
const newGameBtn = document.querySelector(".btn");
const boxes = document.querySelectorAll(".box");

let currentPlayer ="X";
let gameGrid;
const winningPositions =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

// let's create a function to initialize the game
function initGame() {
    currentPlayer ="X";
    gameGrid =["","","","","","","","",""];
    // UI par empty karna padega
    boxes.forEach((box,index) => {
        // box ke andar ki values remove ki
        box.innerText ="";
        boxes[index].style.pointerEvents ="all";
        // green color bhi remove karo
        box.classList =`box box${index }`;

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText =`Current player - ${currentPlayer}`;
}
initGame();


function swap() {
    if(currentPlayer ==="X") {
        currentPlayer="O";
        gameInfo.innerText =`Current player - ${currentPlayer}`;
    }
    else {
        currentPlayer = "X";
        gameInfo.innerText =`Current player - ${currentPlayer}`;

    }
}
function checkGameOver() {

    let answer = "";

    winningPositions.forEach((position) => {
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }
            else{
                answer ="O";
            }
            console.log(position[0]);

            // backgroung should be green for winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // winner mil gaya
    if(answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        
        boxes.forEach((box,index) => {
            boxes[index].style.pointerEvents = "none";
        })
        return;
    }

    let fillCount=0;
    gameGrid.forEach((space) => {
        if(space !== "")
            fillCount++;
    });

    if(fillCount === 9){
        gameInfo.innerText ="Game Tied !";
        newGameBtn.classList.add("active");
    }

}
function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents ="none";
        // swap karo turn ko
        swap();
        // check if game is over or not
        checkGameOver();
    }
}
boxes.forEach((box,index) =>{
    box.addEventListener("click", () => {
        handleClick(index);
    });
});
newGameBtn.addEventListener("click" ,() => {
    initGame();
});

