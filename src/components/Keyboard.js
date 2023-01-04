import { useState, useEffect } from "react";
import '../styles/Keyboard.css';
import utils from "../utilFunctions";
import keysDictionary from '../keys.json';

function Keyboard() {

    const [keys] = useState(keysDictionary)
    // console.log("keys:", keys)

    return ( 
        <div className="keyboard">
            {keys.map((row, idx) => {
                return <div key={idx} className="keyboardRow">
                    {row.map(keybordKey => {
                        return <div className="keyboardKey" 
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