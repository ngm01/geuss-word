/* eslint-disable react-hooks/exhaustive-deps */
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
      // allow for keyboard commands
      if((event.ctrlKey || event.metaKey)){
        return;
      } else {
        event.preventDefault();
        processInput(event.key);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return function cleanUp() {
      document.removeEventListener('keydown', handleKeyDown);
    }

  }, [processInput]);

  function processInput(inputKey) {
    if(utils.isAlpha(inputKey)) {
      const key = inputKey.toUpperCase();
      addLetter(key);
    }  else if(utils.isEnterOrDelete(inputKey)) {
      if(inputKey.toUpperCase() === 'BACKSPACE') {
        removeLetter();
      } else if (inputKey.toUpperCase() === 'ENTER') {
        if(guesses[progress].length < 5) {
          alert("Not enough letters")
        } else {
          if(utils.getWordFromArray(guesses[progress]) !== utils.getWordFromArray(word)) {
            if(progress < 5) {
              guessWord();
            } else {
              alert(`Sorry, you're out of guesses. The secret word was: ${utils.getWordFromArray(word)}`)
            }
          }
          if(utils.getWordFromArray(guesses[progress]) === utils.getWordFromArray(word)) {
            displaySuccess();
            window.setTimeout(function(){
              alert("You did it!");
            }, 1000)
          }
        }
      }
    } else {
      // do nothing...
    }
  }

  function addLetter(key) {
    updateGuesses(guesses.map((guess, i) => {
      if(i === progress) {
        if(guess.length < 5){
            return [...guess, {letter: key, inWord: false, inPosition: false}]
          }
      }
      return guess;
    }))
  }

  function removeLetter() {
    updateGuesses(guesses.map((guess, i) => {
      if(i === progress && guess.length > 0) {
        return guess.slice(0, guess.length - 1)
      }
      return guess;
    }))
  }

  function guessWord() {
    updateGuesses(draft => {
      let currentGuess = draft[progress];
      for(let i = 0; i < currentGuess.length; i++) {
        let letterToMatch = currentGuess[i];
        const indexOfMatch = word.findIndex(letter => letter.letter === letterToMatch.letter);  //  && letter.isFound === false
        if(indexOfMatch !== -1) {
          //setTodaysWord(wordDraft => {wordDraft[i].isFound = true});
          currentGuess[i].inWord = true;
          if(indexOfMatch === i) {
            currentGuess[i].inPosition = true;
          }
        }
      }
    })
    updateProgress(progress + 1);
  }

  function displaySuccess() {
    updateGuesses(draft => {
      let currentGuess = draft[progress];
      for(let i = 0; i < currentGuess.length; i++) {
        currentGuess[i].inWord = true;
        currentGuess[i].inPosition = true;
      }
    })
    updateProgress(progress + 1);
  }

  return (
    <div className="App"> 
      <Header />
      <Board guesses={guesses} progress={progress} />
      <Keyboard processInput={processInput} />
    </div>
  );
}

export default App;
