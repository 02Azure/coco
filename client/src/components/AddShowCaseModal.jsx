import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AddNewShowcase, getAllShow } from "../store/action";

export default function ShowcaseModal(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const { id } = useParams();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(AddNewShowcase(name));
    setName("");
  };

  return (
    <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className="py-1">
        <Modal.Title id="contained-modal-title-vcenter"> Add New Showcase</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-1">
        <form onSubmit={submit} className="d-flex justify-content-between align-items-center">
          <div className="form-group">
            <input onChange={handleChange} value={name} className="form-control" type="text" />
          </div>
          <button onClick={props.onHide} className="btn btn-sm btn-primary d-block" type="submit">
            Submit
          </button>
        </form>
      </Modal.Body>
      {/* <Button onClick={props.onHide}>Close</Button> */}
    </Modal>
  );
}
