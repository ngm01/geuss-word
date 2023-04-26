import { useRef } from "react";
import "../styles/Stats.css";
import StatsBar from "./StatsBar";

function Stats(props) {

    const stats = {
        gamesPlayed: 95,
        gamesWon: 95,
        guessDistro: {
            1: 0,
            2: 5,
            3: 33,
            4: 28,
            5: 23,
            6: 5
        }
    }

    const statsBarsBox = useRef(null);

    // const [parentWidth, setParentWidth] = useState(0)

    // useEffect(() => {
    //     const boxWidth = statsBarsBox.current.getBoundingClientRect().width;
    //     console.log("boxWidth", boxWidth)
    //     setParentWidth(boxWidth);
    // }, [parentWidth])

    function closeStats() {
        props.updateShowStats(false)
    }


    const bars = Object.keys(stats.guessDistro).map(guessKey => {
        return <StatsBar 
                    key={guessKey} 
                    barLabel={guessKey}
                    gamesWon={stats.gamesWon}
                    winsAtGuess={stats.guessDistro[guessKey]}
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
                    <p>Games played: {stats.gamesPlayed}</p>
                    <p>Win percentage: {(stats.gamesWon / stats.gamesPlayed) * 100}%</p>
                </div>
                <div className="barsBox" ref={statsBarsBox}>
                    {bars}
                </div>
            </div>
            <div className="finePrint">
                    <p >Made by <a target="_blank" rel="noreferrer" href="https://ngm01.com">Nathaniel Moore</a></p>
                    <p>Last updated April 22, 2023</p>
            </div>
        </div>
     );
}

export default Stats;