import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import './App.css';
import Board from './components/Board';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import utils from './utilFunctions';

function App() {

  const [word, setTodaysWord] = useImmer([]);
  const [guesses, updateGuesses] = useImmer([[], [], [], [], [], []]);
  const [progress, updateProgress] = useState(0);
  console.log("component is (re)rendering...");

  useEffect(() => {
    // stand-in for API call in prod
    utils.getTodaysWord().then(res => {
        console.log("the secret word is:", res.word);
        let wordArray = res.word.split('').map(letter => {
          return {letter: letter, isFound: false}
        })
        setTodaysWord(wordArray);
    });

  }, [setTodaysWord])

  useEffect(() => {
    function handleKeyDown(event) {
      if(utils.isAlpha(event.key)) {
        console.log("running handleKeyDown...")
        event.preventDefault();
        const key = event.key.toUpperCase();
        updateGuesses(guesses.map((guess, i) => {
          console.log("updating guesses. key:", key)
          if(i === progress) {
            if(guess.length < 5){
                return [...guess, {letter: key, inWord: false, inPosition: false}]
              }
          }
          return guess;
        }))
      }  else if(utils.isEnterOrDelete(event.key)) {
        event.preventDefault();
        if(event.key.toUpperCase() === 'BACKSPACE') {
          updateGuesses(guesses.map((guess, i) => {
            if(i === progress && guess.length > 0) {
              return guess.slice(0, guess.length - 1)
            }
            return guess;
          }))
        } else if (event.key.toUpperCase() === 'ENTER') {
          if(guesses[progress].length < 5) {
            alert("Not enough letters")
          } else {
            if(utils.getWordFromArray(guesses[progress]) !== utils.getWordFromArray(word)) {
              if(progress < 5) {
                alert("WRONG, GUESS AGAIN");
                let reviewedGuesses = guesses.map((guess, index) => {
                  if(index === progress) {
                    guess.forEach((guessLetter, guessLetterIdx) => {
                    const letterToMatch = guessLetter.letter;
                    const indexOfWordLetter = word.findIndex(letter => letter.letter === letterToMatch && letter.isFound === false);
                    if(indexOfWordLetter !== -1) {
                      if(guessLetterIdx === indexOfWordLetter) {
                        return {
                          ...guessLetter,
                          inWord: true,
                          inPosition: true
                        }
                      } else {
                        return {
                          ...guessLetter,
                          inWord: true
                        }
                      }
                    }	
                    return guess;
                    })
                  }	
                })
                updateProgress(progress + 1);
              } else {
                alert(`Sorry, you're out of guesses. The secret word was: ${utils.getWordFromArray(word)}`)
                console.log("The secret word was:", utils.getWordFromArray(word))
              }
            }
            if(utils.getWordFromArray(guesses[progress]) === utils.getWordFromArray(word)) {
              alert("You did it!");
            }
          }
        }
      } else {
        // do nothing...
      }
    }
    console.log("adding event listener...")
    document.addEventListener('keydown', handleKeyDown);

    return function cleanUp() {
      console.log("cleaning up...")
      document.removeEventListener('keydown', handleKeyDown);
    }

  }, [guesses, updateGuesses, progress, word]);


  return (
    <div className="App"> 
      <Header />
      <Board guesses={guesses} />
      <Keyboard />
    </div>
  );
}

export default App;
