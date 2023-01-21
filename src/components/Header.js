import { useState } from "react";
import "../styles/Header.css";
import LetterSquare from "./LetterSquare";

function Header() {

    const [titleA, setTitleA] = useState([
        {letter: 'G', inPosition: false, inWord: false},
        {letter: 'U', inPosition: false, inWord: false},
        {letter: 'E', inPosition: false, inWord: false},
        {letter: 'S', inPosition: false, inWord: false},
        {letter: 'S', inPosition: false, inWord: false},
    ]);
    const [titleB, setTitleB] = useState([
        {letter: 'W', inPosition: false, inWord: false},
        {letter: 'O', inPosition: false, inWord: false},
        {letter: 'R', inPosition: false, inWord: false},
        {letter: 'K', inPosition: false, inWord: false},
    ]);

    window.setTimeout(function(){
        setTitleA(titleA.map(letter => {return {...letter, inPosition: true, inWord: true}}))
    }, 1500)
    window.setTimeout(function(){
        setTitleB(titleB.map(letter => {
            if(letter.letter === 'K') {
                return {...letter, inPosition: false, inWord: true}
            } else {
                return {...letter, inPosition: true, inWord: true}
            }
        }))
    }, 2500)

    return ( 
        <div className="header">
            <div className="title">
            {titleA.map((letter, i) =>
                <LetterSquare small={true} rotate={letter.inWord} key={i} speed={i} letter={letter} />
            )}
            </div>
            <div className="title">
            {titleB.map((letter, i) =>  
                <LetterSquare small={true} rotate={letter.inWord} key={i} speed={i} letter={letter} />
            )}
            </div>
            <p><em>TODO:</em> 'K' flips to become 'D'</p>
        </div>
     );
}

export default Header;