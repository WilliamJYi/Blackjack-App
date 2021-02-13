import React from "react"

function Display(props){
        return (
            <img id={props.keys} className="cardSize" src={props.cards.image} alt="card"/>
        )
}

export default Display