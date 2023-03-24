export default function (props) {
    return (
        <div className="stats">
            <div className="current-stats">
                <h1 className="title-2">Current Game</h1>
                <h4 className="stat-title">Time Taken: <b>{props.timer}</b>s</h4>
                <h4 className="stat-title">Number of Rolls: <b>{props.count}</b></h4>
            </div>
            <div className="overall-stats">
                <h1 className="title-2">Best Time</h1>
                <h4 className="stat-title">Time Taken: <b>{props.stats.bestTime}</b>s</h4>
                <h4 className="stat-title">Number of Rolls: <b>{props.stats.bestRolls}</b></h4>
            </div>
        </div>
    )
}