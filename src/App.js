import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import utils from './utilFunctions';

function App() {

  const [word, setTodaysWord] = useState('PLACE');
  const [guesses, updateGuesses] = useState([]);
  const [progress, updateProgress] = useState(0);

  useEffect(() => {
    updateGuesses(state => {
      return new Array(6).fill('');
    })
  }, [])

  useEffect(() => {
    function handleKeyDown(event) {
      console.log("running this handler...")
      if(utils.isAlpha(event.key)) {
        event.preventDefault();
        const key = event.key.toUpperCase();
        updateGuesses(state => {
          let currentGuess = state[progress];
          if(currentGuess.length < 5) {
            currentGuess = currentGuess + key;
          }
          state[progress] = currentGuess;
          return state;
        })
      }  else if(utils.isEnterOrDelete(event.key)) {
        event.preventDefault();
        if(event.key.toUpperCase() === 'BACKSPACE') {
          updateGuesses(state => {
            let currentGuess = state[progress];
            if(currentGuess.length > 0) {
              state[progress] = currentGuess.slice(0, currentGuess.length - 1);              
            };
            return state;
          })
        } else if (event.key.toUpperCase() === 'ENTER') {
          if(guesses[progress].length < 5) {
            alert("Not enough letters")
          } else {
            if(guesses[progress].toUpperCase() !== word) {
              alert("WRONG");
            }
            if(guesses[progress].toUpperCase() === word) {
              alert("You did it!");
            }
          }
        }
      } else {
        // do nothing...
      }
      console.log(guesses);
    }
    document.addEventListener('keydown', handleKeyDown);

    return function cleanUp() {
      document.removeEventListener('keydown', handleKeyDown);
    }

  }, [guesses, progress, word])


  return (
    <div className="App">
      <Header />
      <Board guesses={guesses} />
      <Keyboard />
    </div>
  );
}

export default App;
