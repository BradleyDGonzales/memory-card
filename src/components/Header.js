import { useState } from "react";

const Header = (props) => {
    console.log(props);
    return (
        <div className="myHeader">
            <header id="headerTag">Alice in Borderland: Memory Card Game</header>
            <div id="scoreboard">
                <p>{'Best Score: ' + props.bestScore}</p>
                <p>{'Current Score: ' + props.score}</p>
            </div>
        </div>
    )
}

export default Header;