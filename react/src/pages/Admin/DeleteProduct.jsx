import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteProduct } from "../../services/products.js";
import { useDispatch } from "react-redux";

export default function DeleteProduct(props) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const DeleteProduct = () => {
    setShow(false);
    deleteProduct(props.product._id);
    dispatch({
      type: "products/deleteProduct",
      payload: props.product._id,
    });
  };

  return (
    <>
      <Button variant="danger" onClick={() => setShow(!show)} className="mr-2">
        Delete
      </Button>

      <Modal show={show} onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete {props.product.title} ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={DeleteProduct}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
