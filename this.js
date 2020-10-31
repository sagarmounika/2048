document.addEventListener('DOMContentLoaded', () =>  {
  const gridDisplay = document.querySelector(".grid");
  const resultDisplay = document.querySelector(".result");
  const scoreDisplay = document.querySelector("#score-value");
  const width=4;
  let score = 0;
  let squares=[];
  function createBoard(){
    for(let i=0; i < width*width; i++){
     square = document.createElement("div");
    square.innerHTML = 0;
    gridDisplay.appendChild(square);
    squares.push(square);
    
  }
  generate();
  generate();
  
}
createBoard();
// Function to generate random square to start with number 2
function generate(){
let randomGenerator =Math.floor(Math.random() * squares.length);

if(squares[randomGenerator].innerHTML == 0){
squares[randomGenerator].innerHTML = 2;
iflost();
}else generate();
}

// Right swipe

function rightSwipe(){
  for(let i=0;i<16;i++){
    if(i % 4 === 0){
      let rowOne = squares[i].innerHTML;
      let rowTwo = squares[i+1].innerHTML;
      let rowThree = squares[i+2].innerHTML;
      let rowFour= squares[i+3].innerHTML;
      let Allrows = [parseInt(rowOne),parseInt(rowTwo),parseInt(rowThree),parseInt(rowFour)];
      const nonZeros = Allrows.filter(num=>num);
      let missing = 4 - nonZeros.length; 
      let zerosRow = Array(missing).fill(0);
      let newRow = zerosRow.concat(nonZeros);
      squares[i].innerHTML = newRow[0];
      squares[i+1].innerHTML = newRow[1];
      squares[i+2].innerHTML = newRow[2];
      squares[i+3].innerHTML = newRow[3];
    }
  }  
}


// Left swipe

function leftSwipe(){
  for(let i=0;i<16;i++){
    if(i % 4 === 0){
      let rowOne = squares[i].innerHTML;
      let rowTwo = squares[i+1].innerHTML;
      let rowThree = squares[i+2].innerHTML;
      let rowFour= squares[i+3].innerHTML;
      let Allrows = [parseInt(rowOne),parseInt(rowTwo),parseInt(rowThree),parseInt(rowFour)];
      const nonZeros = Allrows.filter(num=>num);
      let missing = 4 - nonZeros.length; 
      let zerosRow = Array(missing).fill(0);
      let newRow = nonZeros.concat(zerosRow);
      squares[i].innerHTML = newRow[0];
      squares[i+1].innerHTML = newRow[1];
      squares[i+2].innerHTML = newRow[2];
      squares[i+3].innerHTML = newRow[3];
    }
  }  
}

// swipe Up

function swipeUp() {
  for(let i=0; i<4; i++){
    let columnOne =squares[i].innerHTML;
    let columnTwo =squares[i+width].innerHTML;
    let columnThree =squares[i+(width*2)].innerHTML;
    let columnFour =squares[i+(width*3)].innerHTML;
    let allColumns = [parseInt(columnOne),parseInt(columnTwo),parseInt(columnThree),parseInt(columnFour)];
    let nonZeros = allColumns.filter(num=>num);
    let missing= 4- nonZeros.length;
    let zeros =Array(missing).fill(0);
    let newColumns = nonZeros.concat(zeros);
    squares[i].innerHTML=newColumns[0];
    squares[i+width].innerHTML=newColumns[1];
    squares[i+(width*2)].innerHTML=newColumns[2];
    squares[i+(width*3)].innerHTML=newColumns[3];

  }
}

// swipe Up

function swipeDown() {
  for(let i=0; i<4; i++){
    let columnOne =squares[i].innerHTML;
    let columnTwo =squares[i+width].innerHTML;
    let columnThree =squares[i+(width*2)].innerHTML;
    let columnFour =squares[i+(width*3)].innerHTML;
    let allColumns = [parseInt(columnOne),parseInt(columnTwo),parseInt(columnThree),parseInt(columnFour)];
    let nonZeros = allColumns.filter(num=>num);
    let missing= 4- nonZeros.length;
    let zeros =Array(missing).fill(0);
    let newColumns = zeros.concat(nonZeros);
    squares[i].innerHTML=newColumns[0];
    squares[i+width].innerHTML=newColumns[1];
    squares[i+(width*2)].innerHTML=newColumns[2];
    squares[i+(width*3)].innerHTML=newColumns[3];

  }
}


// Combining Row Function
function combineRow(){
  for(let i=0; i<15 ;i++){
    if(squares[i].innerHTML === squares[i+1].innerHTML) {
     let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
      squares[i].innerHTML = combinedTotal;
      squares[i+1].innerHTML = 0; 
      score+=combinedTotal;
      scoreDisplay.innerHTML=score;
    }
  }
  ifWon();
}

// Combining Column Function
function combineColumn(){
  for(let i=0; i<12 ;i++){
    if(squares[i].innerHTML === squares[i+width].innerHTML) {
     let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML);
      squares[i].innerHTML = combinedTotal;
      squares[i+width].innerHTML = 0; 
      score+=combinedTotal;
      scoreDisplay.innerHTML=score;
    }
  }
  ifWon();
}
document.addEventListener('keyup', control);
// keycodes
function control(e){
  if(e.keyCode === 37){
    keyLeft();
  }else if (e.keyCode === 39){
    keyRight();
  }else if (e.keyCode === 38){
    keyUp();
}else if (e.keyCode === 40){
  keyDown();
}
}


function keyLeft(){
  leftSwipe();
  combineRow();
  leftSwipe();
  generate();
}
function keyRight() {
  rightSwipe();
  combineRow();
  rightSwipe();
  generate();
}
function keyUp() {
  swipeUp();
  combineColumn();
  swipeUp();
  generate();
}
function keyDown() {
  swipeDown();
  combineColumn();
  swipeDown();
  generate();
}

// function to check if we window
function ifWon(){
  for(let i=0; i<squares.length;  i++){
    if(squares[i].innerHTML == 2048){
      swal({
        title: "You won!",
        icon: "success",
       
      })
      
      document.removeEventListener('keyup', control);
    }
  }
}

//function to check if you lose
function iflost(){
   let zeros =0;
  for(let i=0; i<squares.length; i++) {
   
    if(squares[i].innerHTML == 0){
      zeros++;
    }

  }
  if(zeros === 0){
    swal({
      title: "Game Over",
      text: "You Lose!",
      icon: "error",
    })
    document.removeEventListener('keyup',control);
  }
}


})



