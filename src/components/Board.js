import WordRow from "./WordRow";
import '../styles/WordBoard.css';

export default function Board(props) {
    return ( 
        <div className="wordBoard">
            {
                props.guesses.map((guess, i) => 
                    <WordRow
                        key={i} 
                        guess={guess}
                        rotate={(i === props.progress - 1)}
                    />)
            }
        </div>
     );
}

