import '../styles/LetterSquare.css';

function LetterSquare(props) {
    const colorClass = (!props.letter.inWord) ? 'nada' : (!props.letter.inPosition) ? 'yellow' : 'green';
    return ( 
        <div className={`letterSquare ${colorClass}`}>{props.letter.letter}</div>
     );
}

export default LetterSquare;