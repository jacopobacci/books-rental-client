import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const Search = ({ setSearchResults }) => {
  const [query, setQuery] = useState("");

  const searchBooks = async (evt) => {
    evt.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books/search?q=${query}`, {
      method: "GET",
    });
    setSearchResults(await res.json());
    evt.target.reset();
  };

  const handleChange = (evt) => {
    evt.preventDefault();
    setQuery(evt.target.value);
  };

  return (
    <Row className="justify-content-center">
      <Col lg={4}>
        <Form onSubmit={searchBooks} className="d-flex mb-5 justify-content-center">
          <Form.Group controlId="search">
            <Form.Control type="text" placeholder="Search a book..." name="search" autoComplete="name" onChange={handleChange} />
          </Form.Group>
          <Button variant="success" type="submit" className="ms-3">
            Search
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Search;
