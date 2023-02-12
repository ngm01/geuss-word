import '../styles/Keyboard.css';

function Keyboard(props) {

    function handleKeyboardClick(event) {
        let input;
        if(event.target.innerText === 'DELETE') {
            input = "BACKSPACE"
        } else {
            input = event.target.innerText;
        }
        props.processInput(input);
    }

    function getColor(key) {
        return key.inPosition ? 'inPosition' : key.inWord ? 'inWord' : key.used ? 'used' : '';
    }

    return ( 
        <div className="keyboard">
            {props.keys.map((row, idx) => {
                return <div key={idx} className="keyboardRow">
                    {row.map(keyboardKey => {
                        return <div onClick={handleKeyboardClick} className={`keyboardKey ${getColor(keyboardKey)} `} 
                                key={keyboardKey.display}>
                                    {keyboardKey.display}
                                </div>
                    })}
                </div>
            })}
        </div>
     );
}

export default Keyboard;