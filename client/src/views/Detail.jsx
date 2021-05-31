import React from "react";

import { Button, Modal } from "react-bootstrap";

function Detail({ discovery, ...props }) {
  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      {/* <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <div className="detail__container p-2">
          <h4>{discovery.name}</h4>

          <div className="d-flex">
            <div className="align-self-center">
              <img style={{ width: "75%", margin: "auto" }} src={discovery.image} alt="" />
            </div>

            <div className="px-3 items__detail">
              <div>
                <p>Description</p>
                {discovery.description}
              </div>
              <div>
                <p>Tag</p>
                {discovery.tag}
              </div>

              {discovery.tradeable ? (
                <div>
                  <p>Trade With</p>
                  {discovery.tradeWith}
                </div>
              ) : (
                ""
              )}

              <div>
                <p>Price</p>
                {discovery.price}
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
