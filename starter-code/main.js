var buttonCreate = document.getElementById('button-create');
var buttonFlip = document.getElementById('flip-cards');
var buttonReset = document.getElementById('reset-board');
var cardNumberInput = document.getElementById('num');
var wholeContainer = document.getElementById("whole-container");
var numMatches = 0;
var numTries = 0;

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


var cards = ['queen', 'king', 'queen', 'king','queen', 'king', 'queen','king'];
var allCards = document.getElementsByTagName('card');

var cardsInPlay = [];

var createBoard = function(){
	//Scoring bar creation
	var scoringBar = document.createElement('div');
	scoringBar.setAttribute('id','scoringBar');
	scoringBar.className='scoringBar';
	scoringBar.innerHTML="<matches>Matches: <div class='scores' id='matches'>0</div></matches><tries>Tries: <div class='scores' id='tries'>0</div></tries>"
	wholeContainer.appendChild(scoringBar);
	
	//Game board creation
	var gameBoard = document.createElement('div');
	gameBoard.setAttribute('id','game-board')
	gameBoard.className = "board";
	
	//Game board card creation
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
		document.getElementById(pair[0]).className=dataOne+"Matched";
		document.getElementById(pair[1]).className=dataTwo+"Matched";
		cardsInPlay=[];
		numTries++;
		numMatches++;
		document.getElementById('tries').textContent = numTries;
		document.getElementById('matches').textContent = numMatches;
	} else{
		numTries++;
		document.getElementById('tries').textContent = numTries;
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
	numTries = 0;
	numMatches = 0;
	document.getElementById('tries').textContent = numTries;
	document.getElementById('matches').textContent = numMatches;
	createBoard();
	document.getElementById('scoringBar').remove()
}
buttonReset.addEventListener('click', resetBoard);
