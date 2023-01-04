import LetterSquare from "./LetterSquare";
import '../styles/WordRow.css';
import { forwardRef } from "react";

const WordRow = forwardRef((props, ref) => {
    function generateSquares(guess) {
        let guessLetters = [];
        if(guess === null) {
            guessLetters = new Array(5).fill('');
        } else {
            guessLetters = guess.split('');
            if(guessLetters.length < 5) {
                let extraSpaces = new Array(5 - guessLetters.length).fill('');
                guessLetters = guessLetters.concat(extraSpaces);
            }
        }
        return guessLetters.map((letter, i) => {
            return <LetterSquare key={i} letter={letter} />
        })
    }

    return ( 
        <div ref={ref} className="wordRow">
            {generateSquares(props.guess)};
        </div>
     );
})

export default WordRow;