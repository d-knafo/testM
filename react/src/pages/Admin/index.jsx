import ProductRow from "./ProductRow";
import ModalProduct from "./ModalProduct";
import { getProducts } from "./../../services/products.js";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

export default function Admin() {
  const products = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      let data = await getProducts();
      if (data.data.success) {
        dispatch({
          type: "products/setProducts",
          payload: data.data.data,
        });
      } else {
        console.log(`Err: ' ${data.data.message}`);
      }
    }
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <h2>Admin</h2>

      <ModalProduct />
      {products.products.length > 0 ? (
        <Table striped bordered hover className="mt-2">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.products.map((p) => (
              <ProductRow key={p._id} product={p} />
            ))}
          </tbody>
        </Table>
      ) : (
        <div> No data ! </div>
      )}
    </div>
  );
}
