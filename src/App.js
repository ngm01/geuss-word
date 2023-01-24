/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import './App.css';
import Board from './components/Board';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import ToastMessage from './components/ToastMessage';
import utils from './utilFunctions';

function App() {

  const [word, setTodaysWord] = useImmer([]);
  const [guesses, updateGuesses] = useImmer([[], [], [], [], [], []]);
  const [progress, updateProgress] = useState(0);
  const [toast, updateToast] = useState({show: false, message: 'This is a test!'})
  //console.log("component is (re)rendering...");

  useEffect(() => {
    // stand-in for API call in prod
    utils.getTodaysWord().then(res => {
        console.log("the secret word is:", res.word);
        setTodaysWord(res.word.split(''));
    });

  }, [setTodaysWord])

  useEffect(() => {
    // set up keydown handler
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
          updateToast({message: "Not enough letters", show: true})
          window.setTimeout(function(){
            updateToast(toast => {return {...toast, show: false}})
          }, 3000)
        } else {
          if(utils.getWordFromArray(guesses[progress]) !== word.join('')) {
            if(progress < 5) {
              guessWord();
            } else {
              updateToast({message: `Sorry, you're out of guesses. The secret word was: ${word.join('')}.`, show: true})
              window.setTimeout(function(){
                updateToast(toast => {return {...toast, show: false}})
              }, 5000)
            }
          }
          if(utils.getWordFromArray(guesses[progress]) === word.join('')) {
            displaySuccess();
            updateToast({message: 'Correct!', show: true})
            window.setTimeout(function(){
              updateToast(toast => {return {...toast, show: false}})
            }, 3000)
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
    if(utils.isAllowedGuess(guesses[progress])) {
      updateGuesses(draft => {
        let letterList = [...word];
        let currentGuess = draft[progress];
        for(let i = 0; i < currentGuess.length; i++) {
          console.log("letterList:", letterList);
          let letterToMatch = currentGuess[i];
          const indexOfMatch = word.findIndex(letter => letter === letterToMatch.letter);
          if(indexOfMatch !== -1 && letterList.includes(letterToMatch.letter)) {
            currentGuess[i].inWord = true;
            if(indexOfMatch === i) {
              currentGuess[i].inPosition = true;
            }
            letterList.splice(indexOfMatch, 1);
          }
        }
      })
      updateProgress(progress + 1);
    } else {
      updateToast({message: "Not in word list", show: true})
      window.setTimeout(function(){
        updateToast(toast => {return {...toast, show: false}})
      }, 5000)
    }
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
    <div className="app">
      <ToastMessage show={toast.show} message={toast.message} /> 
      <Header />
      <Board guesses={guesses} progress={progress} />
      <Keyboard processInput={processInput} />
    </div>
  );
}

export default App;
