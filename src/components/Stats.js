import "../styles/Stats.css";

function Stats(props) {

    function closeStats() {
        console.log("updating show stats")
        props.updateShowStats(false)
    }

    return ( 
        <div className={`stats ${props.show ? 'show' : 'hide'}`}>
            <div className="statsClose" onClick={closeStats}>
                <div>❌</div>
            </div>
            <div className="statsBody">
                <p>Gameplay statistics coming soon!</p>
            </div>
        </div>
     );
}

export default Stats;