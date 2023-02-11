/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
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
  const [shake, setShake] = useState(false);
  const didGuess = useRef(false);
  //console.log("component is (re)rendering...");

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL)
      .then(res => res.json()).then(data => {
        setTodaysWord(data.Items[0].word.split(''));
        const storageGuesses = localStorage.getItem('guesses');
        const storageDate = localStorage.getItem('date');
        if(storageDate === null) {
          localStorage.setItem('date', data.Items[0].date);
        } else {
          //const today = new Date().toLocaleDateString('en-US', { timeZone: 'EST' })
          if(storageDate === data.Items[0].date) {
            if(storageGuesses !== null) {
              const parsedStorage = JSON.parse(storageGuesses);
              const resumeProgress = parsedStorage.reduce((acc, current) => {
                return acc + (current.length > 0 ? 1 : 0);
              }, 0)
              updateProgress(resumeProgress);
              updateGuesses(parsedStorage);
            }
          } else {
            localStorage.setItem('guesses', guesses);
            localStorage.setItem('date', data.Items[0].date);
          }
        }
      })
  }, [])

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

  // update guesses in localStorage on each re-render
  useEffect(() => {
    if(guesses[0].length > 0 && didGuess.current) {
      localStorage.setItem('guesses', JSON.stringify(guesses));
      didGuess.current = false; 
    }
  }, [guesses])

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
          setShake(true);
          window.setTimeout(function(){
            updateToast(toast => {return {...toast, show: false}})
            setShake(false);
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
      didGuess.current = true;
      updateProgress(progress + 1);
    } else {
      updateToast({message: "Not in word list", show: true})
      setShake(true)
      window.setTimeout(function(){
        updateToast(toast => {return {...toast, show: false}})
        setShake(false)
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
      <Board shake={shake} guesses={guesses} progress={progress} />
      <Keyboard processInput={processInput} />
    </div>
  );
}

export default App;
