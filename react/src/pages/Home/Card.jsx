import { useSelector, useDispatch } from "react-redux";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { checkout } from "./../../services/card";
import { useLocation } from "react-router-dom";
import { store } from "react-notifications-component";

export default function Card() {
  const storeCard = useSelector((state) => state);
  const [total, setTotal] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    let total = storeCard.card.map((c) => c.price).reduce((a, b) => a + b, 0);
    setTotal(total);
  }, [storeCard]);

  function handleBuy() {
    checkout(storeCard.card.map((c) => c._id));
    store.addNotification({
      title: "Success",
      message: `the payment was successful!`,
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
    dispatch({
      type: "card/clean",
      payload: null,
    });
  }

  return (
    <>
      {location.pathname === "/home" && (
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={
            <Popover style={{ width: "300px" }}>
              <Popover.Title as="h3">Card</Popover.Title>
              <Popover.Content>
                <div>
                  {storeCard.card.length > 0 &&
                    storeCard.card.map((p, i) => (
                      <div key={i} className="d-flex justify-content-between">
                        <div>{p.title}</div>
                        <div> {p.price}$ </div>
                      </div>
                    ))}
                </div>

                <div className="d-flex justify-content-between mt-5">
                  <div>Total</div>
                  <div>{total} $</div>
                </div>

                <div className="mt-3">
                  <Button variant="info" size="sm" block onClick={handleBuy}>
                    Pay
                  </Button>
                </div>
              </Popover.Content>
            </Popover>
          }
        >
          <Button variant="secondary">Card</Button>
        </OverlayTrigger>
      )}
    </>
  );
}
