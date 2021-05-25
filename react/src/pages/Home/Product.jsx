import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { store } from "react-notifications-component";

export default function Product(props) {
  const dispatch = useDispatch();

  const addToCards = function () {
    dispatch({
      type: "card/addToCard",
      payload: props.product,
    });
    store.addNotification({
      title: "Success",
      message: `the item ${props.product.title} added to card !`,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };

  return (
    <div className="col mt-3">
      <div className="card shadow-sm">
        <img
          className="bd-placeholder-img card-img-top"
          width="100%"
          alt={props.product.title}
          height="225"
          src={props.product.image}
        />
        <div className="card-body">
          <p className="card-text">{props.product.title}</p>
          <p className="card-text">{props.product.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <Button variant="success" onClick={addToCards}>
                Buy
              </Button>
            </div>
            <p>{props.product.price}$</p>
          </div>
        </div>
      </div>
    </div>
  );
}
