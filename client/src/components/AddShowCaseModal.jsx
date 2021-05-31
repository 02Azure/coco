import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AddNewShowcase } from "../store/action";

export default function ShowcaseModal(props) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(AddNewShowcase(name));
  };

  return (
    <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter"> Add New Showcase</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submit}>
          <div className="form-group">
            <input onChange={handleChange} value={name} className="form-control" type="text" />
          </div>
          <button onClick={props.onHide} className="btn btn-primary mt-2 mx-auto" type="submit">
            submit
          </button>
        </form>
      </Modal.Body>
      {/* <Button onClick={props.onHide}>Close</Button> */}
    </Modal>
  );
}
