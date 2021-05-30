import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function ShowcaseModal(props) {
  const [name, setName] = useState("");
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
  };

  return (
    <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">New ShowCase</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submit}>
          <div className="form-group">
            <input onChange={handleChange} className="form-control" type="text" />
          </div>
          <button className="btn btn-primary mt-2 mx-auto" type="submit">
            submit
          </button>
        </form>
      </Modal.Body>
      {/* <Button onClick={props.onHide}>Close</Button> */}
    </Modal>
  );
}
