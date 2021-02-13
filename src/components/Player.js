import React,{useState, useEffect} from "react"
import { v4 as uuidv4 } from "uuid"
import Score from "./Score"
import Display from "./Display"

export default function Player(props){

    const [count, setCount] = useState(0)
    const [amount, setAmount] = useState(2000)

    useEffect(()=>{
        setAmount(prev => prev + count + count)
        setCount(0)
    }, [props.win])

    useEffect(()=>{
        setCount(0)
    }, [props.lose])

    useEffect(()=>{
        setAmount(prev => prev + count)
        setCount(0)
    }, [props.draw])

    const chipValue = [5,10,25,50,100,500]

    const displayCard = () =>{
            if(props.cards[0] != null){
                return(
                    <div className="cardRow">
                        {props.cards.map(item =>
                            <Display cards={item} key={uuidv4()} />
                        )}
                        {!props.counting ? <div className="hit-stand">
                                                <button onClick={props.clicker}>Hit</button>
                                                <button onClick={props.stander}>Stand</button>
                                                {!props.counter && <button onClick={props.stander}>Double</button>}
                        </div> : <div></div>}
                    </div>
                )
            }
    }

    const total = (num) =>{
        if(amount > 0){
            setAmount(prev => prev - parseInt(num));
            setCount(prev => prev + parseInt(num));
        }
        
    }

    const bet = () =>{
        props.a(false)
    }
    
    return(
        <div className="p1">
            {props.card.success ?
            <div>
            <div className="pCards">
                {displayCard()}
            </div>
            {props.card.success && <h3 className="value">{props.value}</h3>}
            </div>
            : <div style={{height: "200px"}}></div>}
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginRight: "30px"}}>
                <h3 className="total">{amount}</h3>
                {props.bet && <button onClick={bet} style={{marginRight: "-30px"}}>Bet</button>}
                <h3 className="total">{count}</h3> 
            </div>
            <div className={"player"}>
                {props.bet &&
                <div style={{display: "flex", flexDirection: "row"}}>
                    {chipValue.map(item => <Score value={item} onClick={total} />)}
                </div>}
            </div>
        </div>
    )
}