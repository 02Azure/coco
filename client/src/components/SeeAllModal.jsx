import React from "react";

import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
function SeeAllModal({ seeAllDetail, ...props }) {
  const h = useHistory();

  console.log(seeAllDetail, "<<<<DETAIL");

  const u = seeAllDetail.Item;

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body className="py-1">
        <div className="detail__container p-2">
          <div className="row">
            <div className="col-md-6 my-auto">
              <div className="mx-auto">
                <img
                  style={{ width: "90%", margin: "auto" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://www.mugi.co.id/assets/images/img_def.png";
                  }}
                  src={u.image}
                  alt=""
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="items__detail">
                <div>
                  <p className="fst-italic fw-bold">Card Name</p>
                  {u.name}
                </div>
                <div>
                  <p className="fst-italic fw-bold">Description</p>
                  {u.description}
                </div>
                <div>
                  <p className="fst-italic fw-bold">Tag</p>
                  {u.tag}
                </div>

                {u.tradeable ? (
                  <div>
                    <p className="fst-italic fw-bold">Trade With</p>
                    {u.tradeWith}
                  </div>
                ) : (
                  ""
                )}

                <div>
                  <p className="fst-italic fw-bold">Price</p>
                  {u.price}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="pt-0">
        <Button
          onClick={() => {
            props.onHide();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SeeAllModal;
