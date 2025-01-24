const scoreSpan = document.getElementById('score');
const guessedWordDiv = document.getElementById('word');
const alphabetDiv = document.getElementById('alphabet');

const alphabet = 'abdefghijklmnoprsšzžtuvõäöü';
let guessedLetters = [];

let score = 10;
scoreSpan.innerText = score;

let word = 'Kuressaare Ametikool!';
let guessedWord = [];

for ( let char of word ) {
    if ( char.toUpperCase() != char.toLowerCase() ) {
        guessedWord.push('_');
    } else {
        guessedWord.push(char);
    }
}

guessedWordDiv.innerText = guessedWord.join('');

for ( let letter of alphabet ) {
    const letterSpan = document.createElement('span', {'id': letter});
    letterSpan.innerText = letter.toUpperCase();
    
    
    letterSpan.addEventListener('click', e => {
        
        if ( score && guessedWord.includes('_') ) {

            if ( !guessedLetters.includes(letter) ) {
                
                guessedLetters.push(letter);
                
                if ( word.toLowerCase().includes(letter) ) {
    
                    for ( let i = 0; word.toLowerCase().indexOf(letter, i) != -1; i++ ) {
                        i = word.toLowerCase().indexOf(letter, i);
                        guessedWord[i] = word[i];
                    }
    
                    guessedWordDiv.innerText = guessedWord.join('');
    
                    letterSpan.classList.add('correct');
    
                } else {
    
                    score--;
                    scoreSpan.innerText = score;
    
                    letterSpan.classList.add('incorrect');
                    
                }
    
            }

            if ( !score ) {
        
                console.log('Kaotasid, õige sõna:', word);
                
            } else if ( !guessedWord.includes('_') ) {
        
                console.log('Võitsid mängu!');
        
            }

        }     
        
    });    

    alphabetDiv.appendChild(letterSpan);
}
