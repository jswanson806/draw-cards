import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";
import './CardStack.css'

const CardStack = () => {
    const [cards, setCards] = useState([]);
    const [deckId, setDeckId] = useState();
    const [message, setMessage] = useState("Draw!");
    const timerId = useRef();

    const startDrawing = () => {
        
        function drawCard(){
                timerId.current =  setInterval(async () => {
                let res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
                if(res.data.remaining === 0){
                    clearInterval(timerId.current);
                    alert("Error: no cards left!")
                } else {
                    setCards(cards => [...cards, { id: res.data.cards[0].code, image: res.data.cards[0].image }])
                }
            }, 10)
        }
        drawCard();
        setMessage("Stop!");
    }

    useEffect(() => {
        async function createDeck(){
            const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            setDeckId(res.data.deck_id);
        }
        createDeck();
        return () => {
            clearInterval(timerId.current);
        }
    }, [])

    const stopDrawing = () => {
        clearInterval(timerId.current);
        setMessage("Draw!")
    }

    return (
        <div>
            <button onClick={message === "Draw!" ? startDrawing : stopDrawing}>{message}</button>
            <div className="Card-stack">
                {cards.map(card => 
                    <Card id={card.id} image={card.image} key={card.id}/>
                )}
            </div>
        </div>

    )
}

export default CardStack;