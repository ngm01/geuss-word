import '../styles/LetterSquare.css';
import utils from '../utilFunctions';

function LetterSquare(props) {
    const colorClass = (!props.letter.inWord) ? 'nada' : (!props.letter.inPosition) ? 'yellow' : 'green';
    const rotateClass = utils.isAlpha(props.letter.letter) ? 'rotate' : ''
    return ( 
        <div className={`letterSquare ${colorClass} ${rotateClass}`}>{props.letter.letter}</div>
     );
}

export default LetterSquare;