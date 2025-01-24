const scoreSpan = document.getElementById('score');
const guessedWordDiv = document.getElementById('word');
const alphabetDiv = document.getElementById('alphabet');
 
const alphabet = 'abdefghijklmnoprsšzžtuvõäöü';
let guessedLetters = [];
let guessedWord = [];
let word = '';
let score = 10;
 
scoreSpan.innerText = score;
 
 
async function getWords() {
    const url = 'hangman.txt';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
 
        const text = await response.text();
        const words = text.split(/\r?\n/);
        return words;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}
 
async function initializeGame() {
    const words = await getWords();
 
    if (words.length === 0) {
        console.error('No words found. Check the hangman.txt file.');
        return;
    }
 
    const randomIndex = Math.floor(Math.random() * words.length);
    word = words[randomIndex];
 
    for (let char of word) {
        if (char.toUpperCase() !== char.toLowerCase()) {
            guessedWord.push('_');
        } else {
            guessedWord.push(char);
        }
    }
 
    guessedWordDiv.innerText = guessedWord.join('');
}
 
for (let letter of alphabet) {
    const letterSpan = document.createElement('span');
    letterSpan.id = letter;
    letterSpan.innerText = letter.toUpperCase();
 
    letterSpan.addEventListener('click', () => {
        if (testLetter(letter)) {
            letterSpan.classList.add('correct');
        } else {
            letterSpan.classList.add('incorrect');
        }
    });
 
    alphabetDiv.appendChild(letterSpan);
}
 
document.addEventListener('keydown', (e) => {
    const keyName = e.key.toLowerCase();
    if (alphabet.includes(keyName)) {
        const letterSpan = document.getElementById(keyName);
        if (letterSpan && !guessedLetters.includes(keyName)) {
            if (testLetter(keyName)) {
                letterSpan.classList.add('correct');
            } else {
                letterSpan.classList.add('incorrect');
            }
        }
    }
});
 
function testLetter(letter) {
    let isCorrect = false;
 
    if (score > 0 && guessedWord.includes('_')) {
        if (!guessedLetters.includes(letter)) {
            guessedLetters.push(letter);
 
            if (word.toLowerCase().includes(letter)) {
                for (let i = 0; i < word.length; i++) {
                    if (word[i].toLowerCase() === letter) {
                        guessedWord[i] = word[i];
                    }
                }
 
                guessedWordDiv.innerText = guessedWord.join('');
                isCorrect = true;
            } else {
                score--;
                scoreSpan.innerText = score;
            }
        }
 
        if (score === 0) {
            console.log('Kaotasid. Õige sõna oli:', word);
        } else if (!guessedWord.includes('_')) {
            console.log('Võit!');
        }
    }
 
    return isCorrect;
}
 
initializeGame();
