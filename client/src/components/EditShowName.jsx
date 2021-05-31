import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function EditShowName(props) {
  const [name, setName] = useState("");
  const oneShow = useSelector((state) => state.oneShow);
  const dispatch = useDispatch();

  // console.log(oneShow, "<<<<");

  useEffect(() => {
    if (oneShow.name) {
      setName(oneShow.name);
    }
  }, [oneShow]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    // dispatch(AddNewShowcase(name));
    console.log("update");
  };

  return (
    <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter"> Edit show name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submit}>
          <div className="form-group">
            <input onChange={handleChange} value={name} className="form-control" type="text" />
          </div>
          <button onClick={props.onHide} className="btn btn-primary mt-2 mx-auto" type="submit">
            update
          </button>
        </form>
      </Modal.Body>
      {/* <Button onClick={props.onHide}>Close</Button> */}
    </Modal>
  );
}
