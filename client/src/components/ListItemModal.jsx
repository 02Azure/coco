import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AddNewShowcase, getItems, postShowToItems, oneShow } from "../store/action";

export default function ListItemModal({ ShowcaseId, ...props }) {
  const items = useSelector((state) => state.items);
  const one = useSelector((state) => state.oneShow);

  const [ItemId, setItem] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
    dispatch(oneShow(ShowcaseId));
  }, []);

  const submit = (e) => {
    setItem(e.target.value);
  };

  const itemToShowcase = () => {
    dispatch(postShowToItems({ ItemId, ShowcaseId }));
  };

  return (
    <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className="py-1">
        <Modal.Title id="contained-modal-title-vcenter"> Add To Showcase</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-1">
        <form className="d-flex justify-content-evenly align-items-center">
          <div>
            <select onChange={submit} name="cars" id="cars">
              <option>-- select card --</option>
              {items.map((e, i) => (
                <option key={i} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <Button
            className="d-block"
            onClick={() => {
              itemToShowcase();

              props.onHide();
            }}
          >
            Add
          </Button>
        </form>
      </Modal.Body>
      {/* <Button onClick={props.onHide}>Close</Button> */}
    </Modal>
  );
}
