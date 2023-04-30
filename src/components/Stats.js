import { useRef } from "react";
import "../styles/Stats.css";
import StatsBar from "./StatsBar";

function Stats(props) {

    const statsBarsBox = useRef(null);

    function closeStats() {
        props.updateShowStats(false)
    }

    const bars = Object.keys(props.stats.guessDistro).map(guessKey => {
        return <StatsBar 
                    key={guessKey} 
                    barLabel={guessKey}
                    gamesWon={props.stats.gamesWon}
                    winsAtGuess={props.stats.guessDistro[guessKey]}
                    ref={statsBarsBox}
                    />
    })

    return ( 
        <div className={`stats ${props.show ? 'showStats' : 'hideStats'}`}>
            <div className="statsClose" onClick={closeStats}>
                <div>❌</div>
            </div>
            <div className="statsBody">
                <div className="basicStats">
                    <p>Games played: {props.stats.gamesPlayed}</p>
                    <p>Win percentage: {props.stats.gamesPlayed === 0 ? 0 : (props.stats.gamesWon / props.stats.gamesPlayed) * 100}%</p>
                </div>
                <div className="barsBox" ref={statsBarsBox}>
                    {bars}
                </div>
            </div>
            <div className="finePrint">
                    <p >Made by <a target="_blank" rel="noreferrer" href="https://ngm01.com">Nathaniel Moore</a></p>
                    <p>Last updated April 28, 2023</p>
            </div>
        </div>
     );
}

export default Stats;