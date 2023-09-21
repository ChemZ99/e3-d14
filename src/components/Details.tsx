import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { SingleArticle } from "../interfaces/Article";
import Button from "react-bootstrap/esm/Button";

const Details = () => {
  const navigate = useNavigate();
  const params = useParams<{ ArticleId: string }>();
  console.log(params);

  const [singleArticle, setSingleArticle] = useState<null | SingleArticle>(null);

  const fetchSingleArticle = async () => {
    try {
      const response = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/${params.ArticleId}`);
      if (response.ok) {
        const data = await response.json();
        setSingleArticle(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleArticle();
  }, []);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Spaceflight News</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {singleArticle && (
        <Container>
          <h1>{singleArticle.title}</h1>
          <img src={singleArticle.image_url} alt="article-img" />
          <p>{singleArticle.summary}</p>
          <Button href={singleArticle.url}>Go to Complete Article</Button>
        </Container>
      )}
    </>
  );
};

export default Details;
