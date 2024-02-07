// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};



function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

 function transform(oldPointStructure) {
   let newPointStruct={};
   let newKey = "";
   
   for (const key in oldPointStructure) {     
       
       for(let i=0;i< oldPointStructure[key].length;i++){   
         newKey = oldPointStructure[key][i];          
         
         newPointStruct[newKey.toLowerCase()] =  Number(key);         
         
       }     
   }  
   
   return newPointStruct;
};

let newPointStructure = transform(oldPointStructure);
//Bonus Mission 2
newPointStructure[' ']=0;

//Bonus Mission-functions to check special characters and numbers in string
function containsSplChars(string){
   const specialChars = "~`!#$%^&*+=-[]\\\';,/{}|\":<>?";
   for(i = 0; i < specialChars.length;i++){
     if(string.indexOf(specialChars[i]) > -1){
         return true;
      }
   }
   return false;
  }

function containsNumber(str){   
   return /\d/.test(str);
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let word= "";
function initialPrompt() {
   word = input.question("Let's play some scrabble!\nEnter a word: ");
   //Bonus Mission
   while(containsSplChars(word) || containsNumber(word)){
    word = input.question("Enter valid word with only letters: ");
   }
  return word;
};




let simpleScorer = function(word){   
  	return word.length;
}

let vowelBonusScorer= function(word){
   let vowels = ['A','E','I','O','U'];
   word = word.toUpperCase();
   let letterPoints=0;

   for (let i = 0; i < word.length; i++) {
      if(vowels.includes(word[i])){
         letterPoints += 3;
      }else{
         letterPoints += 1;
      }        
    }  
    return letterPoints;
}

let scrabbleScorer = function(word){
   word = word.toLowerCase();
	let letterPoints = 0;
   
	for (let i = 0; i < word.length; i++) {  
      
		 if (word[i] in newPointStructure) {
			letterPoints += newPointStructure[word[i]];
		 }  
	}  
   
	return letterPoints;
}

const scoringAlgorithms = [
   {
      name:"Simple Score",
      description: "Each letter is worth 1 point",
      scorerFunction: simpleScorer
   },
   {
      name:"Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt",
      scorerFunction: vowelBonusScorer
   },
   {
      name:"Scrabble",
      description: "The traditional scoring algorithm",
      scorerFunction: scrabbleScorer
   }];

   
function scorerPrompt() {
  
   console.log(`\nWhich scoring algorithm would you like to use?\n`);

   for(let i=0;i<scoringAlgorithms.length;i++){
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
   }
   let scoringOption = input.question(`Enter 0, 1, or 2: `);
   while(scoringOption.match(/[A-Za-z]/) || scoringOption <0 || scoringOption >2 || containsSplChars(scoringOption)){
      scoringOption = input.question(`Enter valid scoring alogorithm option:`);
   }
   
   console.log(`Score for '${word}': ${scoringAlgorithms[scoringOption].scorerFunction(word)}`)
   
}







function runProgram() {
   initialPrompt();
   scorerPrompt();
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
