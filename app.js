const scoreSpan = document.getElementById('score');
const guessWordDiv = document.getElementById('word');
const alphabetDiv = document.getElementById('alphabet')

const alphabet = 'abdefghijklmnopršzžtuvõäöü';
let guessedLetters = [];

for ( letter of alphabet ) {
    const letterSpan = document.createElement('span', {'id' : letter});
    letterSpan.innerText = letter.toUpperCase();

    letterSpan.addEventListener('click', e => {

        if ( !guessedLetters.includes(letter) ) {

            guessedLetters.push(letter);
            console.log(letter);
        }
        
    });

    alphabetDiv.appendChild(letterSpan);
}

let score = 10;
scoreSpan.innerText = score;

let word = 'Kuressaare Ametikool!'
let guessWord = '';

for (char of word ) {
    if ( char.topUpperCase() != char.toLowerCase() ) {
        guessWord += '_';
    } else {
        guessWord += char;
    }
}

guessWordDiv.innerText = guessWord;

  
