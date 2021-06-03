import React from "react";
import "./detail.css";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
function Detail({ discovery, ...props }) {
  const h = useHistory();

  // console.log(discovery.User, "<<<<DETAIL");

  const u = discovery.User;

  const x = discovery.price;

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const uang = formatter.format(+x);

  const changePage = () => {
    h.push("/profile/" + discovery.UserId);
  };
  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body className="py-1">
        <div className="detail__container p-2">
          <div className="row">
            <div className="col-md-6 my-auto">
              <div className="mx-auto">
                <img
                  style={{ width: "90%" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://www.mugi.co.id/assets/images/img_def.png";
                  }}
                  src={discovery.image}
                  alt=""
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="items__detail">
                <div className="d-flex ps-0 py-2 pe-2 align-items-center">
                  <div className="me-1">
                    <img className="avatar" src={u.userImage ? u.userImage : "https://img.icons8.com/cotton/2x/gender-neutral-user--v2.png"} />
                  </div>
                  <div className="me-1">
                    <p style={{ fontSize: "20px" }}>@{u.username}</p>
                  </div>
                </div>
                <hr style={{ margin: "5px" }}></hr>
                <div>
                  <p className="fst-italic fw-bold">Name</p>
                  {discovery.name}
                </div>
                <div>
                  <p className="fst-italic fw-bold">Description</p>
                  {discovery.description}
                </div>
                <div>
                  <p className="fst-italic fw-bold">Tag</p>
                  {discovery.tag}
                </div>

                {discovery.tradeable ? (
                  <div>
                    <p className="fst-italic fw-bold">Trade With</p>
                    {discovery.tradeWith}
                  </div>
                ) : (
                  ""
                )}

                <div>
                  <p className="fst-italic fw-bold">Price</p>
                  {uang}
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
            changePage();
          }}
        >
          See Profile
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Detail;
