import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { showDetailItem, deleteItem as removeItem } from "../store/action";
import FormEditItem from "../components/formEditItem";
import Swal from "sweetalert2";
import "./detail.item.css";
export default function DetailItemPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const data = useSelector((state) => state.oneItem);
  const isLoading = useSelector((state) => state.loading);
  const { id } = useParams();
  useEffect(() => {
    dispatch(showDetailItem(id));
  }, [id]);

  function deleteItem() {
    dispatch(removeItem(id));
    history.push("/profile/" + data.UserId);
  }

  function editItem() {
    setShow(true);
  }

  if (isLoading) {
    return (
      <div className="loading__discovery">
        <h3 className="text-center">Please Wait...</h3>
      </div>
    );
  }

  const x = data.price;

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const uang = formatter.format(+x);
  return (
    <section className="wishlistSection">
      {/* <div className="wishlistColor"></div>
            <div className="wishlistColor"></div>
            <div className="wishlistColor"></div> */}
      <div className="box">
        <div className="wishlistContainer">
          <div className="row test">
            <div className="col-6 p-3">
              <img
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://www.mugi.co.id/assets/images/img_def.png";
                }}
                src={data.image}
                className="wishlistImage"
              ></img>
            </div>
            <div className="col-6 p-3 contentDesc">
              <div className="wishlistDesc">
                <div>
                  <p className="fst-italic fw-bold">Name</p>
                  {data.name}
                </div>
                <div>
                  <p className="fst-italic fw-bold">Description</p>
                  {data.description}
                </div>
                <div>
                  <p className="fst-italic fw-bold">Tag</p>
                  {data.tag}
                </div>

                {data.tradeable ? (
                  <div>
                    <p className="fst-italic fw-bold">Trade With</p>
                    {data.tradeWith}
                  </div>
                ) : (
                  ""
                )}

                <div>
                  <p className="fst-italic fw-bold">Price</p>
                  {uang}
                </div>
                <button onClick={editItem} className="btn btn-outline-success">
                  Edit
                </button>
                <button onClick={deleteItem} className="btn btn-outline-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <FormEditItem show={show} onHide={() => setShow(false)} data={data} />
      </div>
    </section>
  );
}
