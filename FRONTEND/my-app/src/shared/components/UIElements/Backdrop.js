import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop = props => {

  {/* Portals provide a first-class way to render children into a DOM node that exists
  // outside the DOM hierarchy of the parent component.*/}

  {/*The first argument (child) is any renderable React child, such as an element, string, or fragment. 
  // The second argument (container) is a DOM element.*/}
  
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
