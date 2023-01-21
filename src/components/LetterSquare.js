import '../styles/LetterSquare.css';
import utils from '../utilFunctions';

function LetterSquare(props) {

    const colorClass = (!props.letter.inWord) ? '' : (!props.letter.inPosition) ? 'yellow' : 'green';
    const rotateClass = (utils.isAlpha(props.letter.letter)) && props.rotate ? 'rotate' : '';
    return ( 
        <div className={`letterSquare ${colorClass} ${rotateClass}-${props.speed + 1} ${props.small ? 'small' : ''}`}>{props.letter.letter}</div>
     );
}

export default LetterSquare;