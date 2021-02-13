import React from "react"

function DisplayDealer(props){
    const show = () =>{
        if(props.cardNum === 1){
            return(
            !props.status ? <img className="cardSize" src="./images/back.jpg" alt="back of card"/> : <img className="cardSize" src={props.cards.image} alt="card"/>)
        }
        else{
            return(
            <img className="cardSize" src={props.cards.image} alt="card"/>)
        }
    }
        return (
            <div>
                {show()}
            </div>
           
        )
}

export default DisplayDealer