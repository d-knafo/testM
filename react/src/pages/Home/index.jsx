import Product from "./Product";
import { getProducts } from "./../../services/products.js";
import { useEffect } from "react";
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
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      {products.products.length > 0 ? (
        products.products.map((p) => <Product key={p._id} product={p} />)
      ) : (
        <div>No data !</div>
      )}
    </div>
  );
}
