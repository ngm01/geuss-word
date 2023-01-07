import WordRow from "./WordRow";
import '../styles/WordBoard.css';
import { useState, useRef } from "react";

export default function Board(props) {
    return ( 
        <div className="wordBoard">
            {
                props.guesses.map((guess, i) => 
                    <WordRow
                        key={i} 
                        guess={guess}
                    />)
            }
        </div>
     );
}

