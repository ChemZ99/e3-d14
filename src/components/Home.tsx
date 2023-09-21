import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { Article } from "../interfaces/Article";
import Row from "react-bootstrap/Row";

import SingleArticleCard from "./SingleArticleCard";

const Home = () => {
  const navigate = useNavigate();

  const [article, setArticle] = useState<null | Article>(null);

  const fetchArticles = async () => {
    try {
      const response = await fetch("https://api.spaceflightnewsapi.net/v4/articles");
      if (response.ok) {
        const data = await response.json();
        setArticle(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArticles();
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
      <Container>
        <Row className="gy-4">
          {article && article.results.map(elem => <SingleArticleCard data={elem} key={elem.id} />)}
        </Row>
      </Container>
    </>
  );
};

export default Home;
