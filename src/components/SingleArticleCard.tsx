import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Result } from "../interfaces/Article";
import { useNavigate } from "react-router-dom";

interface SingleArticleProps {
  data: Result;
}

const SingleArticleCard = ({ data }: SingleArticleProps) => {
  const navigate = useNavigate();

  return (
    <Col xs={12} md={6} lg={3}>
      <Card>
        <Card.Img style={{ height: "15rem" }} variant="top" src={data.image_url} />
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Text className="text-truncate">{data.summary}</Card.Text>
          <Button onClick={() => navigate(`/details/${JSON.stringify(data.id)}`)} variant="primary">
            Read the Article
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleArticleCard;
