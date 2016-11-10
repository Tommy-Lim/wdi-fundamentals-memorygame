var cardOne = "queen";
var cardTwo = "queen";
var cardThree = "king";
var cardFour = "king";

//Original test of JS from earlier section
/*if(cardOne===cardTwo&&cardOne==="queen"){
	alert("Match found! Two Queens!");
}else if(cardOne===cardTwo&&cardOne==="king"){
	alert("Match found! Two Kings!");
} else{
	alert("Sorry, try again!");
}*/


var buttonCreate = document.getElementById('button-create');
var cardNumberInput = document.getElementById('num');
var wholeContainer = document.getElementById("whole-container");
var gameBoard = document.createElement('div');
gameBoard.setAttribute('id','game-board')
gameBoard.className="board";

//Add cards and make board after inputting number and clicking
var createCards = function(){
	if(cardNumberInput.value===''){
		addError(cardNumberInput);
	} else{
		wholeContainer.appendChild(gameBoard);
		var num = document.getElementById('num').value;
		for(i=0; i<num; i++){
			var card = document.createElement('div');
			card.setAttribute('id',"card"+i);
			card.className = 'card';
			gameBoard.appendChild(card);
		}
	}	
}
buttonCreate.addEventListener('click',createCards);


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
		createCards();
	}
}
//anonymous function nomenclature requires you pass 'function(){func_name(input)}' for the function part
cardNumberInput.addEventListener('blur',function(){addError(cardNumberInput)});

//to add functionality of "enter"; the "keypress" passes the keystroke!!
cardNumberInput.addEventListener('keypress',isEnter);