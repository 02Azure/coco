import React from "react";

import { Button, Modal } from "react-bootstrap";

function Detail({ discovery, ...props }) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      {/* <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <div className="detail__container p-2">
          <h4>{discovery.name}</h4>

          <div className="d-flex">
            <div className="align-self-center">
              <img src={discovery.image} alt="" />
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

export default Detail;
