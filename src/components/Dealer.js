import React, { useState } from "react"
import DisplayDealer from "./DisplayDealer"
import { v4 as uuidv4 } from "uuid"

export default function Dealer(props){
    const [count, setCount] = useState(0);
    
    const displayCard = () =>{
        if(props.card.success === true && props.card.remaining < 52){
            if(props.cards[0] != null){
                return(
                    <div className="cardRow">
                        {props.cards.map((item, number) =>
                            <DisplayDealer cards={item} key={uuidv4()} status={props.counter} cardNum={number} />
                        )}
                    </div>
                )
            }
        }else{
            return null
        }
    }

    const value = () =>{
        if(props.card.success){
            if(!props.counter){
                const num = []
                num.push(props.cards[0])
                return(
                    <h3 className="value"> 
                        {props.value(num)}
                    </h3>
                )  
            }
            else{
                return(
                    <h3 className="value"> 
                        {props.value(props.cards)}
                    </h3>   
                ) 
            }
        }
    }


    return (
        <div className="dealer">
            <h3>Dealer</h3>
            {displayCard()}
            {value()}
        </div>
    )
}   