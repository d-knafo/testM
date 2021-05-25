import { Card } from "react-bootstrap";
export default function Top(props) {
  return (
    <Card className="m-2 col">
      <Card.Body>
        <Card.Title>Top 5</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Top 5 sold products
        </Card.Subtitle>
        <Card.Text>
          {props.data.length > 0 &&
            props.data.map((p, i) => (
              <div key={i} className="d-flex justify-content-between">
                <div>{p.title}</div>
                <div> {p.count} </div>
              </div>
            ))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
