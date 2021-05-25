import { Card } from "react-bootstrap";
export default function ByDays(props) {
  return (
    <Card className="m-2 col">
      <Card.Body>
        <Card.Title>Past 5 days</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Sales on a daily basis for the past 5 days
        </Card.Subtitle>
        <Card.Text>
          {Object.keys(props.data).length > 0 &&
            Object.keys(props.data).map((p) => (
              <div key={p} className="d-flex justify-content-between">
                <div>{p}</div>
                <div>{props.data[p].total}$</div>
              </div>
            ))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
