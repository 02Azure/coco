import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function EditShowName({ updateFrom, deleteFrom, ...props }) {
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

  return (
    <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className="py-0">
        <Modal.Title id="contained-modal-title-vcenter">Edit Showcase</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <input onChange={handleChange} value={name} className="form-control" type="text" />
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer className="pb-2">
        <Button
          onClick={() => {
            updateFrom(name);
            props.onHide();
          }}
          type="submit"
        >
          Update
        </Button>
        <Button
          onClick={() => {
            deleteFrom();
            props.onHide();
          }}
          className="btn-danger"
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
