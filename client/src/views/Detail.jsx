import React from "react";

import { Button, Modal } from "react-bootstrap";

function Detail(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      {/* <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <div className="detail__container p-2">
          <h4>Right Leg of the Forbidden One UR LOB</h4>

          <div className="d-flex">
            <div className="align-self-center">
              <img src={"https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1155781.jpg"} alt="" />
            </div>

            <div className="px-3 items__detail">
              <div>
                <p>Description</p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas quibusdam amet culpa dicta ipsa iure quaerat ullam minima, similique nam?
              </div>
              <div>
                <p>Tag</p>
                Lorem ipsum dolor,
              </div>

              <div>
                <p>Price</p>
                150000
              </div>
              <div>
                <p>Price</p>
                150000
              </div>
              <div>
                <p>Price</p>
                150000
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

/**
 *  UserId: 1,
      name: '',
      image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1155848.jpg',
      tradeable: true,
      price: 300000,
      tradeWith: 'Playmat Yugioh San Diego Comic-Con Exclusive Yugi & Exodia Playmat',
      tag: 'Yugioh-TCG',
      description: 'Unli, NM',
 * 
 */

export default Detail;
