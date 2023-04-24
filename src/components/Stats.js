import { useEffect } from "react";
import "../styles/Stats.css";

function Stats(props) {

    const played = 95;
    const winsPerGeuss = {
        1: 0,
        2: 5,
        3: 33,
        4: 28,
        5: 23,
        6: 5
    }

    useEffect(() => {
        const boxWidth = document.getElementById('barsBox').getBoundingClientRect().width;
        for (const key in winsPerGeuss) {
            calculateBarWidth(key, winsPerGeuss[key], boxWidth)
        }
    }, [])

    function closeStats() {
        props.updateShowStats(false)
    }

    function calculateBarWidth(key, wins, boxWidth) {
        const percentage = wins / played;
        const barWidth = boxWidth * percentage;
        document.getElementById(`${key}-bar`).style.width = `${barWidth}px`
    }

    return ( 
        <div className={`stats ${props.show ? 'showStats' : 'hideStats'}`}>
            <div className="statsClose" onClick={closeStats}>
                <div>❌</div>
            </div>
            <div className="statsBody">
                <div id="barsBox">
                    <div class="bar" id="1-bar"></div>
                    <div class="bar" id="2-bar"></div>
                    <div class="bar" id="3-bar"></div>
                    <div class="bar" id="4-bar"></div>
                    <div class="bar" id="5-bar"></div>
                    <div class="bar" id="6-bar"></div>
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