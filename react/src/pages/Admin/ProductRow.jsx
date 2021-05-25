import ModalProduct from "./ModalProduct";
import DeleteProduct from "./DeleteProduct";

export default function ProductRow(props) {
  return (
    <tr>
      <td>{props.product.title}</td>
      <td>{props.product.price}</td>
      <td>
        <div className="d-flex justify-content-end">
          <ModalProduct product={props.product} />
          <DeleteProduct product={props.product} />
        </div>
      </td>
    </tr>
  );
}
