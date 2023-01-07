import LetterSquare from "./LetterSquare";
import '../styles/WordRow.css';
import { forwardRef } from "react";

const WordRow = forwardRef((props, ref) => {
    function generateSquares(guess) {
        const emptyLetter = {letter: '', inWord: false, inPosition: false};
        if(guess === null) {
            guess = new Array(5).fill(emptyLetter);
        } else {
            if(guess.length < 5) {
                let extraSpaces = new Array(5 - guess.length).fill(emptyLetter);
                guess = guess.concat(extraSpaces);
            }
        }
        return guess.map((letter, i) => {
            return <LetterSquare key={i} letter={letter.letter} />
        })
    }

    return ( 
        <div ref={ref} className="wordRow">
            {generateSquares(props.guess)};
        </div>
     );
})

export default WordRow;