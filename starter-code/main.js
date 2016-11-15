// var cardOne = "queen";
// var cardTwo = "queen";
// var cardThree = "king";
// var cardFour = "king";

//Original test of JS from earlier section
/*if(cardOne===cardTwo&&cardOne==="queen"){
	alert("Match found! Two Queens!");
}else if(cardOne===cardTwo&&cardOne==="king"){
	alert("Match found! Two Kings!");
} else{
	alert("Sorry, try again!");
}*/


var buttonCreate = document.getElementById('button-create');
var buttonFlip = document.getElementById('flip-cards');
var buttonReset = document.getElementById('reset-board');
var cardNumberInput = document.getElementById('num');
var wholeContainer = document.getElementById("whole-container");
var numMatches = 0;
var numTries = 0;


//Add cards and make board after inputting number and clicking
// var createCards = function(){
// 	if(cardNumberInput.value===''){
// 		addError(cardNumberInput);
// 	} else{
// 		wholeContainer.appendChild(gameBoard);
// 		var num = document.getElementById('num').value;
// 		for(i=0; i<num; i++){
// 			var card = document.createElement('div');
// 			card.setAttribute('id',"card"+i);
// 			card.className = 'card';
// 			gameBoard.appendChild(card);
// 		}
// 	}	
// }
// buttonCreate.addEventListener('click',createCards);


//Create red border if card number not input
var addError = function(input){
	if(input.value===''){
		input.className='inputError';
		//alert("Please enter card number");
	} else{
		input.className='';
	}
}

//need to create this to add "enter" functionality
var isEnter = function(e){
	var key = e.which||e.keyCode;
	if(key===13){
		//createCards();
		createBoard();
	}
}
//anonymous function nomenclature requires you pass 'function(){func_name(input)}' for the function part
cardNumberInput.addEventListener('blur',function(){addError(cardNumberInput)});

//to add functionality of "enter"; the "keypress" passes the keystroke!!
cardNumberInput.addEventListener('keypress',isEnter);



//-------------Assignment 11 work below---------


var cards = ['queen', 'king', 'queen', 'king'];
var allCards = document.getElementsByTagName('card');

var cardsInPlay = [];

var createBoard = function(){
	var gameBoard = document.createElement('div');
	gameBoard.setAttribute('id','game-board')
	gameBoard.className="board";
	if(cardNumberInput.value===''){
		addError(cardNumberInput);
	} else{
		wholeContainer.appendChild(gameBoard);
		var num = document.getElementById('num').value;
		for(i=0; i<num; i++){
			var card = document.createElement('card');
			//for random assignment of cards
			//card.setAttribute('data-card',cards[Math.floor(Math.random()*2)]);
			card.setAttribute('data-card',cards[i]);
			card.setAttribute('id', "card"+i)
			card.className = '';
			card.addEventListener('click',showCard);
			gameBoard.appendChild(card);
		}
		num=0;
	}	
}
buttonCreate.addEventListener('click',createBoard);

var showCard = function(){
	// cardsInPlay.push(this.getAttribute('data-card'));
	// this.className = this.getAttribute('data-card');
	// if (cardsInPlay.length===2){
	// 	if(cardsInPlay[0]===cardsInPlay[1]){
	// 		alert("Match found!");
	// 		resetCards();	
	// 	} else if(cardsInPlay.length===1){
	// 		alert("No match found!");
	// 		resetCards();
	// 	}
	// }

	if(cardsInPlay.length===0){
		cardsInPlay.push(this.getAttribute('id'));
		this.className = this.getAttribute('data-card');
	} else if(cardsInPlay.length===1){
		cardsInPlay.push(this.getAttribute('id'));
		this.className = this.getAttribute('data-card');
		isMatch(cardsInPlay);
	} else if (cardsInPlay.length===2) {
		flipCards();
		cardsInPlay.push(this.getAttribute('id'));
		this.className = this.getAttribute('data-card');
	}
}

var isMatch = function(pair){
	var dataOne = document.getElementById(pair[0]).getAttribute('data-card');
	var dataTwo = document.getElementById(pair[1]).getAttribute('data-card');
	if(dataOne===dataTwo){
		alert("Match found!");
		cardsInPlay=[];
	} else{
		alert("No match found!");
		//resetCards();
	}
}

var flipCards = function(){
	document.getElementById(cardsInPlay[0]).className='';
	document.getElementById(cardsInPlay[1]).className='';
	cardsInPlay=[];
}
//buttonFlip.addEventListener('click',flipCards);

var resetBoard = function(){
	document.getElementById('game-board').remove();
	createBoard();
}
buttonReset.addEventListener('click', resetBoard);
