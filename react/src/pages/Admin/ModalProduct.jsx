import { useState } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import { updateProduct, createProduct } from "./../../services/products.js";
import { useDispatch } from "react-redux";

export default function ModalProduct(props) {
  const [product, setProduct] = useState(props.product ? props.product : {});
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const save = () => {
    setShow(false);
    if (props.product) {
      updateProduct(product._id, product);
      dispatch({
        type: "products/updateProducts",
        payload: product,
      });
    } else {
      createProduct(product);
      dispatch({
        type: "products/addProducts",
        payload: [product],
      });
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(!show)} className="mr-2">
        {props.product ? "Edit" : "Create"}
      </Button>

      <Modal show={show} onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>{props.product ? "Edit" : "Create"} product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="number"
                placeholder="Price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: parseFloat(e.target.value) })
                }
              />
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Image (link)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image link"
              value={product.image}
              onChange={(e) =>
                setProduct({ ...product, image: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={save}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
