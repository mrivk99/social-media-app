import React, { useState , useContext } from 'react';

import "./PlaceItem.css";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from '../../shared/context/auth-context';

const PlaceItem = (props) => {

  const auth = useContext(AuthContext);
  {/**Set the MAP modal */}
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };

  {/**Set the DELETE place modal */}
  const [showConfirmModal , setShowConfirmModal] = useState(false);

  // When user presses DELETE, show the Modal
  const showDeletionWarningHandler = () =>{
    setShowConfirmModal(true);
  }
  // When user presses CANCEL, hide the Modal
  const cancelDeleteHandler = () =>{
    setShowConfirmModal(false);
  }

  // Delete from db
  const confirmDeleteHandler = () =>{
    setShowConfirmModal(false);
    console.log('DELETING... ');
  }

  return (
    <React.Fragment>
    {/** Modal for a Map */}  
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <h2>THE MAP!</h2>
        </div>
      </Modal>
     {/** Modal for delete place */}  
     <Modal 
     show={showConfirmModal}
     header="Are you sure?" footerClass="place-item__modal-actions"
     onCancel={cancelDeleteHandler}
     footer={
       <React.Fragment>
         <Button inverse onClick={cancelDeleteHandler}> CANCEL</Button>
         <Button inverse onClick={confirmDeleteHandler}> DELETE</Button>
       </React.Fragment>
     }
     >
       <p>
         Are you sure you want to delete this place !!. Note that this action
         can't be undone thereafter.
       </p>
     </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.isLoggedIn && <Button to={`/places/${props.id}`}>EDIT</Button> }
            {auth.isLoggedIn && <Button danger onClick={showDeletionWarningHandler}>DELETE</Button> }
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};
export default PlaceItem;
