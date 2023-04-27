import { forwardRef, useEffect, useState } from "react";

const StatsBar = forwardRef(({barLabel, winsAtGuess, gamesWon}, statsBarsBox) => {

    const [barWidth, setBarWidth] = useState(0)

    useEffect(() => {
        const parentWidth = statsBarsBox.current.getBoundingClientRect().width;
        const percentage = gamesWon === 0 ? 0 : winsAtGuess / gamesWon
        setBarWidth((parentWidth - 5) * percentage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [winsAtGuess])

    return ( 
        <div className="statsBar">
            <div className="barLabel">{barLabel}</div>
            <div className="winsAtGuess" 
                style={{'width': barWidth, 'padding': winsAtGuess > 0 ? '.25rem' : 0}}>
                {winsAtGuess}
            </div>
        </div>
     );
})
export default StatsBar;