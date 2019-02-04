/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let moveCount = 0;

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = +this.getAttribute("rowIdx");
    var colIdx = +this.getAttribute("colIdx");
    let newValue = 1;
	if(checkGrid(rowIdx,colIdx)){
		grid[colIdx][rowIdx] = newValue;
		renderMainGrid();
		addClickHandlers();
		turn = 'O';
		moveCount +=1;
		if(checkPlayerWin()){
			alert( "Winner is Player" );
			location.reload();
			return;
		}else if(drawCheck()){
			alert("Aw, Snap! it's a draw :( ");
			location.reload();
			return;
		}
		computer();
	} 
	else {
		alert('click some other box');
	}
    
}

function computer(){
	while(true && moveCount !== 9){
		var row = Math.floor((Math.random() * 3));
		var col = Math.floor((Math.random() * 3));
		turn = 'X';
		if(checkGrid(row,col)){
			moveCount +=1;
			computerMove(row,col);
			if(checkComputerWin()){
				alert( "Winner is Computer" );
				location.reload();
				return;
			}
			break;
		}
	}
}

function checkGrid(row,col){
	
	let x = +grid[col][row];
	
	return  x === 0;
}

function computerMove(row,col){
	grid[col][row]= 2;
	renderMainGrid();
	addClickHandlers();
}

function drawCheck()
{
  if(moveCount == 9)
  { 
    return true;
  }
  return false;
}

function checkPlayerWin(){
	if((grid[0][0] === 1 && grid[0][1] === 1 && grid[0][2] === 1 && grid[0][0] !== 0) || 
		(grid[0][0] === 1 && grid[1][0] === 1 && grid[2][0] === 1 && grid[0][0] !== 0) ||
		(grid[2][0] === 1 && grid[2][1] === 1 && grid[2][2] === 1 && grid[2][0] !== 0) ||
		(grid[0][2] === 1 && grid[1][2] === 1 && grid[2][2] === 1 && grid[0][2] !== 0) ||
		(grid[1][0] === 1 && grid[1][1] === 1 && grid[1][2] === 1 && grid[1][0] !== 0) ||
		(grid[0][1] === 1 && grid[1][1] === 1 && grid[2][1] === 1 && grid[0][1] !== 0) ||
		(grid[0][0] === 1 && grid[1][1] === 1 && grid[2][2] === 1 && grid[0][0] !== 0) ||
		(grid[0][2] === 1 && grid[1][1] === 1 && grid[2][0] === 1 && grid[0][2] !== 0)){
		return true;
	}else{
		return false;
	}
}

function checkComputerWin(){
	if((grid[0][0] === 2 && grid[0][1] === 2 && grid[0][2] === 2 && grid[0][0] !== 0) || 
		(grid[0][0] === 2 && grid[1][0] === 2 && grid[2][0] === 2 && grid[0][0] !== 0) ||
		(grid[2][0] === 2 && grid[2][1] === 2 && grid[2][2] === 2 && grid[2][0] !== 0) ||
		(grid[0][2] === 2 && grid[1][2] === 2 && grid[2][2] === 2 && grid[0][2] !== 0) ||
		(grid[1][0] === 2 && grid[1][1] === 2 && grid[1][2] === 2 && grid[1][0] !== 0) ||
		(grid[0][1] === 2 && grid[1][1] === 2 && grid[2][1] === 2 && grid[0][1] !== 0) ||
		(grid[0][0] === 2 && grid[1][1] === 2 && grid[2][2] === 2 && grid[0][0] !== 0) ||
		(grid[0][2] === 2 && grid[1][1] === 2 && grid[2][0] === 2 && grid[0][2] !== 0)){
		return true;
	}else{
		return false;
	}
}


function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();