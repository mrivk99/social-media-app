import React from 'react';

import './Card.css';

const Card = props => {
  return (
    // Add a props.children to render all components inside Card
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
