import { useEffect, useState } from "react";
import "../styles/Header.css";
import LetterSquare from "./LetterSquare";

function Header(props) {

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

    useEffect(() => {
        window.setTimeout(function(){
            setTitleA(titleA.map(letterObj => {return {...letterObj, inPosition: true, inWord: true}}))
        }, 1000)
        window.setTimeout(function(){
            setTitleB(titleB.map(letterObj => {
                if(letterObj.letter === 'K') {
                    return {...letterObj, inPosition: false, inWord: true}
                } else {
                    return {...letterObj, inPosition: true, inWord: true}
                }
            }))
        }, 2000)
        window.setTimeout(function(){
            setTitleB(titleB.map(letterObj => {
                if(letterObj.letter === 'K') {
                    return {letter: 'D', inWord: true, inPosition: true}
                } else {
                    return {...letterObj, inPosition: true, inWord: true}
                }
            }))
        }, 2500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function showStats() {
        props.updateShowStats(true);
    }

    return ( 
        <div className="header">
            <div className="title">
                <div className="titleRow">
                {titleA.map((letter, i) =>
                    <LetterSquare small={true} rotate={letter.inWord} key={i} speed={i} letter={letter} />
                )}
                </div>
                <div className="titleRow">
                {titleB.map((letter, i) =>  
                    <LetterSquare small={true} rotate={letter.inWord} key={i} speed={i} letter={letter} />
                )}
                </div>
            </div>
            <div className="statsButton" onClick={showStats}>
            📈
            </div>
        </div>
     );
}

export default Header;