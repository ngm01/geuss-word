import { useState, useEffect } from "react";
import '../styles/Keyboard.css';
import utils from "../utilFunctions";
import keysDictionary from '../keys.json';

function Keyboard(props) {

    const [keys] = useState(keysDictionary)
    // console.log("keys:", keys)

    function handleKeyboardClick(event) {
        console.log("clicked:", event.target.innerText);
        props.addLetter(event.target.innerText)
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