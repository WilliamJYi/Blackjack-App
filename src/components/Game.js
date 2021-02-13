import React,{useState, useEffect} from "react"
//import Player from "./Player"
import Dealer from "./Dealer"
import Player from "./Player"

export default function Game(){

    const [query, setQuery] = useState("new");
    const [numCards, setNumCards] = useState(4)
    const [card, setCard] = useState([]);
    const [dealerCards, setDealerCards] = useState([])
    const [player1Cards, setPlayer1Cards] = useState([])
    //const [player2Cards, setPlayer2Cards] = useState([])
    const [count, setCount] = useState(false)
    const [start, setStart] = useState(false)
    const [amount, setAmount] = useState(0)
    const [first, setFirst] = useState(false)
    const [betting, setBetting] = useState(false)
    const [win, setWin] = useState(0)
    const [lose, setLose] = useState(0)
    const [draw, setDraw] = useState(0)

    const URL = `https://deckofcardsapi.com/api/deck/${query}/draw/?count=${numCards}`

    const drawCards = async () =>{
        const api_call = await fetch(URL);
        const data = await api_call.json();
        if(query === "new"){
            setQuery(data.deck_id)
        }
        setCard(data)
        setAmount(data.remaining) 
        const dealer = [];
        const player1 = [];
        //const player2 = [];
        dealer.push(data.cards[0]);
        dealer.push(data.cards[2]);
        player1.push(data.cards[1]);
        player1.push(data.cards[3]);
        //player2.push(data.cards[2]);
        //player2.push(data.cards[5]);
        setPlayer1Cards(player1);
        //setPlayer2Cards(player2);
        setDealerCards(dealer);
        if(card.remaining === 4){
            setQuery("new")
        } 
    }

    const startGame = () =>{
        setStart(true)
        setBetting(true)
        return(
            <div>
                
            </div>
        )
    }

    const getCards = (e) => {
        if(!betting){
            e.preventDefault();
            if(card.remaining > 4 || query === "new"){
                drawCards();
            }
            else{
                setQuery("new")
            }
        }
    };

    const newDeck = () =>{
        setQuery("new")
    }

    const hitOne = (e) => {
        //e.preventDefault();
        if(addCards(player1Cards) < 21){
            hitCardOne()
            if(!first){
                setFirst(true)
            }
        }
        else if(addCards(player1Cards) === 21){
            setCount(true)
        }
        else{
            setCount(true)
        }
        console.log(count)
        //setCount(prev => prev + 1)
    }

    const hitCardOne = async () =>{
        const api_call = await fetch(`https://deckofcardsapi.com/api/deck/${query}/draw/?count=1`);
        const data = await api_call.json();
        //const {cards} = data
        const value = player1Cards.slice();
        value.push(data.cards[0])
        setPlayer1Cards(value);
    }

    const dealerHit = async () =>{
        const api_call = await fetch(`https://deckofcardsapi.com/api/deck/${query}/draw/?count=1`);
        const data = await api_call.json();
        //const {cards} = data
        const value =  dealerCards.slice();
        value.push(data.cards[0])
        setDealerCards(value)
    }

    const stand = () =>{
        setCount(prev => prev + 1)
        if(addCards(player1Cards) > addCards(dealerCards)){
            dealerHit()  
        }
        else if(addCards(player1Cards) === "Blackjack !" || addCards(dealerCards) === "Bust !"){
            setWin(prev => prev + 1)
            setBetting(true)
        }
        else if(addCards(player1Cards) < addCards(dealerCards) || addCards(player1Cards) === "Bust !" || addCards(dealerCards) === "Blackjack !"){
            setLose(prev => prev + 1)
            setBetting(true)
        }
        else if(addCards(player1Cards) === addCards(dealerCards)){
            setDraw(prev => prev + 1)
        }

    }

    const checkValue = (value) =>{
        if(value === "JACK" || value === "QUEEN" || value === "KING"){
            return 10
        }
        else if(value === "ACE"){
            return 11
        }
        else{
            return value
        }
    }

    const addCards = (cards) =>{
        if(card.success === true && card.remaining < 52){
            if(cards[0] != null){
                let total = 0
                cards.map(card => {
                    total = total + parseInt(checkValue(card.value))
                })
                if(total === 21){
                    return "Blackjack !"
                }
                else if(total > 21){
                    return "Bust !"
                }
                else{
                    return total 
                }
            }
        }
    }

    return(
        <div className="game">
            <div style={{display: "flex", flexDirection: "row"}}>
                <h3 className="total">Remaining: {amount}</h3>
                <h1 className="title">Blackjack App</h1>
            </div>
            
            <div className="getButtons">
                {!start &&
                <div>
                    <button onClick={startGame}>Start</button>
                </div>
                }
                {start && 
                    <div>
                        <button onClick={newDeck}>New Deck</button>
                        <button onClick={getCards}>Deal</button>
                    </div>
                }
            </div>
            <Dealer 
                card={card} 
                cards={dealerCards}
                counter={count}
                value={addCards}
            />
            <br/><br/>
            <div className="row">
                <Player 
                    player={1}  
                    cards={player1Cards} 
                    card={card} 
                    clicker={hitOne}
                    value={addCards(player1Cards)}
                    //newCard={player1NewCard}
                    stander={stand}
                    couting={count}
                    counter={first}
                    bet={betting}
                    a={setBetting}
                    win={win}
                    lose={lose}
                    draw={draw}
                />
            </div>
        </div>
    )
}
