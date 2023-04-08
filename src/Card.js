import React from "react";
import './Card.css';

const Card = ({image, id}) => {

    return (
        <div className="Card">
            <img src={image} alt={id}></img>
        </div>
    )
}

export default Card;