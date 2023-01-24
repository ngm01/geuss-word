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
                        shake={props.shake && i === props.progress}
                        rotate={(i === props.progress - 1)}
                    />)
            }
        </div>
     );
}

