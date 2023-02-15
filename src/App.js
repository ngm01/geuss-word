/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import { useImmer } from 'use-immer';
import './App.css';
import Board from './components/Board';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import ToastMessage from './components/ToastMessage';
import keysDictionary from './keys.json';
import utils from './utilFunctions';

function App() {

  const [word, setTodaysWord] = useImmer([]);
  /*
    'guesses' is an array of 'guess' arrays, each 'guess' array corresponding to a row on the board
    objects in this array correspond to letters in the row:
    {
      letter: 'A',
      inWord: false,
      inPosition: false
    }
    when user hits enter to guess the word, letters are eval'd based on whether they are in the word,
    and if so whether they are in the correct position
    logic for this is in guessWord() function below
  */
  const [guesses, updateGuesses] = useImmer([[], [], [], [], [], []]);
  const [keys, updateKeys] = useImmer(keysDictionary);
  const [progress, updateProgress] = useState(0);
  const [toast, updateToast] = useState({show: false, message: 'This is a test!'})
  const [shake, setShake] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const didGuess = useRef(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL)
      .then(res => res.json()).then(data => {
        setTodaysWord(data.Items[0].word.split(''));
        const storageGuesses = localStorage.getItem('guesses');
        const storageDate = localStorage.getItem('date');
        const storageKeys = localStorage.getItem('keys');
        if(storageDate === null) {
          localStorage.setItem('date', data.Items[0].date);
        } else {
          if(storageDate === data.Items[0].date) {
            if(storageGuesses !== null) {
              const parsedGuesses = JSON.parse(storageGuesses);
              const parsedKeys = JSON.parse(storageKeys);
              // get current guess attempt from stored guesses
              const resumeProgress = parsedGuesses.findLastIndex(g => g.length > 0) + 1;
              // is the current guess the solution? (solution will have all letters marked 'inPosition')
              const solved = (parsedGuesses[resumeProgress - 1].filter(g => !g.inPosition).length === 0);
              updateProgress(resumeProgress);
              updateGuesses(parsedGuesses);
              updateKeys(parsedKeys);
              setIsSolved(solved);
            }
          } else {
            localStorage.setItem('guesses', JSON.stringify(guesses));
            localStorage.setItem('keys', JSON.stringify(keys));
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

  // update guesses, keys in localStorage on each re-render
  useEffect(() => {
    if(guesses[0].length > 0 && didGuess.current) {
      localStorage.setItem('guesses', JSON.stringify(guesses)); 
      updateKeys(draft => {
        const currentGuess = guesses[progress];
        for(let r = 0; r < draft.length; r++) {
          const updatedRow = draft[r].map((key) => {
            const usedLetter = currentGuess.find(square => square.letter === key.display);
            if(usedLetter !== undefined) {
              if(!key.used) {
                return {...key, used: true, inWord: usedLetter.inWord, inPosition: usedLetter.inPosition}
              } else {
                return key;
              }
            } else {
              return key;
            }
          })
          draft[r] = updatedRow;
        }
      })
      updateProgress(progress + 1);
      //didGuess.current = false; 
    }
  }, [guesses])

  useEffect(() => {
    if(didGuess.current) {
      localStorage.setItem('keys', JSON.stringify(keys));
      didGuess.current = false; 
    }
  }, [keys])

  function processInput(inputKey) {
    if(!isSolved) {
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
            letterList.splice(letterList.indexOf(letterToMatch.letter), 1);
          }
        }
      })
      didGuess.current = true;
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
    didGuess.current = true;
    setIsSolved(true);
  }

  return (
    <div className="app">
      <ToastMessage show={toast.show} message={toast.message} /> 
      <Header />
      <Board shake={shake} guesses={guesses} progress={progress} />
      <Keyboard keys={keys} processInput={processInput} />
    </div>
  );
}

export default App;
