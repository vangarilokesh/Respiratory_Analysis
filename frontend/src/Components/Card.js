import React from "react";
import "./Card.css";

const Card = ({name,detected_disease}) => {
  return (
    <div className="card">
      <div className="card-details">
        <h2 className="card-title">{name}</h2>
        <p className="card-description">{"Name of Disease: "+detected_disease.prediction}</p>
        <p className="card-price">{"Confindence: "+detected_disease.confidence}</p>
      </div>
    </div>
  );
};

export default Card;
