const scoreSpan = document.getElementById('score');
const guessedWordDiv = document.getElementById('word');
const alphabetDiv = document.getElementById('alphabet');
const resetButton = document.getElementById('reset');

let score = 10;
scoreSpan.innerText = score;

const alphabet = 'abdefghijklmnoprsšzžtuvõäöü';
let guessedLetters = [];
let guessedWord = [];

let word;

fetch('hangman.txt')
.then( res => res.text())
.then( words => {

    words = words.split(/\r?\n/);
    const i = Math.floor(Math.random() * words.length);
    word = words[i];

    for ( let char of word ) {
        if ( char.toUpperCase() != char.toLowerCase() ) {
            guessedWord.push('_');
        } else {
            guessedWord.push(char);
        }
    }

    guessedWordDiv.innerText = guessedWord.join('');

});

document.addEventListener('click', () => {
    location.reload();
});

document.addEventListener('keydown', e => {
    const keyName = e.key.toLowerCase();
    if ( alphabet.includes(keyName) ) {

        const letterSpan = document.getElementById(keyName);
        
        if ( testLetter(keyName) ) {
            letterSpan.classList.add('correct');
        } else {
            letterSpan.classList.add('incorrect');
        }

    }
});

for ( let letter of alphabet ) {
    const letterSpan = document.createElement('span');
    letterSpan.id = letter;
    letterSpan.innerText = letter.toUpperCase();
    
    letterSpan.addEventListener('click', () => {
        
        if ( testLetter(letter) ) {
            letterSpan.classList.add('correct');
        } else {
            letterSpan.classList.add('incorrect');
        }
        
    });    

    alphabetDiv.appendChild(letterSpan);
}

function testLetter ( letter ) {

    let isCorrect = false;

    if ( score && guessedWord.includes('_') ) {

        if ( !guessedLetters.includes(letter) ) {
            
            guessedLetters.push(letter);
            
            if ( word.toLowerCase().includes(letter) ) {

                for ( let i = 0; word.toLowerCase().indexOf(letter, i) != -1; i++ ) {
                    i = word.toLowerCase().indexOf(letter, i);
                    guessedWord[i] = word[i];
                }

                guessedWordDiv.innerText = guessedWord.join('').toUpperCase();

                isCorrect = true;

            } else {

                score--;
                scoreSpan.innerText = score;

                isCorrect = false;

            }

        } else {
            if ( word.toLowerCase().includes(letter) ) {
                isCorrect = true;
            }
        }

        const messageDiv = document.getElementById('message');
        
        if ( !score ) {
    
            messageDiv.innerText = 'Kaotasid! Õige sõna: ' + word;
            messageDiv.classList.add('winMessage');
            
        } else if ( !guessedWord.includes('_') ) {
            
            messageDiv.innerText = 'Võitsid mängu!';
            messageDiv.classList.add('lostMessage');
    
        }

    }

    return isCorrect;
    
}
