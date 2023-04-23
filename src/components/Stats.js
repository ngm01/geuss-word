import "../styles/Stats.css";

function Stats(props) {

    function closeStats() {
        props.updateShowStats(false)
    }

    return ( 
        <div className={`stats ${props.show ? 'showStats' : 'hideStats'}`}>
            <div className="statsClose" onClick={closeStats}>
                <div>❌</div>
            </div>
            <div className="statsBody">
                <p>Gameplay statistics coming soon!</p>
            </div>
            <div className="finePrint">
                    <p >Made by <a target="_blank" rel="noreferrer" href="https://ngm01.com">Nathaniel Moore</a></p>
                    <p>Last updated April 22, 2023</p>
            </div>
        </div>
     );
}

export default Stats;