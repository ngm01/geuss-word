import { useState } from "react";
import '../styles/Keyboard.css';
import keysDictionary from '../keys.json';

function Keyboard(props) {

    const [keys] = useState(keysDictionary)
    // console.log("keys:", keys)

    function handleKeyboardClick(event) {
        let input;
        if(event.target.innerText === 'DELETE') {
            input = "BACKSPACE"
        } else {
            input = event.target.innerText;
        }
        props.processInput(input);
    }

    return ( 
        <div className="keyboard">
            {keys.map((row, idx) => {
                return <div key={idx} className="keyboardRow">
                    {row.map(keybordKey => {
                        return <div onClick={handleKeyboardClick} className="keyboardKey" 
                                key={keybordKey.display}>
                                    {keybordKey.display}
                                </div>
                    })}
                </div>
            })}
        </div>
     );
}

export default Keyboard;