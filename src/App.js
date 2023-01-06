import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import utils from './utilFunctions';

function App() {

  const [word, setTodaysWord] = useState([]);
  const [guesses, updateGuesses] = useState(['', '', '', '', '', '']);
  const [progress, updateProgress] = useState(0);
  console.log("component is (re)rendering...");

  useEffect(() => {
    // this to be supplied by API call...
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
          if(i === progress && guess.length < 5) {
            return guess + key;
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
            if(guesses[progress].toUpperCase() !== word) {
              alert("WRONG");
              updateProgress(progress + 1);
            }
            if(guesses[progress].toUpperCase() === word) {
              alert("You did it!");
            }
          }
        }
      } else {
        // do nothing...
      }
      console.log("word:", word)
      console.log("guesses:", guesses)
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
