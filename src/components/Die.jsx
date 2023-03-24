export default function Die (props) {
    return (
        <div className={props.isHeld ? "die held" : "die"} onClick={() => props.handleClick(props.id)}>
            <h2>{props.value}</h2>
        </div>
    )
}